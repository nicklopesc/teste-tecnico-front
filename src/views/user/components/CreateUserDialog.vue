<template>
  <div>
    <v-btn @click="openDialog" color="#038c7f" class="add-user-btn">
      Adicionar Usuário
    </v-btn>

    <v-dialog v-model="dialogVisible" max-width="600px">
      <v-card>
        <v-toolbar flat color="#038c7f">
          <v-toolbar-title class="white--text">
            Adicionar Novo Usuário
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon class="white--text">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-form @submit.prevent="createUser" ref="form">
            <v-text-field
              v-model="newUser.name"
              label="Nome"
              required
              variant="outlined"
              :error-messages="errors.name"
            ></v-text-field>
            <v-text-field
              v-model="newUser.job"
              label="Cargo"
              required
              variant="outlined"
              :error-messages="errors.job"
            ></v-text-field>
            <Buttons
              @cancel="cancel"
              @confirm="createUser"
              confirmButtonColor="#038c7f"
              confirmButtonText="Salvar"
            />
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <Alert :message="alertMessage" :color="alertColor" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import Buttons from "../../../components/Buttons.vue";
import Alert from "../../../components/Alert.vue";

const store = useStore();

const dialogVisible = ref(false);
const newUser = ref({
  name: "",
  job: "",
});
const alertMessage = ref("");
const alertColor = ref("success");
const errors = ref({ name: [], job: [] });

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  clearForm();
};

const cancel = () => {
  closeDialog();
};

const createUser = async () => {
  errors.value = { name: [], job: [] };

  let valid = true;
  if (!newUser.value.name) {
    errors.value.name.push("Nome é obrigatório.");
    valid = false;
  }
  if (!newUser.value.job) {
    errors.value.job.push("Cargo é obrigatório.");
    valid = false;
  }
  if (!valid) return;

  try {
    await store.dispatch("createUser", newUser.value);
    alertMessage.value = "Usuário criado com sucesso!";
    alertColor.value = "success";
  } catch (error) {
    console.error("Error:", error);
    alertMessage.value = "Erro ao criar o usuário.";
    alertColor.value = "error";
  } finally {
    closeDialog();
  }
};

const clearForm = () => {
  newUser.value.name = "";
  newUser.value.job = "";
};
</script>

<style scoped>
.add-user-btn {
  width: 100%;
}
</style>
