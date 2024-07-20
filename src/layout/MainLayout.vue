<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      :permanent="permanent"
      class="custom-background"
    >
      <v-list class="flex-column">
        <div class="logo">
          <span class="text-h3">User</span>
        </div>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="navigate(item.route)"
          class="custom-list-item"
        >
          <div class="list-item-flex">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>

        <v-spacer></v-spacer>

        <v-divider></v-divider>

        <v-list-item @click="logout" class="custom-list-item">
          <div class="list-item-flex">
            <v-icon class="mr-2">mdi-logout</v-icon>
            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#038c7f">
      <v-toolbar-title class="toolbar-title">Olá, User!</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "MainLayout",
  setup() {
    const drawer = ref(true);
    const permanent = ref(true);
    const router = useRouter();

    const items = [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
      { title: "Usuário", icon: "mdi-account-multiple", route: "/users" },
    ];

    const navigate = (route) => {
      drawer.value = permanent.value;
      router.push(route);
    };

    const logout = () => {
      console.log("Usuário deslogado");
      router.push("/login");
    };

    return {
      drawer,
      permanent,
      items,
      navigate,
      logout,
    };
  },
};
</script>

<style>
.custom-background {
  background: linear-gradient(to bottom, #038c7f, #038c7f, #1c1c1c) !important;
}

.custom-list-item {
  transition: background-color 0.3s ease;
}

.custom-list-item:hover {
  background-color: #025f56;
}

.list-item-flex {
  display: flex;
  align-items: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  margin-bottom: 8px;
  font-weight: bold;
  color: #000000;
}

.v-application--wrap {
  min-height: 100vh;
}

.toolbar-title {
  color: black;
}
</style>
