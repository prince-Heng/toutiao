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
          <el-card class="img-card" v-for="(item,index) in list" :key="item.id" >
            <img @click="openDialog(index)" :src="item.url" alt />
            <el-row class="operation" align="middle" type="flex" justify="space-around">
              <i @click="collectOrCancel(item)"  :style="{color:item.is_collected ? 'red' : '#000'}" class="el-icon-star-on"></i>
              <i @click="dleMaterial(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane name="collect" label="收藏图片">
        <div class="img-list">
          <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
            <img @click="openDialog(index)"  :src="item.url" alt />
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
     <el-dialog @opened="openEnd" :visible="dialogVisible" @close="dialogVisible = false">
       <el-carousel ref="myCarosel" indicator-position="outside" height="500px">
         <el-carousel-item v-for="(item,index) in list" :key="index">
           <img style="width:100%;height:100%" :src="item.url" alt="">
       </el-carousel-item>
      </el-carousel>
    </el-dialog>
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
      },
      dialogVisible: false,
      imgIndex: -1
    }
  },
  methods: {
    openEnd () {
      this.$refs.myCarosel.setActiveItem(this.imgIndex)
    },
    // 打开弹层
    openDialog (index) {
      this.dialogVisible = true
      this.imgIndex = index
    },
    // 删除
    dleMaterial (id) {
      this.$confirm('您确定要删除图片吗').then(res => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(res => {
          this.getMaterial()
        })
      })
    },
    // 收藏或取消
    collectOrCancel (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'PUT',
        data: { collect: !item.is_collected }// 收藏就取消，没收藏就收藏
      }).then(res => {
        this.getMaterial()
      })
    },
    // 上传文件
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
        this.getMaterial()
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
      i{
        cursor:pointer
      }
    }
  }
}
</style>
