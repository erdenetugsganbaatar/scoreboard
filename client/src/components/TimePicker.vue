<template>
  <div class="time-picker-wrapper">
    <span v-if="canShowHour" class="hour">
      <span class="digit">{{ hourTens !== 0 ? hourTens : "" }}</span>
      <span class="digit">{{ hourOnes }}</span>
      <span class="sep">h</span>
    </span>
    <span v-if="canShowMinute" class="minute">
      <span class="digit">{{ canShowMinuteTens ? minuteTens : "" }}</span>
      <span class="digit">{{ minute % 10 }}</span>
      <span class="sep">m</span>
    </span>
    <span class="second">
      <span class="digit">{{ secondTens }}</span>
      <span class="digit">{{ secondOnes }}</span>
      <span class="sep">s</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "TimePicker",
  data() {
    return {
      hour: 5,
      minute: 0,
      second: 0,
    };
  },
  props: {},
  methods: {},
  computed: {
    hourOnes: function () {
      return this.hour % 10;
    },
    minuteOnes: function () {
      return this.minute % 10;
    },
    secondOnes: function () {
      return this.second % 10;
    },
    hourTens: function () {
      return Math.floor(this.hour / 10);
    },
    minuteTens: function () {
      return Math.floor(this.minute / 10);
    },
    secondTens: function () {
      return Math.floor(this.second / 10);
    },
    canShowHour: function () {
      return this.hourTens !== 0 || this.hourOnes !== 0;
    },
    canShowMinute: function () {
      return this.canShowHour || this.minuteTens !== 0 || this.minuteOnes !== 0;
    },
    canshowHourTens: function() {
      return this.hourTens !== 0;
    },
    canShowMinuteTens: function () {
      return this.canShowHour || this.minuteTens !== 0;
    },
    canShowSecondTens: function() {
      return this.canShowMinute || this.secondTens !== 0
    }
  },
};
</script>

<style scoped>
.digit {
  font-size: 3rem;
  font-weight: bold;
}
.sep {
  font-size: 1.5rem;
}
.time-picker-wrapper {
  cursor: pointer;
}
</style>
