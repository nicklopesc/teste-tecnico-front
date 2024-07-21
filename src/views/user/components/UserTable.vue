<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-data-table :headers="headers" :items="items" item-key="id">
          <template v-slot:item.avatar="{ item }">
            <v-avatar size="x-large">
              <img :src="item.avatar" alt="User Avatar" />
            </v-avatar>
          </template>

          <template v-slot:item.name="{ item }">
            {{ item.first_name }} {{ item.last_name }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon @click="editUser(item)" class="action-icon">
              mdi-pencil
            </v-icon>
            <v-icon @click="confirmDelete(item)" class="action-icon">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>

        <!-- Edit User Dialog -->
        <EditUserDialog
          v-model:show="showEditUserDialog"
          :user="selectedUser"
          @save="handleSaveUser"
        />

        <!-- Delete User Dialog -->
        <DeleteUserDialog
          v-model:show="showDeleteUserDialog"
          :user="selectedUser"
          @save="handleDeleteUser"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditUserDialog from "./EditUserDialog.vue";
import DeleteUserDialog from "./DeleteUserDialog.vue";

export default {
  name: "UserTable",
  components: {
    EditUserDialog,
    DeleteUserDialog,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    onUpdate: {
      type: Function,
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showEditUserDialog: false,
      showDeleteUserDialog: false,
      selectedUser: null,
    };
  },
  methods: {
    editUser(user) {
      this.selectedUser = { ...user }; // Pass the selected user to the dialog
      this.showEditUserDialog = true;
    },
    confirmDelete(user) {
      this.selectedUser = { ...user }; // Pass the selected user to the dialog
      this.showDeleteUserDialog = true;
    },
    handleSaveUser(updatedUser) {
      this.$emit("onUpdate", updatedUser.id, updatedUser);
      this.showEditUserDialog = false;
    },
    handleDeleteUser() {
      if (this.selectedUser) {
        this.$emit("onDelete", this.selectedUser.id);
        this.showDeleteUserDialog = false;
      }
    },
  },
};
</script>

<style scoped>
.action-icon {
  cursor: pointer;
  margin-left: 8px;
}

.v-avatar img {
  width: 50px;
  height: 50px;
}
</style>
