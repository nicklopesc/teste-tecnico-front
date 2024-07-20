<template>
  <div class="button-container">
    <v-btn
      :color="confirmButtonColor"
      :type="buttonType"
      @click="$emit('confirm')"
      class="btn-confirm"
    >
      {{ confirmButtonText }}
    </v-btn>

    <v-btn class="btn-cancel" @click="$emit('cancel')"> Cancelar </v-btn>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  confirmButtonColor: {
    type: String,
    default: "#038c7f",
  },
  confirmButtonText: {
    type: String,
    default: "Confirmar",
  },
  buttonType: {
    type: String,
    default: "button",
  },
});
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 3;
}

.btn-confirm,
.btn-cancel {
  font-size: 12px;
  padding: 6px 12px;
}

.btn-cancel {
  background-color: #e5e5e5;
  color: #000;
  margin-right: 8px;
}
</style>
