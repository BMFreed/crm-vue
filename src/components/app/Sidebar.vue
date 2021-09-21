<template>
  <ul class="sidenav app-sidenav" v-bind:class="{ open: value }">
    <li v-for="link in links" v-bind:key="link.url">
      <router-link
        v-bind:to="link.url"
        v-bind:exact="link.exact"
        class="waves-effect waves-orange pointer"
        active-class="active"
      >
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["value"],
  data: () => ({
    links: [
      { title: "Счёт", url: "/", exact: true },
      { title: "История", url: "/history", exact: false },
      { title: "Планирование", url: "/planning", exact: false },
      { title: "Новая запись", url: "/record", exact: false },
      { title: "Категории", url: "/categories", exact: false }
    ]
  })
};
</script>

<style scoped></style>
