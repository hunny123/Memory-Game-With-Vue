import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import MainPage from "./pages/MainPage";
import LeaderBoard from "./pages/LeaderBoard";
import App from "./App.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainPage,
  },
  {
    path: "/leader-board",
    name: "LeaderBoard",
    component: LeaderBoard,
  },
];
const router = createRouter({ history: createWebHistory(), routes });
createApp(App)
  .use(router)
  .mount("#app");
