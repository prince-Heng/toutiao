<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 表单组件 -->
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态：">
        <!-- 单选组件 -->
        <!-- 双向绑定一个不为0-4的默认选项 -->
        <el-radio-group v-model="searchForm.status">
          <!-- 注意label绑定的是数字类型，所以要加：，不加：为字符串 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：" >
        <!-- 下拉组件 -->
        <el-select placeholder="请选择"  v-model="searchForm.channel_id" >
          <!-- label为是显示值   value为储存值 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <!-- 日期组件 -->
          <el-date-picker
          v-model="searchForm.dataRange"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认选项，不为0*4的数字
        channel_id: null, // 频道id，默认设置不选
        dataRange: []// 日期。格式为数组
      },
      channels: []// 接收频道数据
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
    }

  },
  created () {
    // 实例加载完毕执行请求
    this.getChannels()
  }
}
</script>

<style>
</style>
