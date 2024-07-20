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
            Você tem certeza de que deseja excluir</span
          >

          <span class="text-subtitle-1 font-weight-bold">
            {{ localUser.first_name }} {{ localUser.last_name }}
          </span>
          ?
        </v-card-subtitle>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteUser">Excluir</v-btn>
          <v-btn @click="closeDeleteDialog">Cancelar</v-btn>
        </v-card-actions> -->
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
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
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
    const alertTimeout = 0;

    const deleteUser = async () => {
      try {
        const response = await fetch(
          `https://reqres.in/api/users/${localUser.value.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("User deleted successfully");
          emit("save");
          emit("update:show", false);
          showAlert.value = true;
          alertType.value = "success";
          alertMessage.value = "Usuário excluído com sucesso!";
        } else {
          console.error("Failed to delete user:", response.statusText);
          showAlert.value = true;
          alertType.value = "error";
          alertMessage.value =
            "Falha ao excluir o usuário, por favor tente mais tarde.";
        }
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
      alertTimeout,
    };
  },
};
</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
}
</style>
