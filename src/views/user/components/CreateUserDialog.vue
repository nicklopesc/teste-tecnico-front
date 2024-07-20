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
          <v-btn icon @click="dialogVisible = false">
            <v-icon class="white--text">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-form @submit.prevent="createUser">
            <v-text-field
              v-model="newUser.name"
              label="Nome"
              required
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="newUser.job"
              label="Cargo"
              required
              variant="outlined"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import Buttons from "../../../components/Buttons.vue";
import ActionAlert from "../../../components/ActionAlert.vue";

const dialogVisible = ref(false);
const newUser = ref({
  name: "",
  job: "",
});
const alertVisible = ref(false);
const alertSeverity = ref("success");
const alertMessage = ref("");
const alertErrorDetails = ref("");

const openDialog = () => {
  dialogVisible.value = true;
};

const cancel = () => {
  dialogVisible.value = false;
  clearForm();
};

const createUser = async () => {
  try {
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser.value),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Usuário criado:", data);
      alertSeverity.value = "success";
      alertMessage.value = "Usuário criado com sucesso!";
      alertErrorDetails.value = ""; // Pode ser deixado em branco
      dialogVisible.value = false;
      clearForm();
    } else {
      const errorData = await response.json();
      alertSeverity.value = "error";
      alertMessage.value = "Falha ao criar usuário.";
      alertErrorDetails.value =
        errorData.error || "Detalhes do erro não disponíveis.";
    }
  } catch (error) {
    alertSeverity.value = "error";
    alertMessage.value = "Erro ao criar usuário.";
    alertErrorDetails.value = error.message;
    console.error("Error:", error);
  } finally {
    alertVisible.value = true;
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
