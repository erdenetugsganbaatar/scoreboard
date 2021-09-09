<template>
  <div>
    <Start v-if="!isStarted" :startMatch="startMatch"></Start>
    <Match v-else/>
  </div>
</template>
<script>
import Start from "./views/Start.vue";
import Match from "./views/Match.vue";

export default {
  name:"App",
  data(){
    return {
      isStarted: false
    }
  },
  components: {
    Start,
    Match
  },
  methods: {
    
  }
}
</script>
<style >
  
</style>