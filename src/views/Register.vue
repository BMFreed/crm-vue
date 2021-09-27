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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-bind:class="{
            invalid: nameError
          }"
          v-model.trim="name"
        />
        <label for="name">Имя</label>
        <small v-if="nameError" class="helper-text invalid">
          {{ nameError }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { regAuthValidationMixin } from "@/mixins/regAuthValidationMixin.js";
import { firebaseErrorMixin } from "@/mixins/firebaseErrorMixin";
import submitFunction from "@/validation/reg-auth/submitFunction";
import { email, minLength, required } from "vuelidate/lib/validators";

export default {
  name: "Register",
  mixins: [regAuthValidationMixin, firebaseErrorMixin],
  methods: {
    submitHandler() {
      submitFunction(
        this.$v,
        this.email,
        this.password,
        this.name,
        this.$store,
        this.$router,
        "register"
      );
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: value => value === true }
  }
};
</script>

<style scoped></style>
