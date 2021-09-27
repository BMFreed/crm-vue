export default async function submitFunction(page, type) {
  if (page.$v.$invalid) {
    page.$v.$touch();
    return;
  }
  const method = type === "create" ? "createCategory" : "updateCategory";
  const message =
    type === "create" ? "Категория была создана!" : "Категория была обновлена!";
  const categoryData = {
    id: page.current,
    title: page.title,
    limit: page.limit
  };
  if (type === "create") {
    const category = await page.$store.dispatch(method, categoryData);
    page.title = "";
    page.limit = page.$v.limit.$params.minValue.min;
    page.$v.reset;
    page.$emit("created", category);
  } else if (type === "edit") {
    await page.$store.dispatch(method, categoryData);
    page.$emit("updated", categoryData);
  } else throw new Error("Задан неверный тип");
  page.$message(message);
}
