<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ "Currency_title" | localize }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ "Currency" | localize }}</th>
              <th>{{ "Rates" | localize }}</th>
              <th>{{ "Date" | localize }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(currency, index) in currencies" v-bind:key="index">
              <td>{{ currency }}</td>
              <td>{{ rates[currency].toFixed(2) }}</td>
              <td>{{ date | date("date") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Currency",
  props: ["rates", "date"],
  data() {
    return {
      currencies: ["RUB", "USD", "EUR"]
    };
  }
};
</script>

<style scoped></style>
