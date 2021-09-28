import M from "materialize-css";
import invalidTitle from "@/validation/categories/invalidTitle";
import invalidLimit from "@/validation/categories/invalidLimit";
import { minValue, required } from "vuelidate/lib/validators";

export const categoriesMixin = {
  data() {
    return {
      title: "",
      limit: 100
    };
  },
  mounted() {
    M.updateTextFields();
  },
  computed: {
    isInvalidTitle() {
      return invalidTitle(this.$v);
    },
    isInvalidLimit() {
      return invalidLimit(this.$v);
    }
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  }
};
