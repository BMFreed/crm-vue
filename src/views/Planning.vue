<template>
  <div>
    <div class="page-title">
      <h3>{{ "Planning" | localize }}</h3>
      <h4>{{ info.bill | currency("RUB") }}</h4>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      {{ "No_categories" | localize }}
      <router-link to="/categories">{{ "Add_them" | localize }}</router-link>
    </p>
    <section v-else>
      <div
        v-for="category in filteredCategories"
        v-bind:key="category.id"
        v-tooltip="category.tooltip"
      >
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spend | currency }} {{ "Of" | localize }}
          {{ category.limit | currency }}
        </p>
        <div class="progress">
          <div
            class="determinate"
            v-bind:class="[category.progressColor]"
            v-bind:style="{ width: category.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { financialDataMixin } from "@/mixins/financialDataMixin";
import currencyFilter from "@/filters/currency.filter";
export default {
  name: "Planning",
  mixins: [financialDataMixin],
  data() {
    return {
      filteredCategories: []
    };
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    this.filteredCategories = this.categories.map(category => {
      const spend = records
        .filter(record => record.categoryId === category.id)
        .filter(record => record.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);
      const percent = (100 * spend) / category.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const remaining = category.limit - spend;
      const tooltip = `${
        remaining < 0 ? "Превышение на" : "Осталось"
      } ${currencyFilter(Math.abs(remaining))}`;
      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip
      };
    });
  }
};
</script>

<style scoped></style>
