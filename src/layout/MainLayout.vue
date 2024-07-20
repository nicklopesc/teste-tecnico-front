<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      app
      v-model="drawer"
      :permanent="isPermanent"
      :temporary="isTemporary"
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

    <!-- App Bar with Menu Button -->
    <v-app-bar app color="#038c7f">
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title class="toolbar-title">Olá, User!</v-toolbar-title>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "MainLayout",
  setup() {
    const drawer = ref(true);
    const isPermanent = computed(() => window.innerWidth >= 960); // Permanent on large screens
    const isTemporary = computed(() => window.innerWidth < 960); // Temporary on small screens

    const router = useRouter();

    const items = [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
      { title: "Usuário", icon: "mdi-account-multiple", route: "/users" },
    ];

    const navigate = (route) => {
      drawer.value = false; // Close drawer on item click (mobile)
      router.push(route);
    };

    const logout = () => {
      console.log("Usuário deslogado");
      router.push("/login");
    };

    const toggleDrawer = () => {
      drawer.value = !drawer.value; // Toggle drawer visibility
    };

    // Watch for window resize events
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        drawer.value = true; // Show drawer on large screens
      }
    });

    return {
      drawer,
      isPermanent,
      isTemporary,
      items,
      navigate,
      logout,
      toggleDrawer,
    };
  },
};
</script>

<style scoped>
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
