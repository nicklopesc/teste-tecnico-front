<template>
  <v-container fluid fill-height class="login-container">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="8" lg="6">
        <div class="login-content">
          <span class="text-h5">Login</span>
          <span class="subtext">
            Para acessar o sistema, insira usuário e senha!
          </span>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="username"
              density="compact"
              required
              placeholder="Usuário"
              variant="outlined"
              class="login-input"
              :rules="[rules.required]"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              required
              density="compact"
              placeholder="Senha"
              variant="outlined"
              @click:append-inner="showPassword = !showPassword"
              class="login-input"
              :rules="[rules.required]"
            ></v-text-field>

            <v-btn
              type="submit"
              color="#038c7f"
              class="login-btn"
              :loading="loading"
            >
              Login
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const showPassword = ref(false);
    const rules = {
      required: (value) => !!value || "Required.",
    };

    const handleLogin = () => {
      loading.value = true;
      setTimeout(() => {
        if (username.value === "user" && password.value === "password") {
          localStorage.setItem(
            "user",
            JSON.stringify({ username: username.value })
          );
          window.location.href = "/dashboard";
        } else {
          alert("Invalid credentials");
        }
        loading.value = false;
      }, 1000);
    };

    return {
      username,
      password,
      handleLogin,
      rules,
      loading,
      showPassword,
    };
  },
};
</script>

<style scoped>
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-container {
  background: linear-gradient(to bottom, #038c7f, #000000);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-content {
  padding: 24px;
  max-width: 450px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
  margin: 0 auto;
}

.text-h5 {
  color: #ffffff;
  display: block;
  margin-bottom: 16px;
  font-weight: bold;
}

.subtext {
  color: #e0e0e0;
  display: block;
  margin-bottom: 24px;
}

.login-input {
  margin-bottom: 10px;
  width: 100%;
  color: #ffffff;
  border-radius: 4px;
}

.login-input .v-label {
  color: #ffffff;
}

.login-btn {
  width: 100%;
  background-color: #1e88e5;
  color: #ffffff;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #1565c0;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
