<template>
  <div class="download">
    <a class="download-btn btn-main" @click="handleDownload">
      <span>{{ buttonText || '下载纽客' }}</span>
    </a>
<!--    <p class="system">{{ systemText }}</p>-->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isIOS as checkIsIOS } from '../utils/browser'

const props = defineProps<{
  appleDownload: string
  buttonText?: string
  customClick?: () => void
}>()

const systemText = ref('')
const isIOS = ref(false)

const handleDownload = () => {
  if (props.customClick) {
    props.customClick()
    return
  }

  if (props.appleDownload) {
    window.location.href = props.appleDownload
    return
  }

}

onMounted(() => {
  if (checkIsIOS()) {
    isIOS.value = true
    systemText.value = '适用于苹果'
  } else {
    systemText.value = '适用于安卓'
  }
})
</script>

<style scoped>
.download .download-btn {
  height: 48px;
  padding: 0 50px;
  line-height: 48px;
  font-size: 16px;
  margin: 10px auto 0;
  display: inline-block;
  border-radius: 25px;
}

.download .system {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.btn-main {
  color: #fff;
  background: #08c1a0;
  border: 1px solid #08c1a0;
}
</style>
