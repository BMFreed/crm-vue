export default function invalidName(validator, requiredMessage) {
  const empty = validator.email.$dirty && !validator.email.required;
  const notEmail = validator.email.$dirty && !validator.email.email;
  const errors = [
    { error: empty, message: requiredMessage },
    { error: notEmail, message: "Введите корректный Email!" }
  ];
  for (let i = 0; i < errors.length; i++) {
    if (errors[i].error) {
      return errors[i].message;
    }
  }
  return false;
}
