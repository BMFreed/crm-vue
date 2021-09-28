<template>
  <div>
    <div class="page-title">
      <h3>{{ "Profile_Title" | localize }}</h3>
    </div>

    <form v-on:submit.prevent="submitHandler" class="form">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="name"
          v-bind:class="{
            invalid: isInvalidName
          }"
        />
        <label for="description">{{ "Profile_Name" | localize }}</label>
        <small v-if="isInvalidName" class="helper-text invalid">
          {{ isInvalidName }}
        </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import M from "materialize-css";
import invalidName from "@/validation/reg-auth/invalidName";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Profile",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      await this.$store.dispatch("updateInfo", { name: this.name });
    }
  },
  computed: {
    ...mapGetters(["info"]),
    isInvalidName() {
      return invalidName(this.$v, "Поле не может быть пустым!");
    }
  },
  beforeMount() {
    this.name = this.info.name;
  },
  mounted() {
    M.updateTextFields();
  },
  validations: {
    name: { required }
  }
};
</script>

<style scoped></style>
