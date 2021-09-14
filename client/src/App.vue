<template>
  <div class="app">
    <Start v-if="!isStarted" :startMatch="startMatch"></Start>
    <Match v-else :matchID="matchID" />
  </div>
</template>
<script>
import Start from "./views/Start.vue";
import Match from "./views/Match.vue";

import axios from "./axios";

export default {
  name: "App",
  data() {
    return {
      isStarted: false,
      matchID: null
    };
  },
  components: {
    Start,
    Match,
  },
  methods: {
    async startMatch(matchData) {
      try {
        const res = await axios.post("/match/start", matchData);
        if (res.status === 200) {
          this.isStarted = true;
          this.matchID = res.data.matchID;
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style >
:root {
  --primary-color: hsl(209, 91%, 22%);
  --secondary-color: hsl(168, 45%, 40%);
  --third-color: hsl(146, 64%, 61%);
  --foreground-color: hsl(143, 62%, 72%);
  --background-color: hsl(83, 51%, 92%);
}
body{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height:100vh;
}
.app{
  width:100%;
}
.primary-button {
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 1rem;
  padding: 0.4rem 2rem;
}
</style>