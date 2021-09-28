<template>
  <div>
    <Loader v-if="loading" />
    <p v-else-if="!this.record" class="center">Запись не найдена</p>
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          {{ "History" | localize }}
        </router-link>
        <a class="breadcrumb">
          {{ record.type === "income" ? income : outcome }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            v-bind:class="{
              red: record.type === 'outcome',
              green: record.type === 'income'
            }"
            class="card"
          >
            <div class="card-content white-text">
              <p>{{ "Description" | localize }}: {{ record.description }}</p>
              <p>{{ "Amount" | localize }}: {{ record.amount | currency }}</p>
              <p>{{ "Category" | localize }}: {{ record.categoryName }}</p>

              <small>{{ record.date | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";
export default {
  name: "Detail-record",
  data() {
    return {
      record: null,
      loading: true
    };
  },
  computed: {
    income() {
      return localizeFilter("Income");
    },
    outcome() {
      return localizeFilter("Outcome");
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );
    this.record = {
      ...record,
      categoryName: category.title
    };
    this.loading = false;
  }
};
</script>

<style scoped></style>
