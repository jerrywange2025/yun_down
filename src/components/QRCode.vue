<template>
  <div class="download-code">
    <QRCodeVue
      :value="url"
      :size="146"
      :margin="0"
      :foreground="'#000000'"
      :background="'#ffffff'"
      level="H"
    />
    <div class="text-center tip">扫描二维码下载</div>
  </div>
</template>

<script setup lang="ts">
import QRCodeVue from 'qrcode.vue'

defineProps<{
  url: string
  iconPath: string
}>()
</script>

<style scoped>
.download-code {
  color: #666;
  width: 160px;
  overflow: hidden;
  margin: 35px auto 0;
  text-align: center;
}

.download-code canvas {
  width: 146px;
  height: 146px;
}

.tip {
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 5px;
}
</style>