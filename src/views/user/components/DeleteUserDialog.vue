<template>
  <div>
    <v-dialog v-model="deleteDialogVisible" max-width="500">
      <v-card>
        <v-toolbar flat color="#800000">
          <v-toolbar-title class="white--text">Excluir Usuário</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDeleteDialog">
            <v-icon class="white--text">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-subtitle class="my-6">
          <span class="text-subtitle-1 mr-2">
            Você tem certeza de que deseja excluir
          </span>
          <span class="text-subtitle-1 font-weight-bold">
            {{ localUser.first_name }} {{ localUser.last_name }}
          </span>
          ?
        </v-card-subtitle>
        <div class="d-flex justify-end mb-3">
          <Buttons
            @cancel="closeDeleteDialog"
            @confirm="deleteUser"
            confirmButtonColor="#800000"
            confirmButtonText="Excluir"
          />
        </div>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="showAlert"
      :color="alertType === 'success' ? 'green' : 'red'"
      timeout="3000"
      top
      right
      class="snackbar"
    >
      {{ alertMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import Buttons from "../../../components/Buttons.vue";

export default {
  name: "DeleteUserDialog",
  components: { Buttons },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:show", "save"],
  setup(props, { emit }) {
    const store = useStore();
    const localUser = ref({ ...props.user });
    const deleteDialogVisible = computed(() => props.show);

    watch(
      () => props.user,
      (newUser) => {
        localUser.value = { ...newUser };
      }
    );

    const showAlert = ref(false);
    const alertType = ref("success");
    const alertMessage = ref("");

    const deleteUser = async () => {
      try {
        await store.dispatch("deleteUser", localUser.value.id);
        emit("save");
        emit("update:show", false);
        showAlert.value = true;
        alertType.value = "success";
        alertMessage.value = "Usuário excluído com sucesso!";
      } catch (error) {
        console.error("Error:", error);
        showAlert.value = true;
        alertType.value = "error";
        alertMessage.value =
          "Erro ao excluir o usuário, por favor tente mais tarde.";
      }
    };

    const closeDeleteDialog = () => {
      emit("update:show", false);
    };

    return {
      localUser,
      deleteDialogVisible,
      deleteUser,
      closeDeleteDialog,
      showAlert,
      alertType,
      alertMessage,
    };
  },
};
</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
}
.snackbar {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
