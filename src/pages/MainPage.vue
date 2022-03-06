<template>
  <div class="bg-light">
    <div class="py-3 text-center bg-secondary text-white">
      <h1>Memory Game</h1>
    </div>
    <div class="container py-1 mt-2 my-2 text-center d-flex bg-light">
      <div class="w-50 text-center">
        <h4>Match:-{{ paired }} No of Click : {{ clickState }}</h4>
      </div>
      <Rating :rating="rating" :deduceRating="deduceRating" />
      <button class="btn btn-dark mx-3 mt-3" @click="restart">restart</button>
    </div>
    <div class="board container py-1">
      <div class=" cardBoard">
        <SingleCard
          v-for="(item, index) in imgId.slice(0, 4)"
          :key="index"
          :id="item"
          :cardClick="onCardClick"
          :visible="visibilty[item]"
        />
      </div>
      <div class=" cardBoard ">
        <SingleCard
          v-for="(item, index) in imgId.slice(4, 8)"
          :key="index"
          :id="item"
          :cardClick="onCardClick"
          :visible="visibilty[item]"
        />
      </div>
      <div class="cardBoard ">
        <SingleCard
          v-for="(item, index) in imgId.slice(8, 12)"
          :key="index"
          :id="item"
          :cardClick="onCardClick"
          :visible="visibilty[item]"
        />
      </div>
      <div class=" cardBoard ">
        <SingleCard
          v-for="(item, index) in imgId.slice(12, 16)"
          :key="index"
          :id="item"
          :cardClick="onCardClick"
          :visible="visibilty[item]"
        />
      </div>
    </div>
  </div>

  <Model
    v-if="model"
    :deduceRating="deduceRating"
    :rating="rating"
    :moves="clickState"
    :onClose="onClose"
    :onSubmit="onSubmit"
  />
</template>

<script>
import SingleCard from "../components/SingleCard";
import Rating from "../components/Rating.vue";
import Model from "../components/Model.vue";

function shuffleArray() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
const initialState = (imgId) => {
  return {
    imgId: imgId,
    visibilty: {},
    clickState: 0,
    previousId: 0,
    paired: 0,
    rating: 5,
    model: false,
    deduceRating: 0,
  };
};
export default {
  name: "MainPage",
  components: {
    SingleCard: SingleCard,
    Rating: Rating,
    Model: Model,
  },
  data() {
    return initialState([]);
  },
  methods: {
    restart() {
      const imgId = shuffleArray();
      Object.assign(this.$data, initialState(imgId));
    },
    onCardClick(id) {
      this.clickState++;
      this.visibilty[id] = true;
      let newId = id;
      const score = this.clickState / 20;
      if (score > 2) {
        // todo this logic
        this.rating = 5 - score;
        this.deduceRating = parseInt(score) - 1;
      }
      if (newId > 8) {
        newId = newId - 8;
      }

      if (this.clickState % 2 === 0) {
        if (!this.visibilty[newId] || !this.visibilty[newId + 8]) {
          const newPreviousId = this.previousId;
          setTimeout(() => {
            delete this.visibilty[id];
            delete this.visibilty[newPreviousId];
          }, 500);
        } else {
          this.paired++;
          if (this.paired === 8) {
            setTimeout(() => {
              this.model = true;
            }, 200);
          }
        }
        this.previousId = 0;
      } else {
        this.previousId = id;
      }
    },
    onSubmit(event) {
      const username = event.target[0].value;
      const score = this.rating - 1;
      fetch("https://memory-game-rest-backend.herokuapp.com/add-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, rating: score }), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then(() => {
          this.$router.push("/leader-board");
        });
      // parses JSON response into native JavaScript objects
    },
    // api submit logic

    onClose() {
      this.model = false;
    },
  },
  mounted() {
    this.imgId = shuffleArray();
  },
};
</script>

<style>
.cardBoard {
  background-color: transparent;

  align-items: center;
  display: flex;
  flex-wrap: nowrap;
}
.board {
  margin: auto;
}
@media screen and (min-width: 908px) {
  .board {
    width: 80%;
  }
}
</style>
