import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth
} from "firebase/auth";
import { set, ref, getDatabase } from "firebase/database";

export default {
  actions: {
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        const userId = await dispatch("getUserId");
        const database = getDatabase();
        await set(ref(database, "users/" + userId + "/info"), {
          bill: 10000,
          name
        });
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async login({ commit }, { email, password }) {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async logout({ commit }) {
      await signOut;
      commit("clearInfo");
    }
  }
};
