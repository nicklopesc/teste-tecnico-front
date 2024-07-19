
import { createStore } from 'vuex';

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
      const response = await fetch('https://reqres.in/api/users');
      const data = await response.json();
      console.log("DATA", data)
      commit('setUsers', data.data);
    },
  },
  getters: {
    users: state => state.users,
  },
});
