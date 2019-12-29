<template>
  <el-card>
    <bread-crumb slot="header">
        <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form style="margin-left:50px" label-width="100px">
      <el-form-item label='用户名'>
        <el-input v-model="formData.name" style='width:40%'></el-input>
      </el-form-item>
      <el-form-item label='简介'>
        <el-input v-model="formData.intyo"  style='width:40%'></el-input>
      </el-form-item>
      <el-form-item label='邮箱'>
        <el-input v-model="formData.email" style='width:40%'></el-input>
      </el-form-item>
      <el-form-item  label='手机号'>
        <el-input  v-model="formData.mobile" disabled style='width:40%'></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload class="uploadImg" action="" show-file-list="false">
      <img :src="formData.photo?formData.photo:defaultImg" alt="">
    </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '', // 姓名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''// 手机号
      },
      defaultImg: require('../../assets/img/22.jpg')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
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
