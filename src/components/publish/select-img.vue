<template>
   <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material" class='select-img-list'>
        <el-card v-for="item in list" :key="item.id" class="img-card">
          <!-- 给图片添加点击事件 将地址传过去 -->
            <img @click="clickImg(item.url)" :src="item.url" alt="">
        </el-card>
        <el-pagination
  background
  layout="prev, pager, next"
  :total="page.total"
  :page-size='page.pageSize'
  :current-page="page.currentPage"
  @current-change="changePage">
</el-pagination>

    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <el-upload class="uploadImg"  action="" :http-request="uploadImg" :show-file-list="false">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [], // 定义数组接收数据
      page: {
        currentPage: 1, // 默认请求页码
        pageSize: 8, // 每页多少条
        total: 0// 总页数
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)// 加入参数
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.$emit('selectImg', res.data.url)
      })
    },
    // 通过点击事件触发自定义事件传递数据(图片地址)---子传父
    clickImg (url) {
    // 1.通过this.$emit(‘自定义事件名’，若干参数  )   将图将地址传给封面
      this.$emit('selectImg', url)
    },
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results// 将接口返回数据赋值给定义的数组
        // console.log(this.list)
        this.page.total = res.data.total_count// 获取总页数
      })
    }
  },
  created () {
    this.getAllImg()// 实例完成后执行
  }
}
</script>

<style lang='less' scoped>
    .select-img-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .img-card{
            height: 150px;
            width: 150px;
            margin: 20px 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .uploadImg{
      display:flex;
      justify-content: center;
      i{
        font-size: 50px;
        padding: 50px;
        border: 1px dashed #cccccc;
        border-radius: 4px;
      }
    }
</style>
