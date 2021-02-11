<template >
<div class="bg-light">
  <div class="p-3 text-center bg-secondary text-white">
    <h1>Memory Game</h1>
  </div>
    <div class="container py-1 mt-2 text-center bg-light">
      <h4>Match:-{{paired}} No of Click : {{clickState}}</h4>
    </div>
    <div class="container cardBoard w-50 py-3 ">
      <div class="row">
    
          <SingleCard
            v-for="(item, index) in imgId" :key="index"
            :id="item"
            :cardClick="onCardClick"
            :visible="visibilty[item]"
          />
        
      </div>
      <button class="btn btn-dark mt-3" @click="restart">restart</button>
    </div>
</div>
</template>

<script>
import SingleCard from "./components/SingleCard";
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
  };
};
export default {
  name: "App",
  components: {
    SingleCard: SingleCard,
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
            setTimeout(()=>{
              alert(`you have completed the game in ${this.clickState}`)
              this.restart()
              }
            ,200);
          }
        }
        this.previousId = 0;
      } else {
        this.previousId = id;
      }
    },
  },
  mounted() {
    this.imgId = shuffleArray();
  },
};
</script>

<style>
.cardBoard {
  /* width:500px !important; */
  margin:'auto';
}



</style>
