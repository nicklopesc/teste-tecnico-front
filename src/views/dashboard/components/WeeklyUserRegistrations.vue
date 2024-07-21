<template>
  <div class="chart-container">
    <h3 class="chart-title">Cadastro de Usuários por Semana</h3>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);

  // Dados para 4 semanas
  const weeks = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
  const registrations = [0, 0, 0, 6]; // Dados: 0 cadastros na semana 1, 2 e 3, e 6 cadastros na semana 4

  const option = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: weeks,
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
        name: "Cadastros de Usuários",
        type: "line",
        data: registrations,
        itemStyle: {
          color: "#FF7611",
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
  padding: 5px;
  margin: 4px;
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
