<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {login} from '@/utils/api'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      query: {
        username: "admin",
        password: "admin"
      }
    }
  },
  created() {
    login(this.query).then(res => {
      console.log(res);
    })
    // this.$axios(
    //   {
    //     url: process.env.VUE_APP_BASE_API + '/login',
    //     method: "post",
    //   params:this.query
    //   }
    // ).then(res => {
    //   console.log(res);
    // })
  },
}
</script>
