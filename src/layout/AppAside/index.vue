<template>
  <div class="app-aside">
    <el-menu :default-active="routePath" class="el-menu-vertical-demo" router
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/member">
        <i class="el-icon-menu"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
    
    }
  },
  watch: {
    $route: {
      handler() {
        // console.log(this.$store.getters.userInfo);
        let info = localStorage.getItem('userInfo')
        console.log(info,'info');
        if (info ===null) {
          return this.$store.dispatch('DIS_SET_USERINFO')
        } else {
          return 
        }
      }
    }
  },
  computed: {
    routePath() {
      return this.$route.path
    }
  }
}
</script>

<style lang='scss' scoped>
.app-aside{
  height: 100%;
}
.el-menu{
  height: 100%;
  color: #fff;
}
</style>