<template>
  <div class="login-page">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
        <h2 class="login-title">梦学谷会员管理系统</h2>
        <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitLoginForm('ruleForm')">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
 
export default {
  data() {
    return {
        ruleForm: {
            username: '',
            password:''
        },
        rules: {
            username: [
                { required: true, message: '账号不能为空', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '密码不能为空', trigger: 'blur' },
            ],
        }
    }
    },
    methods: {
        submitLoginForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) return
                this.getLogin()

            });
        },
      async getLogin() {
          const token = await this.$store.dispatch('DIS_SET_TOKEN', this.ruleForm)
          if (!token) return
          const userinfo = await this.$store.dispatch('DIS_SET_USERINFO')
          if (!userinfo) return
          this.$message.success('登录成功')
          this.$router.push('/')
        },
    //     async getAdmin() {
    //     try {
    //         const res = await admin()
    //         console.log(res, 'admin');
    //         localStorage.setItem('admin',res.name)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    },
  created() {

  },
}
</script>

<style lang='scss' scoped>
.login-page{
    width: 100vw;
    height: 100%;
    background-image: url('../assets/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    overflow:hidden;
   } 
   .el-form{
        width: 350px;
        margin: 160px auto;
        background-color: hsla(0, 0%, 100%, .8);
        padding: 28px;
        border-radius: 20px;
        .login-title{
            text-align: center;
            margin: 20px 0;
            font-size: 24px;
            font-weight: 700;
            font-family: "微软雅黑";
        }
        .el-input{
            width: 270px;
        }
        .el-input__inner{
            padding: 0 15px;
        }
        
   }

</style>