import { createStore } from "vuex";
import {
  getUsers,
  createUser,
  updateUser as apiUpdateUser,
  deleteUser,
} from "../service/userService";

export default createStore({
  state: {
    users: [],
    loading: false,
    error: null,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    addUser(state, newUser) {
      state.users.push(newUser);
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      } else {
        state.users.push(updatedUser);
      }
    },
    deleteUser(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId);
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      commit("setLoading", true);
      try {
        const { data } = await getUsers();
        commit("setUsers", data);
      } catch (error) {
        commit("setError", error.message);
      } finally {
        commit("setLoading", false);
      }
    },
    async createUser({ commit }, userData) {
      commit("setLoading", true);
      try {
        const newUser = await createUser(userData);
        commit("addUser", newUser);
      } catch (error) {
        commit("setError", error.message);
      } finally {
        commit("setLoading", false);
      }
    },
    async updateUser({ commit }, { id, userData }) {
      commit("setLoading", true);
      try {
        const updatedUser = await apiUpdateUser(id, userData);
        commit("updateUser", updatedUser);
        commit("setError", null);
        return updatedUser;
      } catch (error) {
        commit("setError", error.message);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },
    async deleteUser({ commit }, userId) {
      commit("setLoading", true);
      try {
        await deleteUser(userId);
        commit("deleteUser", userId);
      } catch (error) {
        commit("setError", error.message);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    users: (state) => state.users,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
});
