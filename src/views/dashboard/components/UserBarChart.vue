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

  const genderData = [
    { name: "Mulheres", value: 2 },
    { name: "Homens", value: 4 },
  ];

  const option = {
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      type: "category",
      data: genderData.map((item) => item.name),
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
        name: "Usuários",
        type: "bar",
        data: genderData.map((item) => item.value),
        itemStyle: {
          color: function (params) {
            const colors = ["#BF395D", "#23400E"];
            return colors[params.dataIndex];
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
