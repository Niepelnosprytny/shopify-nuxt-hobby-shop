<script setup lang="ts">

const props = defineProps({
  products: {
    type: undefined,
    required: true
  }
});
</script>

<template>
  <div>
    <ProductCard
        v-for="product in products"
        :key="product.node.id"
        :image="product.node.images.edges[0].node.src"
        :title="product.node.title"
        :price="`${parseFloat(product.node.priceRange.maxVariantPrice.amount).toFixed(2)} ${product.node.priceRange.maxVariantPrice.currencyCode}`"
        :link="`/products/${product.node.handle}`"
    />
  </div>
</template>
