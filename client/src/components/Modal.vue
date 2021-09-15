<template>
  <div class="modal">
      <div class="heading">{{heading}}</div>
      <div v-html="content" class="content"></div>
      <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {};
  },
  props: {
      heading: String,
      content: String,      
  },
  methods: {
    
  },
  computed: {
    
  },
};
</script>

<style>
    .modal{
        background-color:#fff;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        padding:3rem;
        border-radius:1rem;
        text-align: center;
    }
    .modal .heading{
        font-size:4rem;
        font-weight: bold;
        margin-bottom:2rem;
    }
    .modal .content{
        font-size:2rem;
        margin-bottom:2rem;
    }
</style>
