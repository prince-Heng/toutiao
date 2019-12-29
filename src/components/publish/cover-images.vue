<template>
    <div class="cover-image">
        <!-- 父传子   3.  数据绑定---循环遍历 -->
        <!-- 再打开弹层时传入本身对应的下标  修改内容时使用 -->
        <div @click="dialogOpen(index)" v-for='(item,index) in list' :key="index" class="cover-images-item">
            <img :src="item?item:defaultImg" alt="">
        </div>
        <!-- 设置弹层 -->
        <el-dialog title="选择封面图片" @close="dialogClose" :visible="dialogVisible">
          <!-- 此处为slect组件容器   cover包裹select  产生父子关系 -->
          <!-- 2.子传父是=第二部，传给谁  在谁的身上添加自定义事件 -->
            <select-image @selectImg="receiveImg"></select-image>
        </el-dialog>
    </div>
</template>

<script>
export default {
  // 父传子  2.   用props接收数据
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      // 点击的封面图片对应的下标
      imgIndex: -1
    }
  },
  methods: {
    // 3.子传父第三步，接收数据
    receiveImg (url) {
      // 因为props的数据无法改变 只能读取，想要修改  只能前去修改来源值  props数据时从publish传来
      // 又有一次的子传父
      this.$emit('selectImg', url, this.imgIndex)
      // 数据传递完成后关毕弹层
      this.dialogClose()
    },
    dialogOpen (index) {
      // 在弹层打开的时候就把下标传入
      this.dialogVisible = true
      this.imgIndex = index
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
