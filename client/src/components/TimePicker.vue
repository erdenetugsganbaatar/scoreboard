<template>
  <div
    @click="toggleEditMode"
    class="time-picker-wrapper"
    v-bind:class="{ 'edit-mode': isOnEditMode }"
  >
    <span v-if="canShowHour" class="hour">
      <span class="digit">{{ canshowHourTens ? hourTens : "" }}</span>
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
      <span class="digit cursor-on">{{ secondOnes }}</span>
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
      isOnEditMode: true,
      cursorIndex: 5, // digit-г хойноос нь тоолох index cursor хаана байх ёстойг заана
      editDigits: "",
    };
  },
  props: {},
  methods: {
    editModeEventListener: function (e) {
      // check if pressed key is number
      if (!isNaN(Number(e.key))) {
        this.editDigits += e.key;
        if (this.cursorIndex == 0) {
          this.cursorIndex = 5;
          return (this.isOnEditMode = false);
        }
        this.cursorIndex > 0 && this.cursorIndex--;
      }
    },
    toggleEditMode: function () {
      this.isOnEditMode = !this.isOnEditMode;
      this.cursorIndex = 5;
      if (this.isOnEditMode) {
        document.addEventListener("keyup", this.editModeEventListener);
        this.editDigits = "";
      } else {
        document.removeEventListener("keyup", this.editModeEventListener);
      }
    },
  },
  watch: {
    isOnEditMode: function () {
      const allDigits = this.$el.querySelectorAll(`.digit`);
      allDigits[this.cursorIndex].classList.add("cursor-on");
    },
    cursorIndex: function () {
      const allDigits = this.$el.querySelectorAll(`.digit`);
      allDigits.forEach((digit) => digit.classList.remove("cursor-on"));
      allDigits[this.cursorIndex].classList.add("cursor-on");
    },
    editDigits: function () {
      const editDigitsArray = this.editDigits.split("");
      // editDigits-с үүсгэсэн array 6-с бага урттай байвал урд талын утгуудыг 0-р дүүргэнэ
      while (editDigitsArray.length < 6) {
        editDigitsArray.unshift(0);
      }
      this.hour = Number(editDigitsArray.shift() + editDigitsArray.shift());
      this.minute = Number(editDigitsArray.shift() + editDigitsArray.shift());
      this.second = Number(editDigitsArray.shift() + editDigitsArray.shift());
    },
  },
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
      return this.isOnEditMode || this.hourTens !== 0 || this.hourOnes !== 0;
    },
    canShowMinute: function () {
      return (
        this.isOnEditMode ||
        this.canShowHour ||
        this.minuteTens !== 0 ||
        this.minuteOnes !== 0
      );
    },
    canshowHourTens: function () {
      return this.isOnEditMode || this.hourTens !== 0;
    },
    canShowMinuteTens: function () {
      return this.isOnEditMode || this.canShowHour || this.minuteTens !== 0;
    },
    canShowSecondTens: function () {
      return this.isOnEditMode || this.canShowMinute || this.secondTens !== 0;
    },
  },
};
</script>

<style>
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
.edit-mode * {
  color: rgb(190, 190, 190);
  font-weight: normal;
}
/* edit mode дээр өөр дээрээ cursor-той байгаа digit-н араас cursor гаргана */
/* cursor-on class-г өөр digit дээр нэмсэнээр cursor гаргаж ирнэ toggle хийнэ */
.edit-mode .digit.cursor-on::after {
  content: "|";
  animation: blink 1s infinite linear;
}

@keyframes blink {
  0% {
    visibility: visible;
  }
  25% {
    visibility: hidden;
  }
  75%{
    visibility: hidden;
  }
  100% {
    visibility: visible;
  }
}
</style>
