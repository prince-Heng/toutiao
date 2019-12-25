<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 表单组件 -->
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态：" >
        <!-- 单选组件 -->
        <!-- 双向绑定一个不为0-4的默认选项 -->
        <!-- <el-radio-group v-model="searchForm.status" @change="changeContent"> -->
        <el-radio-group v-model="searchForm.status">
          <!-- 注意label绑定的是数字类型，所以要加：，不加：为字符串 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：">
        <!-- 下拉组件 -->
        <!-- <el-select placeholder="请选择" v-model="searchForm.channel_id" @change="changeContent"> -->
        <el-select placeholder="请选择" v-model="searchForm.channel_id">
          <!-- label为是显示值   value为储存值 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <!-- 日期组件 -->
        <!-- <el-date-picker
        value-format="yyyy-MM-dd"
        @change="changeContent"
          v-model="searchForm.dataRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        > -->
         <el-date-picker
        value-format="yyyy-MM-dd"
          v-model="searchForm.dataRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <el-row class="articlesTitle" type="flex" align="middle">
      <span>共找到0条符合条件的内容</span>
    </el-row>
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
      <div class="left">
        <!-- 设置 默认图片与显示图片 -->
        <img :src="item.cover.images.length? item.cover.images[0]:defaultImg" alt />
        <div class="info">
          <span>{{item.title}}</span>
          <!-- 注意：过滤器两种设置方式：第一种为v-bind绑定过滤表达式  第二种为插值表达式内加入过滤 -->
          <el-tag class="tag" :type="item.status | articlesType">{{item.status | articlesStatus}}</el-tag>
          <span class="data">{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <i class="el-icon-edit alter">修改</i>
        <i class="el-icon-delete">删除</i>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认选项，不为0*4的数字
        channel_id: null, // 频道id，默认设置不选
        dataRange: [] // 日期。格式为数组
      },
      channels: [], // 接收频道数据
      list: [], // 定义数组，接收文章列表数据
      defaultImg: require('../../assets/img/22.jpg')// 将图片转化为base64
    }
  },
  methods: {
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 发送请求获取文章列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: params
      }).then(res => {
        // console.log(res)

        this.list = res.data.results
      })
    },
    // 多数据组合筛选:通过组件的值改变事件
    changeContent () {
      let params = {
        // 前端定义了标识5，如果是5，表示在查看全部，如果为空，，直接穿null

        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dataRange.length ? this.searchForm.dataRange[0] : null,
        end_pubdate: this.searchForm.dataRange.length > 1 ? this.searchForm.dataRange[1] : null
      }
      // 获取文章列表数据  将query数据（params）传入
      this.getArticles(params)
    }
  },
  watch: {
    // 监听的另一种模式
    searchForm: {
      // 设置属性deep  true为无限监听，监听searchForm的所有数据
      deep: true,
      // 第二个属性是一个方法  方法里的this指向组件实例。它存在数据永远是最新的 可以获取到最新的数据变化
      handler () {
        this.changeContent()// 直接条件改变值的方法  监听最新数据
      }
    }
  },
  filters: {
    // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
    // 过滤文章状态显示
    articlesStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    // 过滤文章显示内容
    articlesType (value) {
      switch (value) {
        case 0:
          return 'success'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  created () {
    // 实例加载完毕执行请求
    this.getChannels()
    this.getArticles()
  }
}

</script>

<style lang="less" scoped>
.articles {
  .articlesTitle {
    height: 60px;
    border-bottom: 1px dashed #999;
  }
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        height: 100px;
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        justify-content: space-between;
        .tag {
          width: 60px;
          text-align: center;
        }
        .data {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right {
      font-size: 12px;
      color: #666;
      .alter {
        margin-right: 10px;
      }
    }
  }
}
</style>
