<template>
  <div class="layout">
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-container>
        <el-aside width="230px">
          <app-aside></app-aside>
        </el-aside>
        <el-main>
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppAside from './AppAside'
import AppMain from './AppMain'
export default {
  name: 'layout',
  components: {
    AppHeader,
    AppAside,
    AppMain
    },
  data() {
    return {
    
    }
  },
}
</script>

<style lang='scss' scoped>
.layout{
    height: 100%;
  }
.el-container{
    height: 100%;
  }
.el-header{
   background-color: #2d3a4b;
   color: #fff;
   height: 50px !important;
   line-height: 50px;
   padding: 0;
 }

 .el-aside {
   background-color: #D3DCE6;
   height: 100%;
 }

 .el-main {
   height: 100%;
   padding: 10px;
 }
</style>