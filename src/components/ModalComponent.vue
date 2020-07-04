<template>
 <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            x
          </button>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
         
        </slot>
       </section>
       <footer class="modal-footer">
          <slot name="footer">
            

            <button
              type="button"
              class=" btn"
              @click="close"
            >
              Close
          </button>
        </slot>
      </footer>
    </div>
  </div>
  </transition>
</template>

<script>
  export default {
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    max-width: 50%;
    max-height: 100%;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: flex-end;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: black;
    background: transparent;
  }
  
  .btn {
     width: 150px;
     height: 50px;
     border:none;
     border:solid 2px #f8f9fa;
     border-radius: 5px;
     font-size: 25px;
     cursor: pointer;
     color: #212529;
    background-color: #f8f9fa;

  }

  .btn:focus, .btn-close:focus{
      outline: none;
    
  }

  .btn:hover, .btn-close:hover{
    color: #212529;
    background-color: #e2e6ea;
    border-color: #dae0e5;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>