<template>
  <div class="start">
    <TeamDisplay :teams="westTeams"></TeamDisplay>
    <div class="controllers">
      <button @click="startMatch">Start match</button>
    </div>
    <TeamDisplay :teams="eastTeams"></TeamDisplay>
  </div>
</template>

<script>
import TeamDisplay from '~/src/components/TeamDisplay'
export default {
  name: 'Start',
  components: {
    TeamDisplay,
  },
  data() {
    return {
      eastTeams: [],
      westTeams: [],
    }
  },
  props: {
    startMatch: Function,
  },
  methods: {
    async fetchTeams() {
      const res = await fetch('https://www.balldontlie.io/api/v1/teams')
      const { data } = await res.json()
      return data
    },
    async fetchAndSplitTeams() {
      const data = await this.fetchTeams()
      this.eastTeams = data.filter((team) => team.conference === 'East')
      this.westTeams = data.filter((team) => team.conference === 'West')
    },
  },
  mounted() {
    this.fetchAndSplitTeams()
  },
}
</script>

<style scoped>
.start {
  display: flex;
}
.start > *{
  flex:1;
}
</style>
