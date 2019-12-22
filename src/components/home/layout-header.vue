<template>
   <el-row class="layout-header" type='flex' align="middle">
       <el-col :span="12" class="left">
           <i class="el-icon-s-fold"> <span>江苏传智播客教育科技股份有限公司</span></i>
       </el-col>
       <el-col :span="12" class="right">
           <el-row type="flex" justify="end" align="middle">
               <!-- 当请求的图片不存在时显示默认图片--图片类型为变量的方式/且只能用变量  三元表达式 -->
               <img :src="!userInfo.photo?userInfo.photo:defaultImg" alt="">
               <el-dropdown @command="goOut">
                   <!-- 匿名插槽 -->
                   <span class="el-dropdown-link">{{userInfo.name}}<i class="el-icon-caret-bottom"></i></span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="info">个人信息</el-dropdown-item>
                        <el-dropdown-item command="git">git地址</el-dropdown-item>
                        <el-dropdown-item command="goout">退出</el-dropdown-item>
                      </el-dropdown-menu>
               </el-dropdown>
           </el-row>
       </el-col>
   </el-row>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个对象接收参数
      userInfo: {},
      // 定义一个图片的变量
      defaultImg: require('../../assets/img/timg (2).jpg')
    }
  },
  methods: {
    goOut (command) {
      if (command === 'info') {} else if (command === 'git') {} else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    let token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      this.userInfo = res.data
    })
  }
}
</script>

<style lang="less" scoped>
    .layout-header{
        line-height: 60px;
        .left{
            font-size:20px;
            span{
                color: #2c3e50;
                font-size:15px;
                margin-left:5px;
            }
        }
        .right{
            img{
                height: 40px;
                width: 40px;
                border-radius: 50%;
                margin-right: 8px;
            }
        }

    }
</style>
