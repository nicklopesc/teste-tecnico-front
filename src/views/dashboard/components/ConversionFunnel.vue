<template>
  <div class="chart-container">
    <h3 class="chart-title">Taxa de Conversão de Registro</h3>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);

  const categories = ["Acessos ao Site", "Registros Completos"];
  const values = [8, 6]; // 8 acessos ao site e 6 registros completos

  const option = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: {
        fontSize: 14,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 14,
      },
    },
    series: [
      {
        name: "Número de Usuários",
        type: "line",
        data: values,
        areaStyle: {},
        itemStyle: {
          color: "#023E73",
        },
        lineStyle: {
          width: 2,
        },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  myChart.setOption(option);

  window.addEventListener("resize", () => myChart.resize());
});
</script>

<style scoped>
.chart-container {
  border: 2px solid #d9d9d9;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  background-color: #d9d9d9;
}

.chart-title {
  text-align: center;
  font-size: 18px;
  margin-bottom: 16px;
}

.chart {
  width: 100%;
  height: 300px;
}
</style>
