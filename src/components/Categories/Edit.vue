<template
  ><div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ "Edit" | localize }}</h4>
      </div>

      <form v-on:submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category of categories"
              v-bind:key="category.id"
              v-bind:value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
          <label>{{ "Pick_category" | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="update_name"
            type="text"
            v-model="title"
            v-bind:class="{ invalid: isInvalidTitle }"
          />
          <label for="update_name">{{ "Title" | localize }}</label>
          <span v-if="isInvalidTitle" class="helper-text invalid">
            {{ isInvalidTitle }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="update_limit"
            type="number"
            v-model.number="limit"
            v-bind:class="{ invalid: isInvalidLimit }"
          />
          <label for="update_limit">{{ "Limit" | localize }}</label>
          <span v-if="isInvalidLimit" class="helper-text invalid">
            {{ isInvalidLimit }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ "Update" | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import { categoriesMixin } from "@/mixins/categoriesMixin";
import submitFunction from "@/validation/categories/submitFunction";
export default {
  name: "Edit",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  mixins: [categoriesMixin],
  data() {
    return {
      select: null,
      current: null
    };
  },
  methods: {
    submitHandler() {
      submitFunction(this, "edit");
    }
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy;
    }
  },
  watch: {
    current(categoryId) {
      const { title, limit } = this.categories.find(
        category => category.id === categoryId
      );
      this.title = title;
      this.limit = limit;
    }
  }
};
</script>

<style scoped></style>
