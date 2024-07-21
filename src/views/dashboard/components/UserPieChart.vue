<template>
  <div class="chart-container">
    <h3 class="chart-title">Distribuição de Usuários</h3>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);

  const userData = [
    { name: "Usuários Ativos", value: 6 },
    { name: "Usuários Inativos", value: 4 },
  ];

  const colors = ["#F2BB16", "#8C030E"];

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Usuários",
        type: "pie",
        radius: "50%",
        data: userData.map((item, index) => ({
          ...item,
          itemStyle: {
            color: colors[index],
          },
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
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
