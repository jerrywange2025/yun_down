<template>
  <div class="icon-wrap">
    <img :src="iconSrc" :alt="appName">
  </div>
  <div class="info">
    <h2 class="name">{{ appName }}</h2>
    <p class="name-info">
      <span style="margin-right: 20px">版本: {{ version }} </span>
      <span>大小: {{ size }} </span><br>
<!--      <span>更新时间: {{ updateTime }}</span>-->
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  iconSrc: string
  appName: string
  version: string
  size: string
  updateTime: string
}

defineProps<Props>()
</script>

<style scoped>
.icon-wrap {
  background-color: #fff;
  width: 160px;
  height: 160px;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.icon-wrap img {
  width: 120px;
  height: 120px;
  border-radius: 24px;
  margin: 0 auto;
}

.name {
  font-size: 28px;
  margin-bottom: 10px;
  margin-top: 15px;
  word-break: break-all;
  white-space: pre-wrap;
  font-weight: normal;
}

.name-info {
  font-size: 14px;
  line-height: 1.4;
  color: #999;
}
</style>
