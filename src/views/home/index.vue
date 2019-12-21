<template>
<!-- 外层容器 -->
 <el-container>
   <!-- 侧边栏容器 -->
   <el-aside style="background-color:#353b4e;height:100vh;width:230px">
     <layout-aside></layout-aside>
   </el-aside>
   <!-- 右侧内容 -->
   <el-container>
     <!-- 右侧头部 -->
      <el-header>我是头</el-header>
      <!-- 右侧主体 -->
      <el-main>我是身体</el-main>
   </el-container>
 </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
