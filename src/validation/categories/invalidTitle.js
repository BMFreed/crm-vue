export default function invalidTitle(validator) {
  const empty = validator.title.$dirty && !validator.title.required;
  const errors = [{ error: empty, message: "Введите название категории!" }];
  for (let i = 0; i < errors.length; i++) {
    if (errors[i].error) {
      return errors[i].message;
    }
  }
  return false;
}
