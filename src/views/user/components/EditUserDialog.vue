<template>
  <v-dialog v-model="dialogVisible" max-width="500">
    <v-card>
      <v-toolbar flat color="#038c7f">
        <v-toolbar-title class="white--text">Editar Usuário</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon class="white--text">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-subtitle>
        <v-text-field
          v-model="localUser.first_name"
          label="Nome"
        ></v-text-field>
        <v-text-field
          v-model="localUser.last_name"
          label="Sobrenome"
        ></v-text-field>
        <v-text-field v-model="localUser.email" label="Email"></v-text-field>
      </v-card-subtitle>

      <div class="d-flex justify-end mb-3">
        <Buttons
          @cancel="closeDialog"
          @confirm="saveUser"
          buttonType="submit"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, watch, computed } from "vue";
import Buttons from "../../../components/Buttons.vue";
export default {
  name: "EditUserDialog",
  components: {
    Buttons,
  },
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
    const dialogVisible = computed(() => props.show);

    watch(
      () => props.user,
      (newUser) => {
        localUser.value = { ...newUser };
      }
    );

    const showAlert = ref(false);
    const alertType = ref("success");
    const alertMessage = ref("");
    const alertTimeout = 60000;

    const saveUser = async () => {
      try {
        const response = await fetch(
          `https://reqres.in/api/users/${localUser.value.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name: localUser.value.first_name,
              last_name: localUser.value.last_name,
              email: localUser.value.email,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("User updated successfully:", data);
          emit("save", data);
          emit("update:show", false);
          showAlert.value = true;
          alertType.value = "success";
          alertMessage.value = "Usuário atualizado com sucesso!";
        } else {
          console.error("Failed to update user:", response.statusText);
          showAlert.value = true;
          alertType.value = "error";
          alertMessage.value =
            "Falha ao atualizar o usuário, por favor tente mais tarde.";
        }
      } catch (error) {
        console.error("Error:", error);
        showAlert.value = true;
        alertType.value = "error";
        alertMessage.value =
          "Erro ao atualizar o usuário, por favor tente mais tarde.";
      }
    };

    const closeDialog = () => {
      emit("update:show", false);
    };

    return {
      localUser,
      dialogVisible,
      saveUser,
      closeDialog,
      showAlert,
      alertType,
      alertMessage,
      alertTimeout,
    };
  },
};
</script>

<style scoped></style>
