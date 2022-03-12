<template>
    <div class="toast">{{message}}</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'ToastView',
  props: ['message']
}
export const useToastEffect = () => {
  const toastData = reactive({
    isToast: false,
    toastMessage: ''
  })

  const showToast = (message) => {
    toastData.isToast = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.isToast = false
      toastData.toastMessage = ''
    }, 2000)
  }
  return { toastData, showToast }
}
</script>

<style lang="scss" scoped>
.toast{
    position: absolute;
    top: 50%;
    left: 50%;
    padding: .1rem;
    transform: translate(-50%,-50%);
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: .05rem;
    color: white;
}
</style>
