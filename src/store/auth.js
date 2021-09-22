import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

export default {
  actions: {
    async register({ dispatch }, { email, password, name }) {
      const auth = getAuth();
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const userId = await dispatch("getUserId");
        const database = await getDatabase();
        await set(ref(database, "users/" + userId + "/info"), {
          bill: 10000,
          name
        });
      } catch (error) {
        console.log(error.code + "\n" + error.message);
        throw error;
      }
    },

    async login(type, { email, password }) {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error.code + "\n" + error.message);
        throw error;
      }
    },

    getUserId() {
      const auth = getAuth();
      const user = auth.currentUser;
      return user ? user.uid : null;
    },

    async logout() {
      await signOut;
    }
  }
};
