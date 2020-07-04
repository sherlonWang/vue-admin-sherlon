<template>
  <div class="breadcrumb">
    <p class="prefix">
      当前位置:&nbsp;
    </p>
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(bread,index) in breads"
                            :key="index"
                            :to="{ path: bread.path }"
                            :href="bread.href"
        >
          <a v-if="!bread.path" :href="bread.href">
            {{bread.label}}
          </a>
          <a v-else :href="bread.href">
            {{bread.label}}
          </a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Breadcrumb",
    props:['breads']
  }
</script>

<style scoped>
  .breadcrumb{
    /*width: 80%;*/
    margin: 15px 10px;
  }
  .prefix{
    display: inline-block;
    vertical-align:top;
    font-size: 14px;
    font-weight: bold;
    color: #050f85;
  }
  .bread{
    display: inline-block;
    vertical-align: center;
  }
</style>
