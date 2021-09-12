<template>
  <div class="app">
    <Start v-if="!isStarted" :startMatch="startMatch"></Start>
    <Match v-else />
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
    };
  },
  components: {
    Start,
    Match,
  },
  methods: {
    async startMatch(gameData) {
      const res = await axios.post("/start", gameData);
      if (res.status === 200) this.isStarted = true;
      console.log(res.data); // TEMP
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
.primary-button {
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 1rem;
  padding: 0.4rem 2rem;
}
</style>