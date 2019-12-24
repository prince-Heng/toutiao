<template>
<!-- 外层容器 -->
 <el-container>
   <!-- 侧边栏容器 -->
   <el-aside style="background-color:#353b4e;min-height:100vh;width:230px">
     <!-- 侧边栏组件 -->
     <layout-aside></layout-aside>
   </el-aside>
   <!-- 右侧内容 -->
   <el-container>
     <!-- 右侧头部 -->
     <el-header>
       <!-- 头部组件 -->
       <layout-header></layout-header>
     </el-header>

      <!-- 右侧主体 -->
      <el-main>
        <!-- 二级容器 -->
        <router-view></router-view>
      </el-main>
   </el-container>
 </el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
