<template>
  <div>
    <div class="banner" :style="{'height':this.$store.state.bannerHeight+'px'}">
    </div>
  </div>

</template>
<script>
  export default {
    name:"Banner"
  }
</script>

<style scoped>
  .banner{
    width: 100%;
    background-image: url(../../assets/img/banner.png);
    background-size: 100% 100%;
    background-position: center;
  }
</style>
