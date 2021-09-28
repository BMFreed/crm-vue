import messages from "@/utils/messages";
export const regAuthErrorMixin = {
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(firebaseError) {
      console.log(firebaseError.code);
      this.$error(
        messages[firebaseError.code] || "Абсолютно неизвестная ошибка!"
      );
    }
  }
};
