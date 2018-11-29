<template>
  <div>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class=" login-container">
      <h3 class="title">118系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
       <el-row>
        <el-col :offset="7">
          <el-button type="primary"   @click="onSubmit" :loading="logining">登录</el-button>
          <el-button type="primary"   @click="onReg" >注册</el-button>
        </el-col>
        </el-row>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template> 

<script>
  import {token} from '../api/api';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin1',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },

    methods: {
      handleReset() {
        this.$refs.ruleForm2.resetFields();
      },
       onReg() {
         this.$router.push({ path: '/customer/reg' });
       },
      onSubmit() {
          //this.$router.push({ path: '/main?add=1243' });
         console.log('error is submit!!');
         this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            NProgress.start();
            var loginParams = {accountName: this.ruleForm2.account, accountPassword: this.ruleForm2.checkPass};
            token(loginParams).then(data => {
              this.logining = false;
              NProgress.done();
              console.log(data);
              let {state,retData} = data;
              if (state == 0) {
                this.$notify({
                  title: '错误',
                  message: retData.loginStr,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('accessToken', retData.token);
                sessionStorage.setItem('userName', retData.userName);
                sessionStorage.setItem('orgName', retData.orgName);
                this.$router.push({ path: '/main?add=1243' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      }
    }
    
  }

</script>

<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-container .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
  .login-container  .remember {
      margin: 0px 0px 35px 0px;
    }
  
</style>