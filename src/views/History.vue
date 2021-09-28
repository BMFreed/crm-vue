<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>
    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!filteredRecords.length" class="center">
      Записей пока нет,
      <router-link to="/record">добавьте их!</router-link>
    </p>
    <section v-else>
      <Table v-bind:records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="paginationHandler"
        :prev-text="'Назад'"
        :next-text="'Вперёд'"
        :container-class="'pagination no-select center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import Table from "@/components/History/Table";
import { financialDataMixin } from "@/mixins/financialDataMixin";
import { paginationMixin } from "@/mixins/paginationMixin";
export default {
  name: "History",
  mixins: [financialDataMixin, paginationMixin],
  components: {
    Table
  },
  data() {
    return {
      records: [],
      filteredRecords: []
    };
  },
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    this.filteredRecords = this.records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(
          category => category.id === record.categoryId
        ).title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "доход" : "расход"
      };
    });
    this.filteredRecords = this.filteredRecords.slice().reverse();
    this.setupPagination(this.filteredRecords);
    this.loading = false;
  }
};
</script>

<style scoped></style>
