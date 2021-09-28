export default function invalidPassword(validator, requiredMessage) {
  const minLength = validator.password.$params.minLength.min;
  const invalidLength =
    validator.password.$dirty && !validator.password.minLength;
  const empty = validator.password.$dirty && !validator.password.required;
  const errors = [
    {
      error: empty,
      message: requiredMessage
    },

    {
      error: invalidLength,
      message: `Пароль должен иметь минимум ${minLength} символов!`
    }
  ];
  for (let i = 0; i < errors.length; i++) {
    if (errors[i].error) {
      return errors[i].message;
    }
  }
  return false;
}
