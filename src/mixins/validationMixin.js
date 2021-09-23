import invalidEmail from "@/validation/invalidEmail";
import invalidPassword from "@/validation/invalidPassword";
import invalidName from "@/validation/invalidName";
import messages from "@/utils/messages";

export const validationMixin = {
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
