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
      <md-tabs
        @md-changed="onTabsChanged">
        <md-tab :md-label="registrationTabTitle">
          <div class="modal-content-wrap">
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
                    v-model="cadUser.FullName" />
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
                    v-model="cadUser.Company" />
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
                    v-model="cadUser.Address" />
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
                    v-model="cadUser.City" />
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
                    v-model="cadUser.State" />
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
                    v-model="cadUser.Zipcode" />
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
                    v-model="cadUser.Email" />
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
                    v-model="cadUser.Phone" />
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 md-small-size-100">
                <md-field
                  class="download-format-option-field">
                  <label
                    for="downloadProfileFormat">
                    Desired Format
                  </label>
                  <md-select
                    class="download-format-option"
                    id="downloadProfileFormat"
                    v-model="cadUser.DownloadFormats">
                    <md-option
                      v-for="option in desiredFormatOptions"
                      :key="option.title"
                      :value="option.value">
                      {{ option.text }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
            </fieldset>
          </div>
          <md-dialog-actions>
            <div class="message-wrap">
              <transition
                name="fade"
                mode="in-out">
                <div
                  v-if="showNote"
                  class="note-block"
                  :class="noteType">
                  {{ noteMessage }}
                </div>
              </transition>
            </div>
            <div class="dialog-button-wrap">
              <md-button
                v-if="cadUser.IsValidCADUser"
                class="md-primary"
                @click="onUpdate">
                Update Profile
              </md-button>
              <md-button
                v-else
                class="md-primary"
                @click="onRegister">
                Register
              </md-button>
              <md-button @click="onCancel">
                Cancel
              </md-button>
            </div>
          </md-dialog-actions>
        </md-tab>
          <md-tab md-label="Already Registered">
          <div class="modal-content-wrap">
            <p>
              If you have already registered in the past, please enter your full name and email address so that we can look it up.
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
          </div>
          <md-dialog-actions>
            <div class="message-wrap">
              <transition
                name="fade"
                mode="in-out">
                <div
                  v-if="showNote"
                  class="note-block"
                  :class="noteType">
                  {{ noteMessage }}
                </div>
              </transition>
            </div>
            <div class="dialog-button-wrap">
              <md-button class="md-primary" @click="onSearch">
                Lookup Registration
              </md-button>
              <md-button @click="onCancel">
                Close
              </md-button>
            </div>
          </md-dialog-actions>
        </md-tab>
      </md-tabs>
    </md-dialog>
  </div>
</template>

<script>

import {validateCADUser, addCADUser, editCADUser} from '../../api'
import {DownloadFormats} from '../enums'

const ErrorMessage = 'An error occurred. Please verify all fields and try again.'


export default {
  name: 'contact-modal',
  props: {
    displayModal: {
      type: Boolean,
      default: false
    },
    isValidCadUser: {
      type: Boolean,
      default: false
    },
    cadUser: {
      type: Object
    }
  },
  data () {
    return {
      existingName: null,
      existingEmail: null,
      showModal: false,
      desiredFormatOptions: DownloadFormats,
      showLookupError: false,
      isMobileSize: false,
      noteType: null,
      showNote: false,
      noteMessage: null
    }
  },
  computed: {
    registrationTabTitle () {
      return this.cadUser.IsValidCADUser ? 'Manage Profile' : 'New Registration'
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
      addCADUser(this.cadUser)
        .then(res => {
          this.showLookupError = !res.IsValidCADUser
          this.$emit('update:cad-user', res)
          this.noteMessage = res.IsValidCADUser ?  'New registration successful!' : ErrorMessage
          this.noteType = res.IsValidCADUser ? 'success' : 'error'
          this.showNote = true
          if (res.IsValidCADUser) {
            setTimeout(() => {
              this.showModal = false
              this.$emit('registration-confirmed')
            }, 3000)
          } else {
            setTimeout(() => {
              this.showNote = false
            }, 5000)
          }
        })
        .catch(res => {
          this.noteMessage = res
          this.noteType = 'error'
          this.showNote = true
          setTimeout(() => {
            this.showNote = false
          }, 5000)
        })
    },
    onUpdate () {
      editCADUser(this.cadUser)
        .then(res => {
          this.$emit('update:cad-user', res)
          this.noteMessage = res.IsValidCADUser ?  'Profile Updated!' : ErrorMessage
          this.noteType = res.IsValidCADUser ? 'success' : 'error'
          this.showNote = true
          setTimeout(() => {
            this.showNote = false
          }, 5000)

        })
        .catch(res => {
          this.noteMessage = res
          this.noteType = 'error'
          this.showNote = true
          setTimeout(() => {
            this.showNote = false
          }, 5000)
        })
    },
    onSearch () {
      validateCADUser(this.existingName, this.existingEmail)
        .then(res => {
          this.showLookupError = !res.IsValidCADUser
          this.$emit('update:cad-user', res)
          if (res.IsValidCADUser) {
            this.onCancel()
          } else {
            this.noteMessage = ErrorMessage
            this.noteType = 'Unable to locate a user with the information provided'
            this.showNote = true
            setTimeout(() => {
              this.showNote = false
            }, 5000)
          }
        })
        .catch(res => {
            this.noteMessage = res
            this.noteType = 'error'
            this.showNote = true
            setTimeout(() => {
              this.showNote = false
            }, 5000)
        })
    },
    onCancel () {
      this.showModal = false
      this.showNote = false
    },
    onModalClosed () {
      this.showLookupError = false
      if (this.isMobileSize) {
        const scrollY = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    },
    onModalOpened () {
      this.isMobileSize = window.matchMedia('(max-width: 769px)').matches
      if (this.isMobileSize) {
        setTimeout(function () {
          document.body.style.top = `-${window.scrollY}px`
          document.body.style.position = 'fixed'
        }, 500)
      }
    },
    onTabsChanged () {
      this.showNote = false
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

  input,
  textarea {
    margin-bottom: 0;
  }
  max-width: 80rem;
  margin: 0 auto 1.5rem;

  @media screen and (min-width: $small) {
    margin-top: 0.75rem;
    margin-bottom: -0.1rem;
  }

  @media screen and (max-width: $medium) {
    //position: relative;
    //float: left;
  }

  &.md-dialog {
    z-index: 1040;
  }
  @media screen and (max-height: 850px), screen and (max-width: $large) {
    .md-tabs.md-theme-default .md-tabs-navigation {
      box-shadow: 0px 5px 15px -12px rgb(0 0 0 / 42%);
    }

    .md-dialog-container.md-dialog-fullscreen.md-theme-default {
      height: 100%;
    }
    .md-tabs.md-alignment-left.md-theme-default {
      height: calc(100% - 50px);
    }
    .modal-content-wrap {
      overflow-y: auto;
      height: calc(100% - 60px);
      margin-right: -32px;
      padding-right: 45px;
      padding-top: 1rem;
    }
    .md-tabs.md-theme-default .md-tabs-content {
      min-height: auto !important;
      height: 100% !important;
    }
    .md-tab {
      padding-top: 0;
    }
    .md-dialog-actions {
      box-shadow: 0px -5px 15px -12px rgb(0 0 0 / 42%);
      margin: 0 -2rem;
    }
      .md-tabs-container,
      .md-tab {
        height: 100%;
      }
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

      @media screen and (min-width: $medium) {
        .md-tabs-content {
          min-height: 33.75rem;
          height: 100%;

          .md-tabs-container {
            height: 100%;
          }

          .md-tab {
            height: 100%;
            position: relative;
            padding-left: 2rem;
            padding-right: 2rem;

            .md-dialog-actions {
              display: flex;

              @media screen and (min-width: $medium) {
                //display: flex;
                padding: 0 0 .5rem 0;
                justify-content: space-between;
                position: relative;
                right: unset;
              }
            }
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

  .md-dialog-actions {
    flex-direction: column;
    .message-wrap { min-width: 50%; }
    .dialog-button-wrap { }
    a.md-button.md-theme-default,
    button.md-button.md-theme-default {
      &.md-primary {
        background: $primaryColor;
        border: none;
        color: $white;
        border-radius: none;
        display: inline-block;
        padding: .625rem;
        &:hover {
          background-color: $primaryColorActive;
          color: $white
        }
      }
      &:hover {
        background-color: $white;
        color: $primaryColorActive;
      }
    }
  }
  .note-block {
    min-width: 50%;
  }
}

.md-overlay {
  z-index: 1000;
}
.md-dialog.product-finder-modal {
  z-index: 1003;
}
.md-theme-default .md-menu-content-small.md-menu-content.md-menu-content-bottom-start {
  z-index: 1002;
}

</style>
