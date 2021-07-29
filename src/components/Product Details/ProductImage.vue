<template>
  <div class="product-details-image">
    <md-button
      v-if="productDetails.Has3DImage"
      class="md-primary three-d-toggle"
      @click="onView3DImageClick">
      <font-awesome-icon
        v-if="!show3DImage"
        :icon="['fad', 'cube']" />
      {{ imageToggleText }}
    </md-button>
    <transition-group
      name="fade"
      mode="in-out">
      <div v-show="!show3DImage" key="standard">
        <img
          :src="currentProductImage"
          :alt="productDetails.BasePartID">
        <p class="image-caption" v-if="productDetails.FeaturedImageCaption">{{ productDetails.FeaturedImageCaption}}</p>
      </div>
      <div v-show="show3DImage" key="3d">
        <div id='Part_3dImage'>
          <div id="cds-icon-container">
            <img onclick="cds.cadViewer.setRenderMode(cds.cadViewer.MODE_SHADED)" src="https://www.product-config.net/catalog3/js/webgl/images/icons/solid.png">
            <img onclick="cds.cadViewer.setRenderMode(cds.cadViewer.MODE_TRANSPARENT)" src="https://www.product-config.net/catalog3/js/webgl/images/icons/transparent.png">
            <img onclick="cds.cadViewer.setRenderMode(cds.cadViewer.MODE_WIREFRAME)" src="https://www.product-config.net/catalog3/js/webgl/images/icons/wireframe.png">
            <img onclick="cds.cadViewer.setOrientation(cds.cadViewer.VIEW_ISOMETRIC)" src="https://www.product-config.net/catalog3/js/webgl/images/icons/camera_perspective.png">
            <img onclick="cds.cadViewer.setOrientation(cds.cadViewer.VIEW_TOP)" src="https://www.product-config.net/catalog3/js/webgl/images/icons/camera_top.png">
            <img onclick="cds.cadViewer.setOrientation(cds.cadViewer.VIEW_LEFT)" src="https://www.product-config.net/catalog3/js/webgl/images/icons/camera_left.png">
            <img onclick="cds.cadViewer.setOrientation(cds.cadViewer.VIEW_BOTTOM)" src="https://www.product-config.net/catalog3/js/webgl/images/icons/camera_bottom.png">
            <img onclick="cds.cadViewer.setOrientation(cds.cadViewer.VIEW_RIGHT)" src="https://www.product-config.net/catalog3/js/webgl/images/icons/camera_right.png">
          </div>

          <div id="cds-cad-viewer-container" class="cds-cad-viewer-container">

          </div>

        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>

let cdsViewer = cds

export default {
  name: 'product-image',
  props: {
    productDetails: {
      type: Object,
      required : true
    }
  },
  data () {
    return {
      cds: cdsViewer,
      show3DImage: false
    }
  },
  computed: {
    currentProductImage () {
      return this.productDetails.FeaturedImageURL
    },
    imageToggleText () {
      return this.show3DImage ? 'View Standard Image' : 'View 3D'
    }
  },
  methods: {
    load3D () {
      console.log('mounted :: cds', this.cds)
      this.cds.setRemoteServerBaseURL("//www.product-config.net/catalog3");
      this.cds.CADRequester.setDomain("hamilton");
      // this must be set to the desired product number
      this.cds.CADRequester.setProduct(this.productDetails.PartID);
      // the element ids below may be altered to match changes in the element ids above
      this.cds.CADRequester.webglViewerElementId = "cds-cad-viewer-container";
      this.cds.CADRequester.setContainerElementId("cds-cad-container");
      this.cds.CADRequester.setFormatSelectElementId("cdsdownloadformats_client");
      // this.cds.CADRequester.setDownloadButtonElementId("lbCAD");
      // this is called after initialization is complete
      this.cds.CADRequester.load();
    },
    onView3DImageClick () {
      this.show3DImage = !this.show3DImage
    }
  },
  created () {

  },
  mounted () {
    this.load3D()
  }
}
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
      overflow: hidden;
      @media screen and (min-width: $medium) {
        height: $standardImageSize;
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

      #Part_3dImage {
        @media screen and (max-width: $medium) {
          width: $mobileImageSize;
          height: $mobileImageSize + 2rem;
          #cds-cad-viewer-container {
            height: $mobileImageSize;
            margin: -2em auto 2em;
            width: $mobileImageSize;
          }
        }
      }

    }
    #cds-cad-viewer-container {
      margin: 0 auto;
    }
    #cds-icon-container {
      position: relative;
    }
    .three-d-toggle {
      position: absolute;
      bottom: 0;
      right: 1rem;
      z-index: 500;
      @media screen and (min-width: $medium) {
        right: 4rem;
      }

    }
  }
</style>
