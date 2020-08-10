<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div
          class="modal-container"
          :style="{ width: width + widthUnit }"
          @click.stop
        >
          <div class="modal-close-container">
            <button
              @click="$emit('close')"
              v-if="showCloseButton"
              style="margin: 5px"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="fa fa-close">x </span>
            </button>
          </div>
          <div class="modal-scrollable">
            <div class="modal-header">
              <slot name="header">default header </slot>
            </div>
            <div class="modal-body">
              <slot name="body">default body</slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    width: {
      type: Number,
      default: 50,
    },
    widthUnit: {
      type: String,
      default: "%",
    },
    showCloseButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 900;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  cursor: default;
}

.modal-close-container {
  position: relative;
  text-align: right;
  height: 35px;
}

.modal-scrollable {
  max-height: calc(90vh - 35px);
  overflow-y: auto;
}

.modal-header h3 {
  margin-top: 0;
  overflow-y: hidden;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
