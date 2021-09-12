<template>
  <div class="start">
    <TeamDisplay
      conference="west"
      :setSelection="setSelection"
      :teams="westTeams"
    ></TeamDisplay>
    <div class="controllers">
      <TimePicker :setGameDuration="setGameDuration"></TimePicker>
      <button class="primary-button start-button" @click="onStartBtnClick">
        Start match
      </button>
    </div>
    <TeamDisplay
      conference="east"
      :setSelection="setSelection"
      :teams="eastTeams"
    ></TeamDisplay>
  </div>
</template>

<script>
import TeamDisplay from "~/src/components/TeamDisplay";
import TimePicker from "~/src/components/TimePicker";

import axios from "../axios";

export default {
  name: "Start",
  components: {
    TeamDisplay,
    TimePicker,
  },
  data() {
    return {
      eastTeams: [],
      westTeams: [],
      eastSelection: null,
      westSelection: null,
      gameDuration: 2880, // 48 minutes by default
    };
  },
  props: {
    startMatch: Function,
  },
  methods: {
    async fetchTeams() {
      const res = await axios.get("/teams");
      return res.data;
    },
    async fetchAndSplitTeams() {
      const data = await this.fetchTeams();
      this.eastTeams = data.filter((team) => team.conference === "East");
      this.westTeams = data.filter((team) => team.conference === "West");
    },
    setSelection(id, conference) {
      this[conference + "Selection"] = id;
    },
    setGameDuration(duration) {
      this.gameDuration = duration;
    },
    onStartBtnClick() {
      const gameData = {
        teams: {
          east: this.eastTeams.find((team) => team.id == this.eastSelection),
          west: this.westTeams.find((team) => team.id == this.westSelection),
        },
        time: this.gameDuration,
      };
      this.startMatch(gameData);
    },
  },
  mounted() {
    this.fetchAndSplitTeams();
  },
};
</script>

<style>
.start {
  display: flex;
  background-color: var(--third-color);
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
}
.start-button,
.time-input {
  font-size: 2rem;
}
.controllers {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  row-gap: 1rem;
  position: -webkit-sticky;
  position: sticky;
  top: 2rem;
  align-self: flex-start;
}
.start-button {
  cursor: pointer;
}
.start .team-display {
  flex: 1;
}
</style>
