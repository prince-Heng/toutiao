<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">发布文章</template>
      </bread-crumb>
      <!-- 表单验证1.给form绑定数据对象和规则  用model和rules-->
      <!-- 2.给form-item  prop绑定数据字段名 -->
      <!-- 3.给表单的内容用v-model绑定数据对象的属性 -->
      <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label='100px'>
          <el-form-item label="标题" prop='title'>
              <el-input  v-model="formData.title" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop='content'>
              <el-input  v-model="formData.content" style="width:60%" type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="封面"  prop='cover'>
              <el-radio-group v-model="formData.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop='channel_id'>
              <el-select  v-model="formData.channel_id">
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <!-- 不传参为参数为undefined 为false -->
              <el-button @click="publishArticle()" type="primary">发表</el-button>
              <el-button @click="publishArticle(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      // 设置表单的数据对象，需要将其内容字段绑定给标签
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {// 封面信息
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []// 封面图片
        },
        channel_id: null// 文章所属频道id,默认不选中
      },
      //   表单验证规则
      publishRules: { title: [{ required: true, message: '请输入文章标题' },
        { min: 5, max: 30, message: '标题长度范围在5-30个字符之间' }],
      content: [{ required: true, message: '请输入文章内容' }],
      channel_id: [{ required: true, message: '请选择文章类型' }]
      }
    }
  },
  watch: {
    //   当两个地址对应同一个组建的时候，跳转时组件不销毁，但是不会重置   此时用watch监听
    $route: function (to, from) {
      if (to.params.articleId) {
        // 是修改
      } else {
        // 是发布
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 放置封面地址的数组
          },
          channel_id: null // 频道id
        }
      }
    }
  },
  methods: {
    //   获取所有的频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 点击发布或者存稿手动校验是否符合规则
    publishArticle (draft) {
      // 获取表单实例，验证规则方法  validate：function（isok）{}
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          let { articleId } = this.$route.params // 解构赋值获取动态路由参数
          //  如果成功了就调用接口
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'POST',
            params: { draft }, // 参数为true则为草稿，false为发布。通过传参来决定
            data: this.formData// 请求体参数
          }).then(res => {
            // 人性化提示
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 跳转页面
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 通过id查询文章数据
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.loading = false
        this.formData = result.data // 将数据赋值data
      })
    }
  },
  created () {
    this.getChannels()
    // 当修改文章的时候，直接获取数据
    let { articleId } = this.$route.params // 解构赋值
    // 当articleid存在的时候去修改
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>

</style>
