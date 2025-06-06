import { getVaultData } from '../api'; // Adjust path if needed

let viewer = null;
let svfUrls = {}; // <-- This is your global variable
let stpUrl = '';
let activeButton = null;
let data = { FolderFileData: [] }; // Start empty, will fill from API

async function loadVaultData(partId) {
  try {
    data = await getVaultData(partId); // data is now an array!
    console.log('Vault data loaded:', data);
  } catch (err) {
    console.error('Failed to load vault data:', err);
  }
}

const ViewerModule = {
  svfUrls, // expose as property
  loadVaultData,
  initializeViewer() {
  return new Promise((resolve) => {
    const viewerDiv = document.getElementById('viewerContainer');
    console.log('viewerDiv:', viewerDiv, 'Type:', viewerDiv && viewerDiv.constructor.name);
    if (!viewerDiv || !(viewerDiv instanceof HTMLElement)) {
      console.error('viewerContainer not found or is not a valid HTML element!', viewerDiv);
      resolve(false);
      return;
    }
    viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv);
    const options = {
      env: 'Local',
      getAccessToken: (onSuccess) => onSuccess('', 3600)
    };
    Autodesk.Viewing.Initializer(options, () => {
      viewer.start();
      viewer.setEnvMapBackground(true);
      viewer.setLightPreset(7);
      //viewer.setTheme('light');
      resolve(true); // <-- Resolve when done
    });
  });
},

  async showViewer() {
    const staticImage = document.getElementById('staticImageContainer');
    const viewerDiv = document.getElementById('viewerContainer');
    if (staticImage) staticImage.style.display = 'none';
    if (viewerDiv) viewerDiv.style.display = 'flex';

    if (!viewer) {
      console.log('Initializing viewer...');
      const initialized = await this.initializeViewer();
      if (!initialized) {
        console.error('Viewer failed to initialize.');
        return;
      }
    } else {
      console.log('Viewer already initialized.');
    }

    // Only call loadModel if the URL exists
    if (svfUrls && svfUrls.option1) {
      this.loadModel('option1');
    } else {
      console.warn('SVF URL not available yet.');
    }
  },

  async loadModel(option) {
    const svfUrl = svfUrls[option];
    //const viewerDiv = document.getElementById('viewerContainer');
    //const staticImage = document.getElementById('staticImageContainer');
    if (svfUrl) {
      //if (viewerDiv) viewerDiv.style.display = 'flex';
      //if (staticImage) staticImage.style.display = 'none';
      if (viewer) {
        //viewer.unloadModel();
        if (!svfUrl.endsWith('.svf')) {
          console.error('Not a valid SVF file:', svfUrl);
          return;
        }
        viewer.loadModel(svfUrl, {}, this.onLoadModelSuccess, this.onLoadModelError);
      } else {
        console.error('Viewer is not initialized.');
      }
    } else {
      console.error('Invalid model option selected');
    }
  },

  onLoadModelSuccess(model) {
    console.log('Model loaded successfully!');
    if (viewer) viewer.fitToView();
  },

  onLoadModelError(error) {
    console.error('Error loading model:', error);
  },

  handleOption(option) {
    const optionMapping = {
      1: [0, 1],
      2: [2, 3],
      3: [4, 5],
      4: [6, 7]
    };
    const [stpIndex, viewableIndex] = optionMapping[option] || [];
    if (stpIndex !== undefined && viewableIndex !== undefined) {
      this.getAndDownloadFiles(stpIndex, viewableIndex);
     // this.setActiveButton(`option${option}`);
    } else {
      console.log(`Invalid option: ${option}`);
    }
  },

  downloadSTP() {
    if (stpUrl) {
      window.location.href = stpUrl;
    } else {
      console.error('No STP file available for download.');
      this.showToast('No STP file available for download.', true);
    }
  },
  
  async getAndDownloadFiles(stpIndex, viewableIndex) {
    const url = 'https://HCVAULT:4433/api/Vault/GetAndDownloadFiles';
    // Use data as an array directly
    const requestData = {
      "FolderFileData": [data[stpIndex], data[viewableIndex]]
    };

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false
      });
      console.log('API Response:', response.data);

      const nullMasterIdFile = response.data.find(file => file.MasterId === null);
      if (nullMasterIdFile) {
        this.showToast(`File '${nullMasterIdFile.FileName}' not found.`, true);
        this.setDownloadSTPButtonState(false);
      } else {
        // Assign to the global svfUrls
        svfUrls = {
          option1: `https://HCVAULT:4433/VaultFiles/${response.data[1].FileName.replace('_viewable.zip', '')}_viewable/output/1/result.svf`,
          option2: `https://HCVAULT:4433/VaultFiles/${response.data[0].FileName}`
        };

        stpUrl = `https://HCVAULT:4433/VaultFiles/${response.data[0].FileName}`;

        ViewerModule.svfUrls = svfUrls;
        //this.loadModel('option1');
        //this.showToast('Files downloaded and viewer updated successfully.');
        //this.setDownloadSTPButtonState(true);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      this.showToast('Error downloading files. Please try again.', true);
      this.setDownloadSTPButtonState(false);
    }
  },

  setActiveButton(buttonId) {
    if (activeButton) {
      const prevBtn = document.getElementById(activeButton);
      if (prevBtn) prevBtn.classList.remove('active');
    }
    const btn = document.getElementById(buttonId);
    if (btn) btn.classList.add('active');
    activeButton = buttonId;
  },

  setDownloadSTPButtonState(enabled) {
    const downloadSTPButton = document.getElementById('downloadSTP');
    if (!downloadSTPButton) return;
    if (enabled) {
      downloadSTPButton.removeAttribute('disabled');
      downloadSTPButton.classList.remove('inactive');
    } else {
      downloadSTPButton.setAttribute('disabled', 'disabled');
      downloadSTPButton.classList.add('inactive');
    }
  },

  showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'error' : 'success'}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    toast.offsetHeight;

    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  }
};



export default ViewerModule;