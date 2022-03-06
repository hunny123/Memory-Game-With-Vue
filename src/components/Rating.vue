<template>
  <div class="w-50  h5">
    <span v-if="!show"> Rating:</span>
    <span
      v-for="index in rating"
      :key="index"
      class="fa r1 fa-star checked"
    ></span>
    <span v-for="ind in deduceRating" :key="ind" class="fa r1 fa-star"></span>
  </div>
</template>

<script>
export default {
  props: {
    rating: Number,
    deduceRating: Number,
    show: Boolean,
  },
};
</script>

<style scoped>
.checked {
  color: orange;
}
</style>
