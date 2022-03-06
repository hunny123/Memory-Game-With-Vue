<template>
  <div class="leader-board-wrap">
    <div class="container mx-auto ">
      <div className="bar">
        <p>Leader Board</p>
        <button class="btn btn-success">Play Game</button>
      </div>
      <div class="my-4">
        <div
          class="row text-white mx-auto"
          v-for="(item, index) in data"
          :key="index"
        >
          <div class="col">{{ index + 1 }}</div>
          <div class="col">{{ item.name }}</div>
          <div class="col">{{ item.rating }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LeaderBoard",
  data() {
    return { data: [] };
  },
  mounted() {
    fetch("https://memory-game-rest-backend.herokuapp.com/list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.data = data.data;
      });
  },
};
</script>
<style scoped>
.leader-board-wrap {
  width: 100%;
  min-height: 100vh;
  max-height: 100%;
  background-image: url("https://images.unsplash.com/photo-1512459871153-03c5ec0424fe?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218MHwyMjAzODc4fHx8fHx8fDE2NDU5NjU3Mjc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1300");
  background-size: cover;
}
.bar {
  width: 100%;
  height: 80px;
  padding: 10px;
  background-color: rgba(100, 100, 100, 0.5);
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 22px;
  font-weight: bold;
}
</style>
