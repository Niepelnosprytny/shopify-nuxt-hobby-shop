<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  available: {
    type: Boolean,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['button-clicked']);

const imageIndex = ref(0);

function changeImageIndex(index: number) {
  imageIndex.value = index;
}
</script>

<template>
  <section>
    <div class="imagesDiv">
      <img class="bigImage"
           :src="images.edges[imageIndex].node.src"
           :alt="`${title} image`"/>
      <div class="smallImagesDiv">
        <img v-for="image in images.edges"
             @click="changeImageIndex(images.edges.indexOf(image))"
             class="smallImage" :src="image.node.src"
             :alt="`${title} image`">
      </div>
    </div>
    <div class="detailsAndPrice">
      <h1>{{ title }}</h1>
      <button v-if="available" @click="emit('button-clicked')">
        {{ loading ? 'Redirecting' : `Buy for ${price}` }}
      </button>
      <button v-else class="sadgeButton" disabled>Out of stock</button>
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

h1 {
  font-weight: bold;
  font-size: 3vh;
  margin: 5vh 0;
}

button {
  width: 75%;
  height: 6vh;
  background-color: #FF4F00;
  border: none;
  color: #F4F4F4;
  font-size: 3vh;
  font-weight: bold;
  margin-bottom: 5vh;
}

button:hover {
  background-color: #FF7F00;
  cursor: pointer;
}

p {
  max-height: 110vh;
  margin-left: 3vh;
  width: 85%;
  font-size: 2vh;
  text-align: left;
  overflow: scroll;
}

.imagesDiv {
  width: 50%;
  height: 142.5vh;
  background-color: #343434;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.bigImage {
  max-width: 95%;
  max-height: 95%;
  text-align: center;
}

.smallImage {
  float: left;
  max-width: 23%;
  max-height: 21.5vh;
  margin: 1%;
  cursor: pointer;
}

.smallImagesDiv {
  margin-left: 1.5%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.detailsAndPrice {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.sadgeButton,
.sadgeButton:hover {
  background-color: #FF7777;
  cursor: not-allowed;
}
</style>
