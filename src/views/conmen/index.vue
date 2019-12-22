<template>
   <!-- 卡片组件 -->
   <el-card>
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
                    <el-button size="small" type ="text">{{obj.row.comment_status ? "关闭" : "打开"}}评论</el-button>
                </template>
            </el-table-column>
        </el-table>
   </el-card>
</template>

<script>
export default {
// 想要获取评论数据，首先要定义一个属性去接收数据 属性定义在data中
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(res => {
        this.list = res.data.results
      })
    },
    formatterBoolean (row, column, cellValue, index) {
      // 参数的含义
      // row：当前行数据
    //   column：当前列信息
    // cellValue：当前单元格的值
    // index：索引
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
