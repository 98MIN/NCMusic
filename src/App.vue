<template>
  <div id="app">
    <v-header></v-header>
    <v-nav></v-nav>
    <router-view></router-view>
    <v-footer></v-footer>
    <v-totop></v-totop>
    <v-tips></v-tips>
    <v-audio></v-audio>
  </div>
</template>
<script>
import vHeader from "./components/header";
import vNav from "./components/nav";
import vFooter from "./components/footer";
import vHome from "./components/home";
import vTotop from "./components/vTotop";
import vTips from "./components/tips.vue";
import vAudio from "./components/audio.vue";
export default {
  name: 'App',
  components:{
    vHeader,
    vNav,
    vFooter,
    vHome,
    vTotop,
    vTips,
    vAudio
  },
  methods: {
   
  },mounted() {
            
        
  }
}
</script>

<style lang="scss">
  #app{
    background: #f2f2f2;
  }
   
  *{
    padding: 0;
    margin: 0;
  }
  .clearfix::after{
    content: '';
    display: block;
  }
  .clearfix{
    zoom: 1;
  }
  .active{
    color: #fff;
  }
</style>
