<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <Create v-on:created="addNewCategory" />
        <Edit v-bind:categories="categories" />
      </div>
    </section>
  </div>
</template>

<script>
import Create from "@/components/Categories/Create";
import Edit from "@/components/Categories/Edit";
export default {
  name: "Categories",
  components: { Create, Edit },
  data() {
    return {
      categories: [],
      loading: true
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    }
  }
};
</script>

<style scoped></style>
