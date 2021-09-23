<template>
  <div class="home">
    <div>
      <div class="page-title">
        <h3>Счет</h3>

        <button
          class="btn waves-effect waves-light btn-small"
          v-on:click="refresh"
        >
          <i class="material-icons">refresh</i>
        </button>
      </div>
      <Loader v-if="loading" />
      <div v-else class="row">
        <Bill v-bind:rates="currency.rates" />
        <Currency v-bind:rates="currency.rates" v-bind:date="currency.date" />
      </div>
    </div>
  </div>
</template>

<script>
import Bill from "@/components/Home/Bill";
import Currency from "@/components/Home/Currency";
export default {
  name: "Home",
  components: {
    Bill,
    Currency
  },
  data() {
    return {
      loading: true,
      resolved: false,
      currency: null
    };
  },
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    }
  }
};
</script>
