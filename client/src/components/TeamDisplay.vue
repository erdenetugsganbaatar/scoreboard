<template>
  <div class="team-display">
    <TeamCard
      :isSelected="team.id === selection"
      :toggleSelected="toggleSelected"
      :key="team.id"
      v-for="(team, index) in teams"
      :index="index"
      :team="team"
    ></TeamCard>
  </div>
</template>

<script>
import TeamCard from "~/src/components/TeamCard";

export default {
  name: "TeamDisplay",
  components: {
    TeamCard,
  },
  data() {
    return {
      selection: null, // сонгогдсон багийн id
    };
  },
  props: {
    teams: Array,
    setSelection: Function,
    conference: String,
  },
  methods: {
    // нэг багийг сонгож бусдыг нь цуцлана
    toggleSelected(id) {
      this.selection = id;
      this.setSelection(id,this.conference)
    },
    initSelections() {
      // хамгийн анх аль нэг багийг сонгоно
      this.selection = this.teams[0].id;
      this.setSelection(this.teams[0].id,this.conference)
    },
  },
  watch: {
    teams: function () {
      this.initSelections();
    },
  },
  mounted() {
    
  },
};
</script>

<style>
.team-display {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  justify-items: center;
  max-height:100vh;
  overflow-y: auto;
  gap: 1.5rem;
  padding-right:1rem;
}

</style>
