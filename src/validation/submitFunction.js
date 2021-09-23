export default async function submitFunction(
  validator,
  email,
  password,
  name,
  store,
  router,
  type
) {
  if (validator.$invalid) {
    validator.$touch();
    return;
  }
  const formData = {
    email: email,
    password: password
  };

  if (type === "register") {
    formData.name = name;
  }
  await store.dispatch(type, formData);
  router.push("/");
}
