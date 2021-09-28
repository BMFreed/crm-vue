export default function invalidLimit(validator) {
  const badValue = validator.limit.$dirty && !validator.limit.minValue;
  const minValue = validator.limit.$params.minValue.min;
  const errors = [
    { error: badValue, message: `Минимальное значение: ${minValue} !` }
  ];
  for (let i = 0; i < errors.length; i++) {
    if (errors[i].error) {
      return errors[i].message;
    }
  }
  return false;
}
