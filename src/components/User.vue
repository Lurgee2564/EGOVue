<template>
  <div style="padding: 10px">
    <el-button type="primary" @click="showDialog">增加</el-button>
    <el-button type="primary" @click="getPage">查询</el-button>
    <el-button type="primary" @click="enableSelect">多选操作</el-button>
  </div>
<!--数据表-->
  <el-table :data="tableData"  style="width: 100%">
    <el-table-column type="selection" ></el-table-column>
    <el-table-column prop="userID" label="ID" sortable/>
    <el-table-column prop="userName" label="姓名"  />
    <el-table-column prop="userAccount" label="账号" />
    <el-table-column prop="userIdentity" label="用户身份" :formatter="formatIdent"/>
    <el-table-column prop="userSex" label="性别" :formatter="formatSex"/>
    <el-table-column prop="userMail"  label="邮箱地址"  width="170" />
    <el-table-column prop="userBirthDay"  label="生日日期"  width="170" />
    <el-table-column prop="userIntroduction" label="个人信息" width="170"  />
    <el-table-column prop="userLocation" label="收货地址"  width="170"  />
    <el-table-column prop="userCreateTime" label="创建日期"  width="170" />
    <el-table-column prop="userUpdateTime" label="更新日期"  width="170" />

    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click="">修改</el-button>
        <el-popconfirm @confirm="deleteUser(scope.row)" confirm-button-text="确认" cancel-button-text="取消" title="是否确认删除该信息？">
          <template #reference>
            <el-button type="danger" size="small" >删除</el-button>
          </template>
        </el-popconfirm>

      </template>
    </el-table-column>
  </el-table>
  <!--添加用户对话框-->
  <el-dialog draggable destroy-on-close v-model="dialogFormVisible" width="30%" title="添加管理员账号">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px"  class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName" :label-width="70"  >
        <el-input prefix-icon="user"  type="text" v-model="form.userName" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="userAccount" :label-width="70" >
        <el-input prefix-icon="postcard"   v-model="form.userAccount" autocomplete="off" style="width:80%" />
      </el-form-item>
      <el-form-item label="电话号码" prop="userTelephone" :label-width="70" >
        <el-input prefix-icon="phone" maxlength="11" minlength="11" v-model="form.userTelephone" autocomplete="off" style="width:80%" />
      </el-form-item>
      <el-form-item label="您的性别" prop="userSex" :label-width="70" >
        <div>
          <el-radio v-model="form.userSex" label="0">男</el-radio>
          <el-radio v-model="form.userSex" label="1">女</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="userMail" :label-width="70" >
        <el-input prefix-icon="message" type="email" v-model="form.userMail" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="生日日期" prop="userBirthDay" :label-width="70" >
        <el-input prefix-icon="calendar" type="date" v-model="form.userBirthDay" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord" :label-width="70" >
        <el-input prefix-icon="key" type="password" v-model="form.pwd" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" :label-width="70" >
        <el-input type="password" v-model="form.checkPass" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!--分页工具-->
  <div class="demo-pagination-block" style="margin-top: 20px;">
    <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="true"
        :background="true"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"

        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "User",
components:{},

  data(){
    const checkAccount = (rule,value,callback) =>{
      if(!value){

        return callback(new Error('账号不能为空！'));
      }else {
        this.validates.userAccount=true
      }
    };
    const checkName = (rule, value, callback) => {
      if (!value) {

        return callback(new Error('用户名不能为空！'));
      }else{
        this.validates.userName=true
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {

          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.userPassWord) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        this.validates.userPassWord=true;
        callback();
      }
    };
    const checkTelephone=(rule,value,callback)=>{
      if(value===''){
        callback(new Error('电话号码不能为空！'));
      }else if(value.length!==11){
        callback(new Error('请输入正确的电话号码！'))
      }else{
        this.validates.userTelephone=true;
        callback();
      }

    };
    return{
      validates:{
        userAccount:false,
        userName:false,
        userPassWord:false
      },
      dialogFormVisible:false,
      columnType:'',
      currentPage:1,
      pageSize:10,
      total:0,
      form:{
        userName:'',
        userAccount:'',
        userTelephone:'',
        userPassWord:'',
        userSex:0,
        userMail:'',
        userBirthDay:'',
      },
      rules: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userAccount: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        userName:[
          { validator:checkName,trigger:'blur' }
        ],
        userTelephone: [
          {
            validator:checkTelephone,trigger:'blur'
          }
        ],
      },
      tableData:[{


      }]
    };

  },

created() {
  this.getPage()
},
  methods:{
    showDialog(){
      this.dialogFormVisible=true;
    },
    addUser(){

    },
    deleteUser(id){
      request.post("/deleteUser",id).then(
          res=>{
            if(res===true){
              alert("删除成功！")
            }else{
              alert("删除失败！")
            }

          }
      )
    },
    formatIdent(row){
      return row.userIdentity === 0? "用户" : row.userIdentity ===1? "商家":"";

    },
    formatSex(row){
      return row.userSex === 0?"男" : row.userSex ===1? "女":"";
    },
    getPage(){
      request.get("/getUserPage",
          {
        params:{
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }
      }).then(
          res=>{
            this.tableData=res.list
                this.total=res.total
          }
      )
    },
    handleSizeChange(pageSize){
      this.pageSize=pageSize
      this.getPage()
    },
    handleCurrentChange(pageNum){
    this.currentPage=pageNum
    this.getPage()
    },
    enableSelect(){

    },
  }


}
</script>

<style scoped>

</style>