<template>
  <v-snackbar v-model="visible" :color="color" timeout="3000" class="snackbar">
    {{ message }}
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  message: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "success",
  },
});

const visible = ref(false);

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      visible.value = true;
    }
  }
);
</script>

<style scoped>
.snackbar {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
