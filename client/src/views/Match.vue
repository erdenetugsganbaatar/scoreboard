<template>
  <div v-if="showWinner">
    <Modal :heading="modalData.heading" :content="modalData.content">
      <button @click="goToHistory">Previous matches history</button>
      <button @click="goToStart">Start new match</button>
    </Modal>
  </div>
  <div v-else>
    <div v-if="!isLoading" class="match-wrapper">
      <div class="team West">
        <div class="abbr">{{ matchData.teams.West.abbr }}</div>
        <div class="full-name">
          {{ matchData.teams.West.city + matchData.teams.West.name }}
        </div>
        <div class="score">{{ matchData.teams.West.score }}</div>
        <button class="score-btn" @click="addScore('West', 1)">1</button>
        <button class="score-btn" @click="addScore('West', 2)">2</button>
        <button class="score-btn" @click="addScore('West', 3)">3</button>
      </div>
      <Timer :timeUpFunction="endMatch" :initialTime="initialTime"></Timer>
      <div class="team East" :team="matchData.teams.East">
        <div class="abbr">{{ matchData.teams.East.abbr }}</div>
        <div class="full-name">
          {{ matchData.teams.East.city + matchData.teams.East.name }}
        </div>
        <div class="score">{{ matchData.teams.East.score }}</div>
        <button class="score-btn" @click="addScore('East', 1)">1</button>
        <button class="score-btn" @click="addScore('East', 2)">2</button>
        <button class="score-btn" @click="addScore('East', 3)">3</button>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import axios from "../axios";

import TeamCard from "../components/TeamCard.vue";
import Timer from "../components/Timer.vue";
import Modal from "../components/Modal.vue";
export default {
  name: "Match",
  data() {
    return {
      matchData: {
        teams: {
          East: {
            score: 0,
          },
          West: {
            score: 0,
          },
          matchDuration: 0,
        },
      },
      isLoading: true,
      showWinner: false,
      modalData: {
        heading: "hehe",
        content: "hehehe",
      },
    };
  },
  components: {
    TeamCard,
    Timer,
    Modal,
  },
  props: {
    matchID: String,
    goToHistory: Function,
    goToStart: Function,
  },
  async mounted() {
    await this.getMatchData();
    await this.getTeamData();
    this.isLoading = false;
  },
  methods: {
    async getMatchData() {
      try {
        const res = await axios.get(`/match/${this.matchID}`);
        const east = await this.getTeamData(res.data.teams.East.id);
        const west = await this.getTeamData(res.data.teams.West.id);
        const newMatchData = {
          ...res.data,
        };
        newMatchData.teams.East = { ...newMatchData.teams.East, ...east };
        newMatchData.teams.West = { ...newMatchData.teams.West, ...west };
        this.matchData = newMatchData;
        localStorage.expirationDate =
          new Date().getTime() + res.data.matchDuration * 1000;
        localStorage.matchID = this.matchID;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async getTeamData(teamID) {
      const res = await axios.get(`/team/${teamID}`);
      return res.data;
    },
    async addScore(conference, score) {
      const res = await axios.post(`/match/addScoreToTeam`, {
        conference,
        matchID: this.matchID,
        score,
      });
      this.matchData.teams.West.score = res.data.teams.West.score;
      this.matchData.teams.East.score = res.data.teams.East.score;
    },
    chooseWinner() {
      const westScore = this.matchData.teams.West.score;
      const eastScore = this.matchData.teams.East.score;
      if (eastScore == westScore) {
        return {};
      }
      if (eastScore > westScore) {
        return { winner: "East", loser: "West" };
      }
      if (eastScore < westScore) {
        return { loser: "East", winner: "West" };
      }
    },
    chooseAndShowWinner() {
      const { winner = null, loser = null } = this.chooseWinner();
      const { teams } = this.matchData;
      if (winner && loser) {
        // modal will pop up and delcare the winner
        // some firework or IDK
        const scoreDifference = teams[winner].score - teams[loser].score;
        this.modalData = {
          heading: `${teams[winner].name} won!`,
          content: `<div style="float:left; width:50%;text-align:left;">${teams.West.name} : ${teams.West.score}</div> <div style="float:right;width:50%;text-align:right;">${teams.East.name} : ${teams.East.score}</div> <div style="clear:both;"></div>`,
        };
      } else {
        this.modalData = {
          heading: "TIE",
          content: `<div style="float:left; width:50%;text-align:left;">${teams.West.name} : ${teams.West.score}</div> <div style="float:right;width:50%;text-align:right;">${teams.East.name} : ${teams.East.score}</div> <div style="clear:both;"></div>`,
        };
      }
      this.showWinner = true;
    },
    endMatch() {
      localStorage.matchID = null;
      localStorage.expirationDate = null;
      this.chooseAndShowWinner();
    },
  },
  computed: {
    initialTime() {
      const now = new Date().getTime();
      const gap = now - this.matchData.startedAt;
      return this.matchData.matchDuration - Math.floor(gap / 1000) > 0
        ? this.matchData.matchDuration - Math.floor(gap / 1000)
        : 0;
    },
  },
};
</script>

<style scoped>
.match-wrapper {
  display: flex;
  width: fit-content;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.score {
  font-size: 4rem;
  font-weight: bold;
}
.abbr {
  font-size: 3.5rem;
}
.team {
  background-color: #fff;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
}
button {
  background-color: var(--primary-color);
  color: white;
  border: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 1rem;
}
button.score-btn {
  border-radius: 50%;
  width: 3.125rem;
  height: 3.125rem;
}
</style>
