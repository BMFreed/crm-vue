<template>
  <div>
    <Loader v-if="!loaded" />
    <div v-else class="app-main-layout">
      <Navbar v-on:click="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" v-bind:key="locale" />
      <main class="app-content" v-bind:class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div v-tooltip="'Создать новую запись'" class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import { firebaseErrorMixin } from "@/mixins/firebaseErrorMixin";
export default {
  name: "MainLayout",
  mixins: [firebaseErrorMixin],
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return { isOpen: true };
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
  },
  computed: {
    loaded() {
      return Object.keys(this.$store.getters.info).length;
    },
    locale() {
      return this.$store.getters.info.locale;
    }
  }
};
</script>

<style scoped></style>
