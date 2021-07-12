<template>
  <div class="admin-login-box">
    <!--后台的登录入口，只有登录，没有注册，没有找回密码-->
    <!--只有门户一个用户入口，如果是管理员则跳转到管理中心，否则，跳转到首页/重定向的页面-->
    <!--如果是门户的登录，则有登录、注册、找回密码这些功能-->
    <!--显示内容-->
    <div class="admin-login-header-box">
      <div class="admin-login-header-center center">
        <div class="admin-login-logo">
          博客系统|登录
        </div>
      </div>
    </div>
    <!--中间内容-->
    <div class="admin-login-center-box">
      <div class="center login-center-box">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form label-position="right" label-width="100px" >
              <el-form-item label="账号" required>
                <el-input v-model="sobUser.username" placeholder="用户名/邮箱地址"></el-input>
              </el-form-item>
              <el-form-item label="密码" required>
                <el-input type="password" v-model="sobUser.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="人类验证码" required>
                <el-input v-model="loginInfo.verifyCode" placeholder="请输入右侧验证码" @keyup.enter.native="doLogin"></el-input>
                <img :src="captchaPath" @click="updateVerifyCode" class="captcha_code">
              </el-form-item>
              <el-form-item class="login-button">
                <el-button type="primary" @click="doLogin()" size="small">登录</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

      </div>
    </div>
    <!--底部内容-->
  </div>

</template>
<script>
  // const axios = require('axios');
  import {doLogin} from '../../api/api';
  export default {
    data(){
      return{
        sobUser:{
          username:'',
          password:'',
        },
        loginInfo:{
          verifyCode:'',
          from:'',
          captcha_key: '',
        },
        captchaPath:'',
      }
    },
    methods:{
      toastE(msg) {
        this.$message({
          message: msg,
          center: true,
          type: 'error'
        });
      },
      doLogin(){
        //发起登录

        //TODO:检查数据
        if (this.sobUser.username === ''){
          this.toastE('账号不可以为空。');
          return ;
        }
        if (this.sobUser.password === ''){
          this.toastE('密码不可以为空。');
          return ;
        }
        if (this.loginInfo.verifyCode === ''){
          this.toastE('人类验证码不正确。');
          return ;
        }
        //向服务器提交数据
        //处理结果
        console.log(this.loginInfo);
        console.log(this.sobUser);
        //TODO:
        doLogin(this.loginInfo.verifyCode,this.loginInfo.captcha_key,this.sobUser).then(result=>{
          console.log(result.data)
          //处理登陆结果
          //判断状态
          let data = result.data;

          if (data.code === 10000){
            this.$message({
              message:data.message,
              center:true,
              type:"success"
            });
            //如果是成功，跳转=》判断角色，普通用户（门户首页）-管理员（管理中心）
            //TODO:需要判断角色
            this.$router.push({path:'/index'})
          }else {
            //更新一下验证码
            this.updateVerifyCode();
            this.toastE(data.message)
          }

        });
      },
      updateVerifyCode(){
        this.captchaPath = '/captcha?captcha_key=' + this.loginInfo.captcha_key + "&random="+Date.parse(new Date());
        console.log(this.captchaPath)
      }
    },
    mounted() {
      //TODO:检查登录是否有效
      //如果已经登陆，跳转到对应的页面
      this.loginInfo.captcha_key = Date.parse(new Date());
      this.updateVerifyCode();
    }
  }
</script>
<style>
  .captcha_code{
    cursor: pointer;
    vertical-align: middle;
    margin-left: 10px;
    border: solid 1px #e6e6e6;
    padding-left: 10px;
    width: 120px;
    height: 42px;
  }
  .login-button{
    margin-bottom: 0;
  }
  .admin-login-header-box{
    width: 100%;
    height: 46px;
    margin-bottom: 20px;
    background: dodgerblue;
  }
  .center{
    margin: 0 auto;
    width: 1140px;
  }
  .admin-login-header-center{
    line-height:46px ;
  }
  .login-center-box .el-input{
    width: 200px;
  }
  .login-center-box{
    border-radius: 4px;
    width: 1140px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 1px 10px #afafaf;
  }
  .admin-login-logo{
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }
  .login-center-box .el-input__inner{
    border: solid 1px #e6e6e6;
    height: 42px;
    border-radius: 0;
  }
  .login-center-box .el-form-item__label{
    background: #fbfbfb;
    border-left:solid 1px #e6e6e6;
    border-top:solid 1px #e6e6e6;
    border-bottom:solid 1px #e6e6e6;
    text-align: center;
  }
</style>