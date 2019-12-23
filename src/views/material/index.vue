<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">
                图片管理
            </template>
        </bread-crumb>
        <el-tabs v-model="activeName">
            <el-tab-pane name="all" label="全部"></el-tab-pane>
            <el-tab-pane name='collect' label="收藏"></el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>

export default {
  data () {
    return {
      activeName: 'all'
    }
  }
}
</script>

<style>

</style>
