<template>

</template>

<script>
  export default {
    name: "Redirect",
    created() {
      console.log("redirect:",this.$route);
      const { params, query } = this.$route;
      const { path } = params;
      this.$router.replace({ path: '/' + path, query })
    },
    // beforeRouteEnter (to, from, next) {
    //   next(vm => {
    //     vm.$router.replace({
    //       path:from.fullPath
    //     })
    //   })
    // },
    render: function (h) {
      return h() // avoid warning message
    },
  }
</script>

<style scoped>

</style>
