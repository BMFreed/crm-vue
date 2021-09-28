<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ "Amount" | localize }}</th>
        <th>{{ "Date" | localize }}</th>
        <th>{{ "Category" | localize }}</th>
        <th>{{ "Type" | localize }}</th>
        <th>{{ "Open" | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) of records" v-bind:key="record.id">
        <td>{{ index + 1 }}</td>
        <td>{{ record.amount | currency("RUB") }}</td>
        <td>{{ record.date | date("datetime") }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span v-bind:class="[record.typeClass]" class="white-text badge">
            {{ capitalize(record.type) | localize }}
          </span>
        </td>
        <td>
          <button
            v-tooltip="'Подробности'"
            v-on:click="$router.push('/detail-record/' + record.id)"
            class="btn-small btn"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    capitalize(text) {
      const capitalStr = text.charAt(0).toUpperCase() + text.slice(1);
      return capitalStr;
    }
  }
};
</script>

<style scoped></style>
