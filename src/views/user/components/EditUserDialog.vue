<template>
  <div>
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
            label="Sobrenome / Cargo"
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
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";
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
    const store = useStore();
    const localUser = ref({ ...props.user });
    const dialogVisible = computed({
      get() {
        return props.show;
      },
      set(value) {
        emit("update:show", value);
      },
    });

    watch(
      () => props.user,
      (newUser) => {
        localUser.value = { ...newUser };
      }
    );

    const showAlert = ref(false);
    const alertType = ref("success");
    const alertMessage = ref("");

    const saveUser = async () => {
      const emailChanged = localUser.value.email !== props.user.email;
      const otherDataChanged =
        localUser.value.first_name !== props.user.first_name ||
        localUser.value.last_name !== props.user.last_name;

      if (emailChanged && !otherDataChanged) {
        showAlert.value = true;
        alertType.value = "error";
        alertMessage.value = "Não é permitido alterar o e-mail do usuário.";
        return;
      }

      try {
        const updatedUser = await store.dispatch("updateUser", {
          id: localUser.value.id,
          userData: {
            name: localUser.value.first_name,
            job: localUser.value.last_name,
          },
        });
        console.log("User updated successfully:", updatedUser);
        emit("save", updatedUser);
        emit("update:show", false);
        showAlert.value = true;
        alertType.value = "success";
        alertMessage.value = "Usuário atualizado com sucesso!";
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
    };
  },
};
</script>

<style scoped>
.snackbar {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
