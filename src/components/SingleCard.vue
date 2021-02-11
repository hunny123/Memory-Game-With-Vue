<template>
<div class="col-sm-3">
  <div class="card" presentation="role" v-on:click="cardClick(id)">
    <img
      v-bind:class="visible ? 'visibilityShow' : 'visibility'"
      v-bind:src="
        'https://raw.githubusercontent.com/hunny123/memory-game-with-lb/master/leader%20board/images/i' +
        (id > 8 ? id - 8 : id) +
        '.png'
      "
      alt=""
    />
  </div>  
</div>
</template>
<script>
export default {
  name: "SingleCard",
  props: {
    id: Number,
    cardClick: Function,
    visible: Boolean || undefined,
  },
};
</script>
<style scoped>
/* Style the counter cards */

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
 
  background-color: #f1f1f1;
}
.card img {
  width: 100px;
}
.visibility {
  visibility: hidden;
}
.visibilityShow {
  visibility: show;
}
</style>