<template>
  <v-snackbar
    v-model="snackbarOpen"
    :color="snackbarColor"
    timeout="3000"
    top
    left
    :style="{ position: 'fixed', top: '16px', left: '16px' }"
  >
    <v-row align="center" no-gutters>
      <v-col cols="auto">
        <v-icon v-if="severity === 'error'" color="red"
          >mdi-alert-circle</v-icon
        >
        <v-icon v-if="severity === 'success'" color="green"
          >mdi-check-circle</v-icon
        >
        <v-icon v-if="severity === 'info'" color="blue">mdi-information</v-icon>
        <v-icon v-if="severity === 'warning'" color="orange">mdi-alert</v-icon>
      </v-col>
      <v-col>
        {{ message }}
        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
        <template v-if="errorDetails">
          <v-icon @click="showErrorDetails" class="cursor-pointer"
            >mdi-alert-outline</v-icon
          >
        </template>
      </v-col>
      <!-- Botão de fechar opcional -->
      <!-- <v-col cols="auto">
          <v-btn icon @click="closeSnackbar">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col> -->
    </v-row>
  </v-snackbar>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  severity: {
    type: String,
    required: true,
    validator: (value) =>
      ["success", "error", "info", "warning"].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
  errorDetails: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:open"]);

const snackbarOpen = ref(props.open);

const snackbarColor = computed(() => {
  switch (props.severity) {
    case "success":
      return "green";
    case "error":
      return "red";
    case "info":
      return "blue";
    case "warning":
      return "orange";
    default:
      return "default";
  }
});

const closeSnackbar = () => {
  snackbarOpen.value = false;
  emit("update:open", false);
};

const showErrorDetails = () => {
  console.error(props.errorDetails);
};

watch(
  () => props.open,
  (newValue) => {
    snackbarOpen.value = newValue;
  }
);
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
