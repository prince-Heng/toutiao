<template>
<div class="login">
    <el-card class="box-card">
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <el-form  style="margin-top:20px">
            <el-form-item>
                <el-input  placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input style="width:65%" placeholder="请输入验证码"></el-input>
                <el-button plain style="float:right">请输入验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-checkbox></el-checkbox>
                    我已阅读并同意
                    <el-button type="text">用户协议</el-button>
                    和
                    <el-button type="text">隐私条款</el-button>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%">点击登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.login{
    background-image: url('../../assets/img/timg (1).jpg');
    opacity: 0.7;
    height:100vh;
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .box-card{
        height: 350px;
        width: 440px;
        .title{
            text-align: center;
            img{
                height: 45px;
            }
        }
    }
}
</style>
