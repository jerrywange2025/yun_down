<template>
  <div class="report-container">
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null
const data = ref({
  dates: [] as string[],
  android: [] as number[],
  ios: [] as number[]
})

// 加载数据
const loadData = async () => {
  try {
    console.log('开始加载数据...')
    const response = await fetch('./data/data.json')
    console.log('响应状态:', response.status)
    const jsonData = await response.json()
    console.log('加载到的数据:', jsonData)
    data.value = jsonData
  } catch (error) {
    console.error('加载数据失败:', error)
  }
}

// 更新图表数据
const updateChart = () => {
  if (!chart) return
  
  console.log('更新图表数据:', data.value)
  
  const option = {
    xAxis: {
      type: 'category',
      data: data.value.dates,
      axisLabel: {
        interval: 0,
        rotate: 45
      }
    },
    series: [
      {
        name: 'Android',
        type: 'bar',
        stack: 'total',
        data: data.value.android,
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: 'iOS',
        type: 'bar',
        stack: 'total',
        data: data.value.ios,
        emphasis: {
          focus: 'series'
        }
      }
    ]
  }
  
  chart.setOption(option, {
    replaceMerge: ['xAxis', 'series']
  })
}

// 监听数据变化
watch(() => data.value, () => {
  updateChart()
}, { deep: true })

// 初始化图表
const initChart = async () => {
  if (!chartRef.value) return
  
  // 先加载数据
  await loadData()
  
  // 数据加载完成后初始化图表
  chart = echarts.init(chartRef.value)
  
  const option = {
    title: {
      text: 'App下载数据统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params: any) {
        let total = 0
        let result = params[0].axisValue + '<br/>'
        params.forEach((item: any) => {
          result += item.marker + ' ' + item.seriesName + ': ' + item.value + '<br/>'
          total += item.value
        })
        result += '<br/>总计: ' + total
        return result
      }
    },
    legend: {
      data: ['Android', 'iOS'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.value.dates,
      axisLabel: {
        interval: 0,
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '下载量'
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
        minValueSpan: 1
      }
    ],
    brush: {
      toolbox: ['rect', 'keep', 'clear'],
      xAxisIndex: 0
    },
    series: [
      {
        name: 'Android',
        type: 'bar',
        stack: 'total',
        data: data.value.android,
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: 'iOS',
        type: 'bar',
        stack: 'total',
        data: data.value.ios,
        emphasis: {
          focus: 'series'
        }
      }
    ]
  }

  // 确保数据已经加载完成后再设置图表选项
  if (data.value.dates.length > 0) {
    chart.setOption(option)
  }
}

// 监听窗口大小变化
const handleResize = () => {
  chart?.resize()
}

onMounted(async () => {
  await initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})
</script>

<style scoped>
.report-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.chart-container {
  width: 100%;
  height: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style> 