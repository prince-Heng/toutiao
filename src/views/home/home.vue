<template>
   <el-carousel :interval="4000" type="card" height="500px" arrow="always">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: ['http://img2.imgtn.bdimg.com/it/u=1328429825,292192341&fm=26&gp=0.jpg',
        'http://n.sinaimg.cn/henan/crawl/20170216/T7eh-fyarrcf4171477.jpg',
        'http://p0.ssl.cdn.btime.com/t0129c3e1d55f3b20c3.jpg?size=640x960']
    }
  }
}
</script>

<style>

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
