<template>
  <div class="team-display">
    <TeamCard
      :isSelected="selection[team.id]"
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
      selection: {}, // баг бүрийн сонгогдсон эсэх мэдээлэл
      lastSelectionIndex: null, //хамгийн сүүлд сонгогдсон багийн index
    };
  },
  props: {
    teams: Array,
  },
  methods: {
    // нэг багийг сонгож бусдыг нь цуцлана
    toggleSelected(id) {
      this.selection[this.lastSelectionIndex] = false;
      this.selection[id] = !this.selection[id];
      this.selection = Object.assign({}, this.selection, {});
      this.lastSelectionIndex = id;
    },
    initSelections() {
      // баг бүрийн сонгогдсон эсэх мэдээлэллийг init хийх
      this.teams.forEach((team) => {
        this.selection[team.id] = false;
      });
      // хамгийн анх аль нэг багийг сонгоно
      this.selection[this.teams[0].id] = true;
      this.lastSelectionIndex = this.teams[0].id;
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

<style scoped>
.team-display {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  justify-items: center;
  gap: 1.5rem;
}
</style>
