<template>
  <div class="invite-mask" v-if="show">
    <img :src="imageSrc" alt="邀请图片" class="invite-image" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isIOS, isAndroid } from '../utils/browser'

defineProps<{
  show: boolean
}>()

const imageSrc = computed(() => {
  if (isIOS()) {
    return './images/invite_ios.png'
  } else if (isAndroid()) {
    return './images/invite_android.png'
  }
  return ''
})
</script>

<style scoped>
.invite-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.invite-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
</style> 