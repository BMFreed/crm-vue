import { mapGetters } from "vuex";
export const financialDataMixin = {
  data() {
    return {
      categories: [],
      loading: true
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    if (this.categories.length) {
      this.current = this.categories[0].id;
    }
    this.loading = false;
  },
  computed: {
    ...mapGetters(["info"])
  }
};
