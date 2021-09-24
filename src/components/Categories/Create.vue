<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form v-on:submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            v-bind:class="{ invalid: isInvalidTitle }"
          />
          <label for="name">Название</label>
          <span v-if="isInvalidTitle" class="helper-text invalid">
            {{ isInvalidTitle }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            v-bind:class="{ invalid: isInvalidLimit }"
          />
          <label for="limit">Лимит</label>
          <span v-if="isInvalidLimit" class="helper-text invalid">
            {{ isInvalidLimit }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// import { required, minValue } from "vuelidate/lib/validators";
// import invalidTitle from "@/validation/categories/invalidTitle";
// import invalidLimit from "@/validation/categories/invalidLimit";
// import M from "materialize-css";
import { categoriesMixin } from "@/mixins/categoriesMixin";
export default {
  name: "Create",
  mixins: [categoriesMixin],
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const category = await this.$store.dispatch("createCategory", {
        title: this.title,
        limit: this.limit
      });
      console.log(category);
      this.title = "";
      this.limit = this.$v.limit.$params.minValue.min;
      this.$v.reset;
      this.$message("Категория была создана!");
      this.$emit("created", category);
    }
  }
};
</script>

<style scoped></style>
