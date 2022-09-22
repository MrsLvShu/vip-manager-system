<template>
  <div>
    <router-link to="/" class="left">
      <img src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="logo">
      <span>积云会员管理系统</span>
    </router-link>
    <el-dropdown @command="handleCommand" trigger="click">
      <span class="el-dropdown-link">
        {{userInfo}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="changePass">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-fold" command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
    
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo.name
    }
  },
  methods: {
    handleCommand(command) {
        switch (command) {
          case "changePass":
            alert('修改密码')
            break;
          case "logout":
            this.handleLogout()
            break;
        }
    },
    async handleLogout() {
      try {
        const res = await this.$store.dispatch('getLogout')
        console.log(res, '退出');
        setTimeout(() => {
          this.$router.push('/login')
        }, 100)
        this.$message.success('退出登录')
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.left{
  display: inline-block;
  color: #fff;
  text-decoration: none;
  img{
    width: 25px;
    vertical-align: middle;
    padding: 0 10px 0 40px;
  }
 }
 .el-dropdown{
  float: right;
  margin-right: 40px;
  color: #fff;
 }
</style>