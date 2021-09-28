<template>
  <div>
    <div class="page-title">
      <h3>{{ "History_title" | localize }}</h3>
    </div>
    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!filteredRecords.length" class="center">
      {{ "No_records" | localize }}
      <router-link to="/record">{{ "Add_them" | localize }}</router-link>
    </p>
    <section v-else>
      <Table v-bind:records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="paginationHandler"
        :prev-text="forward"
        :next-text="back"
        :container-class="'pagination no-select center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import Table from "@/components/History/Table";
import { Pie } from "vue-chartjs/src/BaseCharts";
import { financialDataMixin } from "@/mixins/financialDataMixin";
import { paginationMixin } from "@/mixins/paginationMixin";
export default {
  name: "History",
  extends: Pie,
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
  methods: {
    setupRecords() {
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
    },
    randomColor() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `${r}, ${g}, ${b}`;
    }
  },
  computed: {
    randomColorsArray() {
      const arr = [];
      for (let i = 0; i < this.categories.length; i++) {
        arr[i] = this.randomColor();
      }
      return arr;
    },
    chartData() {
      return {
        labels: this.categories.map(category => category.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: this.categories.map(category => {
              return this.records.reduce((total, record) => {
                if (
                  record.categoryId === category.id &&
                  record.type === "outcome"
                ) {
                  total += +record.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: this.randomColorsArray.map(
              color => `rgba(${color}, 0.5)`
            ),
            borderColor: this.randomColorsArray.map(color => `rgba(${color})`),
            borderWidth: 1
          }
        ]
      };
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    this.setupRecords();
    this.setupPagination(this.filteredRecords);
    this.renderChart(this.chartData);
    this.loading = false;
  }
};
</script>

<style scoped></style>
