<template>
  <div v-if="!isLoading" class="match-wrapper">
    <div class="team West">
      <div class="abbr">{{ matchData.teams.West.abbr }}</div>
      <div class="full-name">
        {{ matchData.teams.West.city + matchData.teams.West.name }}
      </div>
      <div class="score">{{ matchData.teams.West.score }}</div>
      <button @click="addScore('West', 1)">1</button>
      <button @click="addScore('West', 2)">2</button>
      <button @click="addScore('West', 3)">3</button>
    </div>
    <Timer
      :timeUpFunction="chooseAndShowWinner"
      :initialTime="matchData.matchDuration"
    ></Timer>
    <div class="team East" :team="matchData.teams.East">
      <div class="abbr">{{ matchData.teams.West.abbr }}</div>
      <div class="full-name">
        {{ matchData.teams.West.city + matchData.teams.West.name }}
      </div>
      <div class="score">{{ matchData.teams.East.score }}</div>
      <button @click="addScore('East', 1)">1</button>
      <button @click="addScore('East', 2)">2</button>
      <button @click="addScore('East', 3)">3</button>
    </div>
  </div>
  <div v-else>loading</div>
</template>

<script>
import axios from "../axios";

import TeamCard from "../components/TeamCard.vue";
import Timer from "../components/Timer.vue";
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
        },
      },
      isLoading: true,
    };
  },
  components: {
    TeamCard,
    Timer,
  },
  props: {
    matchID: String,
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
        return "Tie";
      }
      if (eastScore > westScore) {
        return this.matchData.teams.East;
      }
      if (eastScore < westScore) {
        return this.matchData.teams.West;
      }
    },
    chooseAndShowWinner() {
      const winner = chooseWinner();
      if (winner === "tie") {
        // tie
      } else {
        // modal will pop up and delcare the winner
        // some firework or IDK
      }
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
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
.score {
  font-size: 4rem;
  font-weight: bold;
}
.abbr{
  font-size:3.5rem; 
}
.team {
  background-color:#fff;
  padding:1rem;
  border-radius:1rem;
  text-align: center;
}
button{
  background-color: var(--primary-color);
  color:white;
  border:0;
  border-radius:50%;
  width:3.125rem;
  height:3.125rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding:1rem;
  font-size:2rem;
  cursor: pointer;
}
</style>
