export default function invalidName(validator, requiredMessage) {
  const empty = validator.name.$dirty && !validator.name.required;
  const errors = [{ error: empty, message: requiredMessage }];
  for (let i = 0; i < errors.length; i++) {
    if (errors[i].error) {
      return errors[i].message;
    }
  }
  return false;
}
