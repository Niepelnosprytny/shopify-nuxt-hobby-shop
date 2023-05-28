<script setup lang="ts">

const {data} = await fetch('.netlify/functions/products', {
  headers: {
    'variables': JSON.stringify({
      first: 20
    })
  }
}).then(
    (res) => res.json()
);
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
