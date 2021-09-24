import invalidEmail from "@/validation/reg-auth/invalidEmail";
import invalidPassword from "@/validation/reg-auth/invalidPassword";
import invalidName from "@/validation/reg-auth/invalidName";
import messages from "@/utils/messages";

export const regAuthValidationMixin = {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
      required: "Обязательное поле!"
    };
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  computed: {
    emailError() {
      return invalidEmail(this.$v, this.required);
    },
    passwordError() {
      return invalidPassword(this.$v, this.required);
    },
    nameError() {
      return invalidName(this.$v, this.required);
    }
  }
};
