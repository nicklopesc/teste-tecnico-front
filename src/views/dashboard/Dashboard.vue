<template>
  <v-container fluid>
    <v-row>
      <!-- Use v-col with appropriate props for responsiveness -->
      <v-col cols="12" md="6">
        <UserPieChart />
      </v-col>
      <v-col cols="12" md="6">
        <UserBarChart />
      </v-col>
      <v-col cols="12" md="6">
        <WeeklyUserRegistrations />
      </v-col>
      <v-col cols="12" md="6">
        <ConversionFunnel />
      </v-col>
    </v-row>
  </v-container>
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

<style scoped>
/* Ensure proper spacing and layout for mobile devices */
@media (max-width: 600px) {
  .v-col {
    margin-bottom: 16px; /* Adjust spacing as needed */
  }
}
</style>
