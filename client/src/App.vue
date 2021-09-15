<template>
  <div class="app">
    <History v-if="showHistory" :closeHistory="closeHistory"></History>
    <Start
      v-if="!isStarted"
      :startMatch="startMatch"
      :goToHistory="goToHistory"
    ></Start>
    <Match
      v-else
      :matchID="matchID"
      :goToStart="goToStart"
      :goToHistory="goToHistory"
    />
  </div>
</template>
<script>
import Start from "./views/Start.vue";
import Match from "./views/Match.vue";
import History from "./views/History.vue";

import axios from "./axios";

export default {
  name: "App",
  data() {
    return {
      isStarted: false,
      matchID: null,
      showHistory: false,
    };
  },
  components: {
    Start,
    Match,
    History,
  },
  methods: {
    async startMatch(matchData) {
      try {
        const res = await axios.post("/match/start", matchData);
        if (res.status === 200) {
          this.matchID = res.data.matchID;
          this.isStarted = true;
        }
      } catch (e) {
        console.error(e);
      }
    },
    goToHistory() {
      this.showHistory = true;
    },
    goToStart() {
      this.isStarted = false;
    },
    closeHistory() {
      this.showHistory = false;
    }
  },
  mounted() {
    if (
      localStorage.expirationDate &&
      localStorage.expirationDate > new Date().getTime()
    ) {
      this.matchID = localStorage.matchID;
      this.isStarted = true;
    } else {
      localStorage.matchID = null;
      localStorage.expirationDate = null;
    }
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
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.app {
  width: 100%;
}
.primary-button {
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 1rem;
  padding: 0.4rem 2rem;
}

.secondary-button {
  color: var(--primary-color);
  background-color:transparent;
  border: none;
}
</style>