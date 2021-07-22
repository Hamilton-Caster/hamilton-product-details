<template>
  <div class="contact-modal">
    <md-dialog
      @md-opened="onModalOpened"
      @md-closed="onModalClosed"
      :md-active.sync="showModal"
      class="contact-modal">
      <md-dialog-title>
        Download Profile
        <button
          class="close-button"
          @click="showModal = false">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </md-dialog-title>
      <md-tabs>
        <md-tab md-label="New Registration">
          <p>
            To minimize abuse, a one-time registration is required before you can view or download CAD drawings.
            Hamilton takes your privacy very seriously. Hamilton does not sell or rent your contact information to
            anyone.
          </p>
          <fieldset class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label
                  for="downloadProfileName">
                  Name
                </label>
                <md-input
                  id="downloadProfileName"
                  v-model="name" />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label
                  for="downloadProfileCompanyName">
                  Company Name
                </label>
                <md-input
                  id="downloadProfileCompanyName"
                  v-model="companyName" />
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 md-small-size-100">
              <md-field>
                <label
                  for="downloadProfileAddress">
                  Address
                </label>
                <md-input
                  id="downloadProfileAddress"
                  v-model="address" />
              </md-field>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-field>
                <label
                  for="downloadProfileCity">
                  City
                </label>
                <md-input
                  id="downloadProfileCity"
                  v-model="city" />
              </md-field>
            </div>
            <div class="md-layout-item md-size-30 md-small-size-100">
              <md-field>
                <label
                  for="downloadProfileState">
                  State
                </label>
                <md-input
                  id="downloadProfileState"
                  v-model="state" />
              </md-field>
            </div>
            <div class="md-layout-item md-size-20 md-small-size-100">
              <md-field>
                <label
                  for="downloadProfileZip">
                  Zip
                </label>
                <md-input
                  id="downloadProfileZip"
                  v-model="zip" />
              </md-field>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-field>
                <label
                  for="downloadProfileEmail">
                  Email
                </label>
                <md-input
                  id="downloadProfileEmail"
                  v-model="email" />
              </md-field>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-field>
                <label
                  for="downloadProfilePhone">
                  Phone
                </label>
                <md-input
                  id="downloadProfilePhone"
                  v-model="phone" />
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 md-small-size-100">
              <md-field>
                <label
                  for="downloadProfileFormat">
                  Desired Format
                </label>
                <md-select
                  id="downloadProfileFormat"
                  v-model="desiredFormat">
                  <md-option
                    v-for="option in desiredFormatOptions"
                    :key="option.value">
                    {{ option.name }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </fieldset>
          <md-dialog-actions>
            <md-button @click="onRegister">
              Register
            </md-button>
            <md-button @click="onCancel">
              Cancel
            </md-button>
          </md-dialog-actions>
        </md-tab>
        <md-tab md-label="Already Registered">
          <p>
            If you have already registered in the past, please enter your full name and email address so that we can
            look it up.
          </p>
          <fieldset class="md-layout md-gutter">
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-field>
                <label
                  for="downloadProfileExistingName">
                  Name</label>
                <md-input
                  v-model="existingName"
                  id="downloadProfileExistingName"
                  required />
              </md-field>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-field>
                <label
                  for="downloadProfileExistingEmail">
                  Email
                </label>
                <md-input
                  id="downloadProfileExistingEmail"
                  v-model="existingEmail"
                  required />
              </md-field>
            </div>
          </fieldset>
          <md-dialog-actions>
            <md-button @click="onSearch">
              Search Profile
            </md-button>
            <md-button @click="onCancel">
              Cancel
            </md-button>
          </md-dialog-actions>
        </md-tab>
      </md-tabs>
    </md-dialog>
  </div>
</template>

<script>

export default {
  name: 'contact-modal',
  props: {
    displayModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      existingName: null,
      existingEmail: null,
      showModal: false,
      name: null,
      companyName: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      email: null,
      phone: null,
      desiredFormat: null,
      desiredFormatOptions: [
        {
          name: 'option 1',
          value: 1
        },
        {
          name: 'option 2',
          value: 2
        },
        {
          name: 'option 3',
          value: 3
        }
      ]
    }
  },
  watch: {
    showModal: {
      handler: function (showModal) {
        this.$emit('update:displayModal', showModal)
      }
    },
    displayModal: {
      handler: function (displayModal) {
        this.showModal = displayModal
      }
    }
  },
  methods: {
    onRegister () {
      console.log('onRegister', this.newName)
    },
    onSearch () {
      console.log('onSearch :: this.existingName', this.existingName)
    },
    onCancel () {
      this.showModal = false
      console.log('onCancel')
    },
    onModalClosed () {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    },
    onModalOpened () {
      console.log('onModalOpened :: `-${window.scrollY}px`', `-${window.scrollY}px`)
      setTimeout(function () {
        document.body.style.top = `-${window.scrollY}px`
        document.body.style.position = 'fixed'
      }, 500)
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>

<style lang="scss">

@import "../../assets/variables";

.contact-modal {
  // Tabs
  --tab-font-size: 1.25rem;
  @media screen and (min-width: $medium) {
    --tab-font-size: 1rem;
  }
  @media screen and (min-width: $large) {
    --tab-font-size: 1.25rem;
  }
  @media screen and (min-width: $x-large) {
    --tab-font-size: 1.5rem;
  }
  @media screen and (min-width: $xxx-large) {
    --tab-font-size: 2rem;
  }

  @media screen and (max-width: 768px) {
    &.md-dialog .md-tabs.md-theme-default .md-tabs-navigation {
      flex-direction: row;
    }
  }

  $tabFontSize: var(--tab-font-size);

  $tabFontColor: $black;
  $tab_normalOpacity: .43;
  $tab_hoverOpacity: .83;
  $tab_selectedOpacity: 1;

  position: relative;
  float: left;
  max-width: 80rem;
  margin: 0 auto 1.5rem;

  input,
  textarea {
    margin-bottom: 0;
  }

  @media screen and (min-width: $small) {
    margin-top: 0.75rem;
    margin-bottom: -0.1rem;
  }

  @media screen and (max-width: $small) {
    &.md-dialog {
      position: fixed;
      height: 100%;
      width: 100%;

      .md-tabs {
        height: calc(100% - 5rem);
      }

      .md-content.md-tabs-content {
        overflow-y: auto;
      }

      & ~ #hbl-live-chat-wrapper {
        display: none;
      }
    }
  }

  .md-tabs {
    z-index: 1;

    &.md-theme-default {
      .md-tabs-navigation {
        background-color: transparent;
        //border-bottom: 1px solid $borderColor;
        //padding-bottom: .3rem;
        @media screen and (max-width: $medium) {
          flex-direction: column;
          .md-ripple {
            justify-content: left;
          }
        }

        .md-button {
          font-size: $tabFontSize;
          color: $tabFontColor;
          opacity: $tab_normalOpacity;
          text-transform: none;
          margin-right: 0;
          transition: opacity .2s;
          line-height: 2rem;
          max-width: 24rem;

          @media screen and (max-width: $medium) {
            text-align: left;
          }

          &:hover {
            background-color: transparent;
            opacity: $tab_hoverOpacity;
          }

          &.md-active {
            color: $primaryColor;
            opacity: $tab_selectedOpacity;

            &:hover {
              opacity: $tab_hoverOpacity;
            }
          }
        }

        .md-tabs-indicator {
          background-color: $primaryColor;
          @media screen and (max-width: $medium) {
            display: none;
          }
        }
      }
    }

    .md-button:not([disabled]).md-focused:before,
    .md-button:not([disabled]):active:before,
    .md-button:not([disabled]):hover:before {
      opacity: 0;
    }
  }
  .close-button {
    background-color: transparent;
    color: $black;
    position: absolute;
    right: 0;
    top: 0;

    &:hover {
      background-color: transparent;
    }
  }
}

</style>
