<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ "Create" | localize }}</h4>
      </div>

      <form v-on:submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="create_name"
            type="text"
            v-model="title"
            v-bind:class="{ invalid: isInvalidTitle }"
          />
          <label for="create_name">{{ "Title" | localize }}</label>
          <span v-if="isInvalidTitle" class="helper-text invalid">
            {{ isInvalidTitle }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="create_limit"
            type="number"
            v-model.number="limit"
            v-bind:class="{ invalid: isInvalidLimit }"
          />
          <label for="create_limit">{{ "Limit" | localize }}</label>
          <span v-if="isInvalidLimit" class="helper-text invalid">
            {{ isInvalidLimit }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ "Create" | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { categoriesMixin } from "@/mixins/categoriesMixin";
import submitFunction from "@/validation/categories/submitFunction";
export default {
  name: "Create",
  mixins: [categoriesMixin],
  methods: {
    submitHandler() {
      submitFunction(this, "create");
    }
  }
};
</script>

<style scoped></style>
