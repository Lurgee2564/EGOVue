<template>
  <div style="padding: 10px">
    <el-button type="primary" @click="add">新增</el-button>
    <el-button type="primary">导入</el-button>
    <el-button type="primary">导出</el-button>
    <el-input v-model:type="search" placeholder="请输入搜索内容" style="position: relative;left:2rem;width: 18%"></el-input>
    <el-button type="primary" @click="getAll" style="margin-left: 2rem;">查询</el-button>
  </div>
  <div style="margin: 10px">
  </div>
  <el-table :data="tableData"  style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" sortable/>
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="account" label="账号" />

    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click="handleEdit(scope.row)">修改</el-button>
        <el-popconfirm @confirm="deleteAdmin(scope.row)" confirm-button-text="确认" cancel-button-text="取消" title="是否确认删除该信息？">
          <template #reference>
            <el-button type="danger" size="small" >删除</el-button>
          </template>
        </el-popconfirm>

      </template>
    </el-table-column>
  </el-table>
<!--添加管理员对话框-->
  <el-dialog draggable destroy-on-close v-model="dialogFormVisible" width="30%" title="添加管理员账号">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px"  class="demo-ruleForm">
      <el-form-item label="用户名" prop="name" :label-width="70"  >
        <el-input  type="text" v-model="form.name" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account" :label-width="70" >
        <el-input  v-model="form.account" autocomplete="off" style="width:80%" />
      </el-form-item>
      <el-form-item label="密码" prop="passWord" :label-width="70" >
        <el-input  type="password" v-model="form.pwd" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" :label-width="70" >
        <el-input type="password" v-model="form.checkPass" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addAdmin">确认</el-button>
      </span>
    </template>
  </el-dialog>
<!--修改管理信息对话框-->
  <el-dialog draggable destroy-on-close v-model="dialogEditFormVisible" width="30%" title="修改管理员信息">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px"  class="demo-ruleForm">
      <el-form-item label="用户名" prop="name" :label-width="70"  >
        <el-input  type="text" v-model="form.name" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="原来的密码" prop="passWord" :label-width="70" >
        <el-input  type="password" v-model="usedPwd" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="新的密码" prop="passWord" :label-width="70" >
        <el-input  type="password" v-model="form.pwd" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" :label-width="70" >
        <el-input type="password" v-model="form.checkPass" autocomplete="off" style="width:80%"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editAdmin">确认</el-button>
      </span>
    </template>
  </el-dialog>
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
  name: "Main",
  components: {

  },
  data(){


    const checkAccount = (rule,value,callback) =>{
      if(!value){

        return callback(new Error('账号不能为空！'));
      }else {
       this.validates.account=true
      }
    };
    const checkName = (rule, value, callback) => {
      if (!value) {

        return callback(new Error('用户名不能为空！'));
      }else{
       this.validates.name=true
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
      } else if (value !== this.form.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
      this.validates.pwd=true;
        callback();
      }
    };

    return{

      validates:{
        account:false,
        name:false,
        pwd:false
      },
      currentPage:1,
      pageSize:10,
      total:0,
      search:{},
      inputDisable:false,
      dialogEditFormVisible:false,
      dialogFormVisible:false,
      usedPwd:'',
      id:'',
      form:{
        name:'',
        account:'',
        pwd:'',
      },
      rules: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        name:[
          { validator:checkName,trigger:'blur' }

        ]
      },

      tableData:[
        {

        }
      ]
    };
},
created() {
    this.getAll()
},
  methods:{
    getAll(){
    request.get("/getPage",
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
    add(){
      this.dialogFormVisible=true
    },
    addAdmin(){
    if(this.validates.name === true && this.validates.account === true && this.validates.pwd === true){
      this.dialogFormVisible=false
      request.post("/addAdmin",this.form).then(
          res=>{
            if(res === true){
              alert("添加成功！");
              this.getAll();
            }
            else
            {
              alert("添加失败！")
            }
          }
      )
    }else{
      alert("请输入正确的账号密码！")
    }

    },
    handleClose(){

    },
    deleteAdmin(id){
      request.post("/deleteAdmin",id).then(
          res=>{
            if (res===true){
              alert("删除成功！")
            }else{
              alert("删除失败！")
            }
            this.getAll()
          }
      )
    },
    handleSizeChange(pageSize){
    this.pageSize=pageSize
    this.getAll()
    },
    handleCurrentChange(pageNum){
    this.currentPage=pageNum
      this.getAll()
    },
    handleEdit(id){
      this.dialogEditFormVisible=true;
      this.id=id;

    },
    editAdmin(){
      if(this.validates.name === true && this.validates.pwd === true){
        this.dialogEditFormVisible=false;
        let id = this.id;
        id.pwd=this.usedPwd;
        request.post("/accountVf",id).then(
            res=>{
              if(res===true){
                this.form.account=id.account;
                request.post("/updateAdmin",this.form).then(
                    res=>{
                      if(res===true){
                        alert("修改成功！")
                          this.getAll()
                      }
                      else
                        alert("修改失败！")
                    }
                )
              }
              else{
                alert("旧密码不正确！")
              }
            }
        )
      }
    },
  }
}
</script>

<style scoped>

</style>