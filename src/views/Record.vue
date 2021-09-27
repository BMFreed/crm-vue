<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      Категорий пока нет,
      <router-link to="/categories">добавьте их!</router-link>
    </p>
    <form v-else class="form" v-on:submit.prevent="submitHandler">
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
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          v-model.number="amount"
          id="amount"
          type="number"
          v-bind:class="{ invalid: isInvalidAmount }"
        />
        <label for="amount">Сумма</label>
        <span v-if="isInvalidAmount" class="helper-text invalid">
          {{ isInvalidAmount }}
        </span>
      </div>

      <div class="input-field">
        <input
          v-model="description"
          id="description"
          type="text"
          v-bind:class="{ invalid: isInvalidDescription }"
        />
        <label for="description">Описание</label>
        <span v-if="isInvalidDescription" class="helper-text invalid">
          {{ isInvalidDescription }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from "materialize-css";
import { minValue, required } from "vuelidate/lib/validators";
import { financialDataMixin } from "@/mixins/financialDataMixin";

export default {
  name: "Record",
  mixins: [financialDataMixin],
  data() {
    return {
      select: null,
      current: null,
      type: "outcome",
      amount: 1,
      description: ""
    };
  },
  computed: {
    isInvalidDescription() {
      const empty = this.$v.description.$dirty && !this.$v.description.required;
      const errors = [{ error: empty, message: "Обязательное поле!" }];
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].error) {
          return errors[i].message;
        }
      }
      return false;
    },
    isInvalidAmount() {
      const badValue = this.$v.amount.$dirty && !this.$v.amount.minValue;
      const minValue = this.$v.amount.$params.minValue.min;
      const errors = [
        { error: badValue, message: `Минимальное значение: ${minValue} !` }
      ];
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].error) {
          return errors[i].message;
        }
      }
      return false;
    },
    canCreateRecord() {
      if (this.type === "outcome") {
        return this.info.bill >= this.amount;
      }
      return true;
    }
  },
  updated() {
    if (!this.loading && !this.select) {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        await this.$store.dispatch("createRecord", {
          categoryId: this.current,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        });
        const bill =
          this.type === "income"
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;
        await this.$store.dispatch("updateInfo", { bill });
        this.$message("Запись успешно создана!");
        this.$v.$reset();
        this.amount = 1;
        this.description = "";
      } else {
        this.$message(
          `Недостаточно средств на счёте (${this.amount - this.info.bill})`
        );
      }
    }
  },
  validations: {
    description: { required },
    amount: { minValue: minValue(1) }
  }
};
</script>

<style scoped></style>
