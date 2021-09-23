import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
    async fetchInfo({ commit }) {
      const auth = getAuth();
      onAuthStateChanged(auth, async user => {
        if (user) {
          const userId = user.uid;
          const database = getDatabase();
          const infoRef = await ref(database, "users/" + userId + "/info");
          onValue(infoRef, snapshot => {
            const info = snapshot.val();
            commit("setInfo", info);
          });
        }
      });
    }
  },
  getters: {
    info: state => state.info
  }
};
