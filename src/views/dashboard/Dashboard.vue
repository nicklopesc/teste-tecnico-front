<template>
  <div>
    <v-row>
      <v-col><UserPieChart /></v-col>
      <v-col><UserBarChart /></v-col>
    </v-row>
    <v-row>
      <v-col><WeeklyUserRegistrations /></v-col>
      <v-col><ConversionFunnel /></v-col>
    </v-row>
  </div>
</template>

<script>
import UserPieChart from "./components/UserPieChart.vue";
import UserBarChart from "./components/UserBarChart.vue";
import WeeklyUserRegistrations from "./components/WeeklyUserRegistrations.vue";
import ConversionFunnel from "./components/ConversionFunnel.vue";

export default {
  name: "Dashboard",
  components: {
    UserPieChart,
    UserBarChart,
    WeeklyUserRegistrations,
    ConversionFunnel,
  },
};
</script>

<style></style>
