<template>
  <div class="distribute-wrap" id="distribute-cont">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup lang="ts">
// 基础组件逻辑已迁移到 Home.vue
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  line-height: 1;
  height: 100%;
}

#app {
  height: 100%;
  background-color: #fff;
}

.distribute-wrap {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.distribute-content {
  margin-bottom: 30px;
  width: 100%;
  flex: 1;
  margin-top: -130px;
}

.distribute-content .cont {
  margin-top: 20px;
  padding: 0 15px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.distribute-content .desc {
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  background-color: #afafaf;
  text-align: left;
  font-size: 14px;
  line-height: 1.4;
  box-sizing: border-box;
  color: #fff;
  font-weight: 600;
}
</style>
