<template>
  <div class="team-display">
    <TeamCard
      :isSelected="selection[team.id]"
      :toggleSelected="toggleSelected"
      :key="team.id"
      v-for="team in teams"
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
      console.log("selection:", this.selection);
    },
    initSelections() {
      // баг бүрийн сонгогдсон эсэх мэдээлэллийг init хийх
      this.teams.forEach((team) => {
        this.selection[team.id] = false;
      });
    },
  },
  watch: {
    teams: function () {
      this.initSelections();
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>
