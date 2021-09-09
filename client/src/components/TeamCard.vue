<template>
  <div
    @click="clickHandler"
    v-bind:class="{ selected: isSelected }"
    class="team-card"
  >
    <div class="full-name">{{ team.full_name }}</div>
    <div class="abbr">{{ team.abbreviation }}</div>
  </div>
</template>

<script>
export default {
  name: "TeamCard",
  data() {
    return {
    };
  },
  props: {
    isSelected: Boolean,
    team: Object,
    toggleSelected: Function,
  },
  methods: {
    clickHandler() {
      this.toggleSelected(this.team.id);
    },
  },
};
</script>

<style>
.selected {
  background-color: green;
}
</style>
