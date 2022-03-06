/* eslint-disable vue/no-mutating-props */
<template>
  <div class="modal" id="myModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <img
            src="https://raw.githubusercontent.com/hunny123/memory-game-with-lb/master/leader%20board/images/i9.png"
            alt="no-img"
            class="img-fluid mx-auto"
          />
        </div>

        <div class="modal-body">
          <h4 class="blue-text">Congratulations!!! great work</h4>
          <p>
            You have taken moves <span>{{ moves }}</span>
          </p>
          <div class="d-flex">
            <Rating :deduceRating="deduceRating" :rating="rating" />

            <button
              v-if="!show"
              class="btn Submitt_score mx-4  btn-success"
              @click="showForm"
            >
              Submitt score
            </button>
          </div>
          <div v-if="show" id="username" class="mt-4 username">
            <form id="form" @submit.prevent="onSubmit">
              <label><strong> Player Name</strong> </label>
              <input
                v-model="username"
                class="mx-2"
                id="name"
                type="text"
                required
              />
              <input
                v-if="username"
                type="submit"
                class="btn btn-success mx-4"
              />
            </form>
          </div>

          <button class="btn float-right mt-3 restart btn-primary">
            Play Again
          </button>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn  btn-secondary" @click="onClose">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from "./Rating.vue";
export default {
  components: { Rating },
  props: {
    rating: Number,
    deduceRating: Number,
    moves: Number,

    onSubmit: Function,
    onClose: Function,
  },
  data() {
    return { show: false, username: "" };
  },
  methods: {
    showForm() {
      this.show = true;
    },
  },
};
</script>

<style scoped>
#myModal {
  display: block;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 1;
}
span {
  font-weight: bold;
}
</style>
