<template>
  <div
    @click="clickHandler"
    v-bind:class="{
      selected: isSelected,
      'seek-attention': isSeekingAttention,
    }"
    class="team-card animate__animated"
  >
    <div class="abbr">{{ team.abbr }}</div>
    <div class="full-name">{{ `${team.city} ${team.name}` }}</div>
  </div>
</template>
<script>
export default {
  name: "TeamCard",
  data() {
    return {};
  },
  props: {
    isSelected: Boolean,
    team: Object,
    toggleSelected: Function,
    index: Number,
  },
  methods: {
    clickHandler() {
      this.toggleSelected(this.team.id);
      // console.log(this.index)
      // index is 0 -> 15
      // 0 == 0th row 0th col == 0n + 0
      // 1 == 0th row 1st col == 0n + 1
      // n is number of columns
    },
  },
  computed: {
    isSeekingAttention: function () {
      return this.isSelected;
    },
  },
};
</script>

<style>
.team-card {
  box-shadow: 0px 0px 9px 2px #c8c8c838;
  min-width: fit-content;
  width: 100%;
  text-align: center;
  padding: 1rem;
  cursor: pointer;
  border-radius: 1rem;
  background-color: #fff;
}
.selected {
  /* сонгогдсон team */
  background-color: var(--primary-color);
  color:white;
}
.selected .full-name{
  color:var(--background-color);
}
.seek-attention {
  animation: zoom_out_zoom_in 0.2s 1 linear;
}

@keyframes zoom_out_zoom_in {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  14% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  70% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.full-name {
  color: #777777;
}
.abbr {
  font-size: 2rem;
  font-weight: bold;
}
</style>
