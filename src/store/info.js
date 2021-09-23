import { onValue, ref } from "firebase/database";
import { database } from "@/main";
export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      const userId = await dispatch("getUserId");
      const infoRef = await ref(database, "users/" + userId + "/info");
      onValue(infoRef, snapshot => {
        const info = snapshot.val();
        commit("setInfo", info);
      });
    }
  },
  getters: {
    info: state => state.info
  }
};
