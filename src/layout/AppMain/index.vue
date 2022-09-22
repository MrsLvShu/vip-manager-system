<template>
  <div>
    <el-card v-if="pathTitle.path">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{pathTitle.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    
    }
  },
  computed: {
    pathTitle() {
      return {
        title: this.$route.meta.title,
        path:!(this.$route.path==='/home')
      }
    },
  }
}
</script>

<style lang='scss' scoped>
  .el-card{
    margin-bottom: 20px;
  }
::v-deep .el-breadcrumb__inner{
border-left: 3px solid #31c17b;
padding-left: 10px;
color: #606266;
font-size: 14px;
}
</style>