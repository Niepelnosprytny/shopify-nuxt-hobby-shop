<script setup lang="ts">
let {data} = await useAsyncData('products', () => GqlProducts({first: 20}));
</script>

<template>
  <div>
    <ProductList :products="data.products.edges"/>
  </div>
</template>

<style>
body {
  background-color: #060606;
  color: #F4F4F4;
  text-align: center;
}

a, NuxtLink {
  text-decoration: none;
  color: #F4F4F4;
}
</style>
