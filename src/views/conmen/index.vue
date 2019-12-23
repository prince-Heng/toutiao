<template>
   <!-- 卡片组件 -->
   <el-card v-loading="loading">
       <!-- 面包屑 -->
       <bread-crumb slot="header">
       <!-- 插槽 -->
            <template slot="title">
                评论管理
            </template>
       </bread-crumb>
           <!-- el-table -->
    <!-- 表格 -->
        <el-table :data='list'>
        <!-- 放置列组件 -->
        <!-- prop设置字段名 来接收显示数据-->
            <el-table-column prop="title" width="600" label="标题"></el-table-column>
            <!-- el-table不支持布尔值   需要用到Table-column的属性formatter（用来格式化内容）类型为函数 -->
            <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
            <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
            <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
            <el-table-column label="操作">
                <!-- 通过作用于插槽获取当前行的数据判断显示关闭还是打开 -->
                <template slot-scope="obj">
                    <el-button size="small" type ="text">修改</el-button>
                    <el-button @click="openOrClose(obj.row)" size="small" type ="text">
                      {{obj.row.comment_status ? "关闭" : "打开"}}评论
                      </el-button>
                </template>
            </el-table-column>
        </el-table>
          <el-row type="flex" justify="center" align="middle" style="height:80px">
            <el-pagination
            :current-page='page.currentPage'
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changePage"
            background
            layout="prev, pager, next">
            </el-pagination>
          </el-row>
   </el-card>

</template>

<script>
export default {
// 想要获取评论数据，首先要定义一个属性去接收数据 属性定义在data中
  data () {
    return {
      list: [],
      page: {
        // 文章页数属性，分页用
        total: 0, // 总页数
        currentPage: 1, // 当前页默认设置为第一页
        pageSize: 10
      },
      loading: false // 加载样式默认不打开
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      // 发送请求前打开加载样式
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        // 在请求成功后关闭加载样式
        setTimeout(() => { this.loading = false }, 200)
      })
    },
    formatterBoolean (row, column, cellValue, index) {
      // 参数的含义
      // row：当前行数据
    //   column：当前列信息
    // cellValue：当前单元格的值
    // index：索引
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论吗`, '提示').then((res) => {
        this.$axios({
          url: '/comments/status',
          method: 'PUT', // 请求类型
          params: { article_id: row.id.toString() }, // 请求参数
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
