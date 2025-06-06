<template>
  <div>
    <div
      id="staticImageContainer"
      class="product-details-image"
      v-show="!showing3D"
    >
      <div key="standard" class="image-wrap">
        <img :src="currentProductImage" :alt="productDetails.PartID" />
        <p class="image-caption" v-if="productDetails.FeaturedImageCaption">
          {{ productDetails.FeaturedImageCaption }}
        </p>
      </div>
    </div>
    <div
      id="viewerContainer"
      :style="{ display: showing3D ? 'flex' : 'none' }"
    ></div>
  </div>
</template>

<script>
import ViewerModule from '../../utilities/viewer';


export default {
  name: 'product-image',
  props: {
    partId: {
      type: [String, Number],
      required: true
    },
    productDetails: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showing3D: false
    };
  },
  computed: {
    currentProductImage() {
      return this.productDetails.FeaturedImageURL;
    }
  },
  methods: {
    async toggleViewer() {
      this.showing3D = !this.showing3D;
      if (this.showing3D) {
        this.$nextTick(async () => {
          // Only fetch/download files and load the model if not already done
          if (!ViewerModule.svfUrls || !ViewerModule.svfUrls.option1) {
            console.log('Fetching and downloading files for the viewer...');
            await ViewerModule.getAndDownloadFiles(0, 1);
          }
          console.log('Showing the viewer...');
          ViewerModule.showViewer();
        });
      }
    },
    downloadCadFile() {
      ViewerModule.downloadSTP();
    }
  },
  mounted: async function() {
    // Do NOT call ViewerModule.showViewer() here!
    // Optionally, prefetch files if you want:
    await ViewerModule.loadVaultData(this.partId);
    await ViewerModule.getAndDownloadFiles(0, 1);
  }
};
</script>

<style lang="scss">
  @import "../../assets/variables";

  $mobileImageSize:   21.875rem;
  $standardImageSize: 31.25rem;

  .product-details-wrapper {
    position: relative;
    .product-details-image {
      text-align: center;
      min-height: $mobileImageSize;
      margin-bottom: 2rem;
      height: $mobileImageSize;

      @media screen and (min-width: $medium) {
        height: $standardImageSize;
      }

      .image-wrap {
        img {
          width: 100%;
        }
      }

      img {
        max-width: $mobileImageSize;
        max-height: $mobileImageSize;
        @media screen and (min-width: $medium) {
          max-width: $standardImageSize;
          max-height: $standardImageSize;
        }
      }

      .image-caption {
        font-size: 1rem;
        font-style: italic;
        text-align: center;
      }

    }
  }

  /* Ensure the container has the desired size */
  #viewerContainer {
    width: 103%;
    height: 39rem;
    position: relative;
    margin-top: -5%;
  }

  /* Make the Forge Viewer fill the container */
  #viewerContainer > .adsk-viewing-viewer {
    width: 100% !important;
    height: 100% !important;
    position: absolute;
    top: 0; left: 0;
  }
</style>
