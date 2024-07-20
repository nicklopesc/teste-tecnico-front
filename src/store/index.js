import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await fetch("https://reqres.in/api/users");
        if (!response.ok) throw new Error("Erro na resposta da rede");
        const data = await response.json();
        commit("setUsers", data.data);
      } catch (error) {
        console.error("Falha ao buscar usuários:", error);
      }
    },
  },
  getters: {
    users: (state) => state.users,
  },
});
