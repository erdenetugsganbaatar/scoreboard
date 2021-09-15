<template>
  <div v-if="isLoading"><div class="opacity"></div></div>
  <div v-else>
      <div class="opacity"></div>
    <div class="all-history">
      <div class="exit" @click="closeHistory">
        <svg
        width="2rem"
        height="2rem"
          viewBox="0 0 329.26933 329"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
          />
        </svg>
      </div>
      <h1 class="title">Match History</h1>
      <div v-if="goodData.length === 0">
        <div class="title one-history">No History</div>
      </div>
      <div
        v-else
        class="one-history"
        v-for="data in goodData"
        v-bind:key="data.startedAt"
      >
        <div class="winner">
          {{ data.winnerAbbr }}
        </div>
        <div class="started-at">
          {{ data.startedAt }}
        </div>
        <div class="score">{{ data.eastName }} : {{ data.eastScore }}</div>
        <div class="score">{{ data.westName }} : {{ data.westScore }}</div>
        <div class="ended-at">
          {{ data.endedAt }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "History",
  data() {
    return {
      history: [],
      isLoading: true,
    };
  },
  components: {},
  props: {
      closeHistory: Function
  },
  async mounted() {
    const res = await axios.get("/match/all");
    this.history = res.data;
    this.history.sort((v1, v2) => {
      if (v1.startedAt > v2.startedAt) {
        return -1;
      }
      if (v1.startedAt < v2.startedAt) {
        return 1;
      }
      return 0;
    });
    this.isLoading = false;
  },
  methods: {},
  computed: {
    goodData: function () {
      return this.history.map((el) => {
        const {
          startedAt,
          endedAt,
          matchDuration,
          teams: {
            East: { score: eastScore, name: eastName, abbr: eastAbbr },
            West: { score: westScore, name: westName, abbr: westAbbr },
          },
        } = el;
        const hourValue = Math.floor(matchDuration / 3600);
        const minuteValue = Math.floor((matchDuration - hourValue * 3600) / 60);
        const secondValue = matchDuration - hourValue * 3600 - minuteValue * 60;
        let winnerAbbr = "tied";
        winnerAbbr = eastScore > westScore ? eastAbbr : westAbbr;
        return {
          startedAt: new Date(startedAt).toLocaleString(),
          endedAt: new Date(endedAt).toLocaleString(),
          matchDuration: `${hourValue}цаг ${minuteValue}минут ${secondValue}секунд`,
          eastScore,
          westScore,
          eastAbbr,
          westAbbr,
          eastName,
          westName,
          winnerAbbr,
        };
      });
    },
  },
};
</script>

<style scoped>
.opacity{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    background: rgba(0,0,0,0.3);
}
.all-history {
  position: absolute;
  left:50%;
  z-index:1000;
  top:50%;
  transform: translate(-50%,-50%);
  width: fit-content;
  margin: auto;
  background: var(--foreground-color);
  padding: 2rem;
  border-radius: 1rem;
}
.exit {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}
.title {
  font-size: 4rem;
  text-align: center;
}
.one-history {
  background-color: #fff;
  margin: auto;
  padding: 1rem 3rem;
  border-radius: 1rem;
  width: fit-content;
}
.one-history:not(:last-child) {
  margin-bottom: 2rem;
}
.winner {
  font-size: 4rem;
}
.started-at,
.ended-at {
  font-size: 2rem;
}
.score {
  font-size: 2rem;
}
</style>
