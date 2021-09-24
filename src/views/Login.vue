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
import { regAuthValidationMixin } from "@/mixins/regAuthValidationMixin.js";
import { regAuthErrorMixin } from "@/mixins/regAuthErrorMixin";
import submitFunction from "@/validation/reg-auth/submitFunction";
import { email, minLength, required } from "vuelidate/lib/validators";

export default {
  name: "Login.vue",
  mixins: [regAuthValidationMixin, regAuthErrorMixin],
  methods: {
    async submitHandler() {
      await submitFunction(
        this.$v,
        this.email,
        this.password,
        null,
        this.$store,
        this.$router,
        "login"
      );
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  }
};
</script>

<style scoped></style>
