<template>
    <div class="cover-image">
        <!-- 父传子   3.  数据绑定---循环遍历 -->
        <div @click="dialogOpen" v-for='(item,index) in list' :key="index" class="cover-images-item">
            <img :src="item?item:defaultImg" alt="">
        </div>
        <!-- 设置弹层 -->
        <el-dialog title="选择封面图片" @close="dialogClose" :visible="dialogVisible"></el-dialog>
    </div>
</template>

<script>
export default {
  // 父传子  2.   用props接收数据
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false
    }
  },
  methods: {
    dialogOpen () {
      this.dialogVisible = true
    },
    dialogClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image{
    margin:20px 60px;
    display: flex;
    .cover-images-item{
        height: 250px;
        width: 250px;
        padding: 20px;
        border: 1px solid #cccccc;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
