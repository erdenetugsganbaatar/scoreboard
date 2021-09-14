<template>
  <div class="timer-wrapper">{{ hour }}:{{ minute }}:{{ second }}</div>
</template>

<script>
export default {
  name: "Timer",
  components: {},
  data() {
    return {
      time: 0,
    };
  },
  props: {
    initialTime: Number,
    timeUpFunction: Function,
  },
  methods: {
    decreaseTime() {
      if (this.time <= 0) {
        return this.timeUpFunction();
      }
      this.time--;
      setTimeout(this.decreaseTime, 1000);
    },
  },
  watch: {},
  mounted() {
    this.time = this.initialTime;
    setTimeout(this.decreaseTime, 1000);
  },
  computed: {
    hour: function () {
      const hourValue = Math.floor(this.time / 3600);
      return hourValue > 9 ? hourValue : "0" + hourValue;
    },
    minute: function () {
      const minuteValue = Math.floor((this.time - this.hour * 3600) / 60);
      return minuteValue > 9 ? minuteValue : "0" + minuteValue;
    },
    second: function () {
      const secondValue = this.time - this.hour * 3600 - this.minute * 60;
      return secondValue > 9 ? secondValue : "0" + secondValue;
    },
  },
};
</script>

<style>
.timer-wrapper {
  font-size: 3rem;
  padding: 2rem;
}
</style>
