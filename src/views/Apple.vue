<template>
  <div>
    <DistributeHeader />
    <div class="distribute-content">
      <div class="cont">
        <AppIcon
            :iconSrc="`./data/${dir}/icon.png`"
            :appName="system[platform].name"
            :version="system[platform].version"
            :size="system[platform].size"
            :updateTime="system[platform].time"
        />
        <div class="download-buttons">
          <DownloadButton
              :dir="dir"
              :appleDownload="appleDownload"
              class="premium-btn"
              buttonText="旗舰版本"
          />
          <DownloadButton
              :dir="dir"
              :appleDownload="liteDownload"
              class="lite-btn"
              buttonText="极速版本"
          />
        </div>
        <div id="desc" v-if="system[platform].desc">
          <div class="desc">
            <span class="title">描述：</span>
            {{ system[platform].desc }}
          </div>
        </div>
        <QRCode
            :url="location"
            :iconPath="`./data/${dir}/icon.png`"
        />

      </div>
    </div>
    <InviteMask :show="showInviteMask" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DistributeHeader from '../components/DistributeHeader.vue'
import AppIcon from '../components/AppIcon.vue'
import DownloadButton from '../components/DownloadButton.vue'
import QRCode from '../components/QRCode.vue'
import InviteMask from '../components/InviteMask.vue'
import { isIOS, isAndroid, isWechat } from '../utils/browser'

const dir = 'android'
const platform = ref(2)
const location = window.location.href
const showInviteMask = ref(false)
const appleDownload = ref('')
const liteDownload = ref('')

interface SystemData {
  name: string
  version: string
  size: string
  time: string
  desc: string
  platform: 'apple' | 'android'
}

interface SystemConfig {
  [key: number]: SystemData
}

const system: SystemConfig = {
  '1': {
    'name': '纽客通讯',
    'version': '1.0.1',
    'size': '3.51M',
    'time': '2021-3-15 17:00:00',
    'desc': '',
    'platform': 'apple',
  },
  '2': {
    'name': '纽客通讯',
    'version': '1.0.2',
    'size': '40.8M',
    'time': '2025-3-10 16:18:00',
    'desc': '',
    'platform': 'android',
  }
}

onMounted(() => {
  appleDownload.value = 'https://y2i4m.jobguge.com/190ed/owu2otlhzj'
  liteDownload.value = './data/apple/newke_lite.mobileconfig'

  // 判断是否在微信环境中
  if (isWechat()) {
    if (isIOS() || isAndroid()) {
      showInviteMask.value = true
    }
  }
})
</script>

<style scoped>
.download-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.premium-btn :deep(.download-btn) {
  background: #08c1a0;
  border-color: #08c1a0;
}

.lite-btn :deep(.download-btn) {
  background: #999;
  border-color: #999;
}

.report-link {
  margin-top: 20px;
}

.report-link a {
  color: #08c1a0;
  text-decoration: none;
  font-size: 14px;
}

.report-link a:hover {
  text-decoration: underline;
}
</style>