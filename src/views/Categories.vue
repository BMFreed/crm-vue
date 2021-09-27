<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <Create v-on:created="addNewCategory" />
        <Edit
          v-if="categories.length"
          v-bind:categories="categories"
          v-bind:key="categories.length + updateCount"
          v-on:updated="updateCategories"
        />
        <p v-else class="center">Категорий пока нет...</p>
      </div>
    </section>
  </div>
</template>

<script>
import Create from "@/components/Categories/Create";
import Edit from "@/components/Categories/Edit";
import { financialDataMixin } from "@/mixins/financialDataMixin";
export default {
  name: "Categories",
  components: { Create, Edit },
  mixins: [financialDataMixin],
  data() {
    return {
      updateCount: 0
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const index = this.categories.findIndex(cat => cat.id === category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.updateCount++;
    }
  }
};
</script>

<style scoped></style>
