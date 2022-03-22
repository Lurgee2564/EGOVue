<template>
  <div id="login" >
    <div id="imageBox1">
      <el-image :src="require('@/assets/images/main.png')"></el-image>
    </div>

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm" style="text-align: center;">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item style="position:relative; left:10rem;top:2rem">
        <el-button type="primary" @click="login">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>

#login{
  position: absolute;
  top:20%;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 40%;
  text-align: center;
}

#imageBox1{
  position: relative;
  top:0;
  left: 2rem;
  right: 0;
  bottom: 0;
  size: A3;
  margin-bottom: 3rem;
}


</style>

<script>


import request from "@/utils/request";
import router from "@/router/router";
import jwtDecode from 'jwt-decode'
export default {
  name:"Login",
  
  data() {

    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      token:{

      },
      state:{

      },

      ruleForm: {
        pwd: '',
        account: ''
      },
      rules: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        account: [
          { validator: checkName, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login(){
    request.post("/login",this.ruleForm).then(
          res=>{

            if(res.state===500){
              alert("账号与密码错误！")
            }
           if(res.state===200){
              console.log(res.token)
              router.push('/home')
            }
          }
      )
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>