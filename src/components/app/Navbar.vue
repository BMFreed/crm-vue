<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a v-on:click.prevent="$emit('click')" class="pointer no-select">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date("datetime") }}</span>
      </div>
      <div class="switch">
        <label class="black-text">
          English
          <input
            v-model="isRuLocale"
            type="checkbox"
            v-on:click="langHandler"
          />
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{ "Profile_Title" | localize }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" v-on:click="logout">
                <i class="material-icons">assignment_return</i>
                {{ "Exit" | localize }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from "materialize-css";
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      isRuLocale: true,
      date: new Date(),
      interval: null,
      dropdown: null
    };
  },
  methods: {
    async logout() {
      console.log("logout");
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
    async langHandler() {
      await this.$store.dispatch("updateInfo", {
        locale: this.isRuLocale ? "en-US" : "ru-RU"
      });
    }
  },
  computed: {
    ...mapGetters(["info"]),
    name() {
      return this.info.name;
    }
  },
  mounted() {
    this.isRuLocale = this.info.locale === "ru-RU";
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    });
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  }
};
</script>

<style scoped></style>
