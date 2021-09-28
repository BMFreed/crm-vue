import _ from "lodash";
import localizeFilter from "@/filters/localize.filter";

export const paginationMixin = {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: []
    };
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    paginationHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
    }
  },
  computed: {
    forward() {
      return localizeFilter("Forward");
    },
    back() {
      return localizeFilter("Back");
    }
  }
};
