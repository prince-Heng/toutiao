<template>
<div class="login">
    <el-card class="box-card">
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 给整个表单绑定数据对象和规则对象  -->
        <el-form  ref="myForm" style="margin-top:20px" :model="loginForm" :rules="loginRules">
            <!-- 为表单域设置prop属性，绑定检验的字段名 -->
            <el-form-item prop="mobile">
                <!-- 数据双向绑定给input -->
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                 <!-- 数据双向绑定给input -->
                <el-input v-model="loginForm.code" style="width:65%" placeholder="请输入验证码"></el-input>
                <el-button plain style="float:right">获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="check">
                <!-- 数据双向绑定给复选框 -->
                <el-checkbox v-model="loginForm.check"></el-checkbox>
                    我已阅读并同意
                    <el-button type="text">用户协议</el-button>
                    和
                    <el-button type="text">隐私条款</el-button>
<!-- 无意义操作，验证GitHub -->
            </el-form-item>
            <el-form-item>
                <el-button @click="submitLogin" type="primary" style="width:100%">点击登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>

export default {
  data () {
    return {
      // 表单数据对象，存放表单的绑定数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false// 复选框
      },
      // 规则对象
      loginRules: {
        // 验证的规则对象：key（验证字段名）：value（验证规则是个数组[n个规则]）一项股则不满，则不往后看
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '格式错误' }],
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码输入错误' }],
        check: [{ validator: function (rule, value, callback) {
          // rule:规则  不适用
          // value：要校验的字段值  --check
          // callback：回调函数
          if (value) {
            //   直接写则表示勾选
            callback()
          } else {
            //   里面 传参：new Error("不勾选返回的值")
            callback(new Error('您还没选择我们的霸王条款呢亲！'))
          }
        } }]
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          // 规则格式全部正确，就发送请求
          this.$axios({
            url: '/authorizations', // 请求地址
            method: 'post', // 请求类型
            data: this.loginForm// body参数
          }).then(res => {
            // console.log(res)
            // 请求成功返回数据用token登陆，首先把token码缓存
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            // 请求不成功，根据elementUI设置警告
            this.$message({
              type: 'warning',
              message: '账号或者密码错误'
            })
          })
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.login{
    background-image: url('../../assets/img/timg (1).jpg');
    opacity: 0.7;
    height:100vh;
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .box-card{
        height: 350px;
        width: 440px;
        .title{
            text-align: center;
            img{
                height: 45px;
            }
        }
    }
}
</style>
