<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <Create />
        <Edit />
      </div>
    </section>
  </div>
</template>

<script>
import Create from "@/components/Categories/Create";
import Edit from "@/components/Categories/Edit";
export default {
  name: "Categories",
  components: { Create, Edit }
};
</script>

<style scoped></style>
