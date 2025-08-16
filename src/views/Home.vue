<template>
  <div>
    <DistributeHeader />
    <div class="distribute-content">
      <div class="cont">
        <AppIcon
          :iconSrc="`/uploads/app/logo.png`"
          :appName="appInfo.name"
          :version="appInfo.version"
          :size="appInfo.size"
          :updateTime="currentTime"
        />
        <div class="button-group">
          <DownloadButton
            :appleDownload="`/uploads/app/${appInfo.android}`"
            buttonText="安卓"
          />
          <DownloadButton
            :appleDownload="appInfo.apple"
            buttonText="苹果"
            :customClick="handleAppleClick"
          />
        </div>
        <div id="desc" v-if="appInfo.desc">
          <div class="desc">
            <span class="title">描述：</span>
            {{ appInfo.desc }}
          </div>
        </div>
        <QRCode
          :url="location"
          :iconPath="`/uploads/app/logo.png`"
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

const location = window.location.href
const showInviteMask = ref(false)
const currentTime = new Date().toLocaleString()

interface AppInfo {
  name: string
  logo: string
  version: string
  size: string
  android: string
  apple: string
  desc?: string
}

const appInfo = ref<AppInfo>({
  name: '',
  logo: '',
  version: '',
  size: '',
  android: '',
  apple: '',
  desc: ''
})

const fetchAppInfo = async () => {
  try {
    const response = await fetch('/uploads/app/launch.json')
    const data = await response.json()
    appInfo.value = data
    // 设置页面标题
    document.title = appInfo.value.name
  } catch (error) {
    console.error('获取应用信息失败:', error)
  }
}

const handleAppleClick = () => {
  window.location.href = '/#/apple';
}

onMounted(async () => {
  await fetchAppInfo()

  // 判断是否在微信环境中
  if (isWechat()) {
    if (isIOS() || isAndroid()) {
      showInviteMask.value = true
    }
  }
})
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 20px 0;
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
