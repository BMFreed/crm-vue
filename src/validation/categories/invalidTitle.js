export default function invalidTitle(validator) {
  const empty = validator.title.$dirty && !validator.title.required;
  const errors = [{ error: empty, message: "Обязательное поле!" }];
  for (let i = 0; i < errors.length; i++) {
    if (errors[i].error) {
      return errors[i].message;
    }
  }
  return false;
}
