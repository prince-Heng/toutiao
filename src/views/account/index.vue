<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
        <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form ref="myForm" :model="formData" :rules="rules" style="margin-left:50px" label-width="100px">
      <el-form-item prop="name" label='用户名'>
        <el-input v-model="formData.name" style='width:40%'></el-input>
      </el-form-item>
      <el-form-item prop="intro" label='简介'>
        <el-input v-model="formData.intro"  style='width:40%'></el-input>
      </el-form-item>
      <el-form-item prop="email" label='邮箱'>
        <el-input v-model="formData.email" style='width:40%'></el-input>
      </el-form-item>
      <el-form-item prop="mobile"  label='手机号'>
        <el-input  v-model="formData.mobile" disabled style='width:40%'></el-input>
      </el-form-item>
      <el-form-item >
        <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload :http-request="uploadImg" class="uploadImg" action="" :show-file-list="false">
       <img :src="formData.photo ? formData.photo : defaultImg" alt="">
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      loading: false,
      formData: {
        name: '', // 姓名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''// 手机号
      },
      defaultImg: require('../../assets/img/avatar.jpg'),
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1, max: 7, message: '用户名在1-7个字符之间'
        }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '邮箱格式不正确'
        }]

      }
    }
  },
  methods: {
    // 上传头像信息
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.loading = false
        this.formData.photo = res.data.photo
        // 保存成功后需要更新数据将更改的信息告诉头部显示页面
        eventBus.$emit('updateUserInfo')
      })
    },
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    },
    // 保存用户信息
    saveUserInfo () {
      this.$refs.myForm.validate().then(result => {
        //  调用保存接口
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(result => {
          this.$message({
            type: 'success',
            message: '保存用户信息成功'

          })
          // 保存成功后需要更新数据将更改的信息告诉头部显示页面
          eventBus.$emit('updateUserInfo')
        })
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
  .uploadImg{
    position: absolute;
    top: 200px;
    right: 300px;
    img{
      height: 200px;
      width: 200px;
      border-radius: 50%;
    }
  }
</style>
