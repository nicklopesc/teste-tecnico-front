<template>
  <div class="user-management">
    <v-container>
      <v-row class="justify-end">
        <v-col cols="12" md="3" lg="4">
          <CreateUserDialog />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="searchQuery"
            label="Pesquisar Usuário"
            prepend-inner-icon="mdi-magnify"
            variant="underlined"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <UserTable
            :items="filteredUsers"
            :headers="headers"
            :onUpdate="updateUser"
            :onDelete="deleteUser"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import UserTable from "./components/UserTable.vue";
import CreateUserDialog from "./components/CreateUserDialog.vue";

export default {
  name: "UserManagement",
  components: {
    UserTable,
    CreateUserDialog,
  },
  setup() {
    const store = useStore();
    const searchQuery = ref("");
    const showCreateUserDialog = ref(false);

    const users = computed(() => store.getters.users);

    const filteredUsers = computed(() => {
      return users.value.filter((user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    });

    const headers = [
      { title: "Avatar", value: "avatar", align: "center" },
      { title: "Nome", value: "name" },
      { title: "Email", value: "email" },
      { title: "Ações", value: "actions", sortable: false },
    ];

    onMounted(() => {
      store.dispatch("fetchUsers");
    });

    const handleUserCreated = (newUser) => {
      store.dispatch("addUser", newUser);
    };

    const updateUser = (id) => {
      console.log(`Atualizar usuário com ID: ${id}`);
    };

    const deleteUser = (id) => {
      console.log(`Deletar usuário com ID: ${id}`);
    };

    return {
      users,
      searchQuery,
      filteredUsers,
      showCreateUserDialog,
      handleUserCreated,
      updateUser,
      deleteUser,
      headers,
    };
  },
};
</script>

<style scoped>
.user-management {
  padding: 16px;
}

.add-user-btn {
  width: 100%;
}

.search-field {
  width: 100%;
}
</style>
