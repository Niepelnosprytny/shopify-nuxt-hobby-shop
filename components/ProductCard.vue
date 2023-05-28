<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div>
    <NuxtLink :to="link">
      <div class="productCard">
        <img :src="image" :alt="`${title} image`"/>
        <section>
          <h5>{{ title }}</h5>
          <pre>{{ price }}</pre>
        </section>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
div {
  width: 25%;
  float: left;
  height: 65vh;
}

img {
  max-width: 90%;
  max-height: 45vh;
}

h5 {
  font-size: 2vh;
}

pre {
  font-size: 2.5vh;
}

.productCard {
  background-color: #232323;
  height: 97.5%;
  width: 97.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.productCard:hover {
  background-color: #666666;
}
</style>
