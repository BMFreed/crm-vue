import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { set, ref } from "firebase/database";
import { auth, database } from "@/main";

export default {
  actions: {
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const userId = await dispatch("getUserId");
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
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    getUserId() {
      const user = auth.currentUser;
      return user ? user.uid : null;
    },

    async logout({ commit }) {
      await signOut;
      commit("clearInfo");
    }
  }
};
