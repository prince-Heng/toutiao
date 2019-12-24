<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">图片管理</template>
    </bread-crumb>
     <el-row type="flex" justify="end" >
        <el-upload action="" :http-request="uploatImg" :show-file-list="false">
          <el-button type="primary">上传按钮</el-button>
        </el-upload>
      </el-row>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane name="all" label="全部图片">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id" >
            <img :src="item.url" alt />
            <el-row class="operation" align="middle" type="flex" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane name="collect" label="收藏图片">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      list: [], // 接受素材数据
      page: {
        total: 0,
        pageSize: 8,
        currentPage: 1
      }
    }
  },
  methods: {
    uploatImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)// 见文件放入参数中
      this.$axios({

        url: '/user/images',
        method: 'POST',
        data
      }).then(res => {
        this.loading = false
        this.getComment()
      })
    },
    // 切换标签页事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial() // 当标签页改变，重新获取素材，因为collect是动态值也是通过标签页改变所改编的
    },
    // 切换导航栏的事件
    changeTab () {
      this.page.currentPage = 1 // 重置当前页码
      this.getMaterial() // 当标签页改变，重新获取素材，因为collect是动态值也是通过标签页改变所改编的
    },
    //   获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        this.list = res.data.results // 将图片数据赋值给list
        this.page.total = res.data.total_count
        // console.log(this.page.total)
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 190px;
    height: 220px;
    margin: 20px 45px;
    position: relative;
    font-size: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .operation {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 40px;
      background-color: #f4f5f6;
    }
  }
}
</style>
