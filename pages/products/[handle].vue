<script setup lang="ts">
const route = useRoute();
const { data: product } = await useAsyncData(
    `product-${route.params.handle}`,
    () => GqlProduct({ handle: route.params.handle as string })
);
const { data: related } = await useAsyncData(
    `product-related-${route.params.handle}`,
    () =>
        GqlProducts({
          first: 4,
          query: `product_type:${product.value.productByHandle.productType}`,
        })
);

const loading = ref(false)

const redirectToPayment = async () => {
  loading.value = true
  const { checkoutCreate: { checkout: { webUrl } } } = await GqlCheckout({ variantId: product.value.productByHandle.variants.edges[0].node.id })

  window.location.href = webUrl
}
</script>

<template>
  <div>
    <ProductDetail
        :title="product.productByHandle.title"
        :description="product.productByHandle.description"
        :price="`${parseFloat(product.productByHandle.priceRange.maxVariantPrice.amount).toFixed(2)} ${product.productByHandle.priceRange.maxVariantPrice.currencyCode}`"
        :images="product.productByHandle.images"
        :available="product.productByHandle.availableForSale"
        :loading="loading"
        @button-clicked="redirectToPayment"
    />
    <div class="h2Relative">
      <h2>You may also be interested in:</h2>
    </div>
    <ProductList :products="related.products.edges"/>
  </div>
</template>

<style scoped>
.h2Relative {
  width: 100%;
  float: left;
}
</style>
