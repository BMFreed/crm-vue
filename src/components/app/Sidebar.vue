<template>
  <ul class="sidenav app-sidenav" v-bind:class="{ open: value }">
    <!--    <li v-for="link in links" v-bind:key="link.url">-->
    <router-link
      v-for="link in links"
      v-bind:key="link.url"
      v-bind:to="link.url"
      v-bind:exact="link.exact"
      custom
      v-slot="{ href, navigate, isActive }"
    >
      <li :class="[isActive && 'active']">
        <a
          :href="href"
          v-on:click="navigate"
          class="waves-effect waves-orange pointer"
        >
          {{ link.title }}
        </a>
      </li>
    </router-link>
    <!--    </li>-->
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "Sidebar",
  props: ["value"],
  data: () => ({
    links: [
      { title: localizeFilter("Bill"), url: "/", exact: true },
      { title: localizeFilter("History"), url: "/history", exact: false },
      { title: localizeFilter("Planning"), url: "/planning", exact: false },
      { title: localizeFilter("New_record"), url: "/record", exact: false },
      { title: localizeFilter("Categories"), url: "/categories", exact: false }
    ]
  })
};
</script>

<style scoped>
.link-active {
  background-color: #ddd;
}
</style>
