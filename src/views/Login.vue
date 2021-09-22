<template>
  <form class="card auth-card" v-on:submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          v-bind:class="{
            invalid: emailError
          }"
        />
        <label for="email">Email</label>
        <small v-if="emailError" class="helper-text invalid">
          {{ emailError }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          v-bind:class="{
            invalid: passwordError
          }"
        />
        <label for="password">Пароль</label>
        <small v-if="passwordError" class="helper-text invalid">
          {{ passwordError }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import invalidEmail from "@/validation/invalidEmail";
import invalidPassword from "@/validation/invalidPassword";
import messages from "@/utils/messages";

export default {
  name: "Login.vue",
  data() {
    return {
      email: "",
      password: "",
      required: "Обязательное поле!"
    };
  },
  mounted() {
    messages(this);
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password
      };
      await this.$store.dispatch("login", formData);
      this.$router.push("/");
    }
  },
  computed: {
    emailError() {
      return invalidEmail(this.$v, this.required);
    },
    passwordError() {
      return invalidPassword(this.$v, this.required);
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  }
};
</script>

<style scoped></style>
