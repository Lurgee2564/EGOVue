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
        <el-button type="text" size="small" @click="handleClick">修改</el-button>
        <el-popconfirm @confirm="deleteAdmin(scope.row)" confirm-button-text="确认" cancel-button-text="取消" title="是否确认删除该信息？">
          <template #reference>
            <el-button type="danger" size="small" >删除</el-button>
          </template>
        </el-popconfirm>

      </template>
    </el-table-column>
  </el-table>

  <el-dialog draggable destroy-on-close v-model="dialogFormVisible" width="30%" title="添加管理员账号">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="70">
        <el-input v-model="form.name" autocomplete="off" style="width: 80%"/>
      </el-form-item>
      <el-form-item label="账号" :label-width="70" >
        <el-input v-model="form.account" autocomplete="off" style="width:  80%" />
      </el-form-item>
      <el-form-item label="密码" :label-width="70">
        <el-input v-model="form.pwd" autocomplete="off" style="width:  80%" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addAdmin">确认</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import request from "@/utils/request";

export default {
  name: "Main",
  data(){
    return{
      search:{},
      dialogFormVisible:false,
      form:{
        name:'',
        account:'',
        pwd:''
      },
      tableData:[
        {
          id:0,
          name:'root',
          account:'20220001'
        }
      ]
    }
  },
  created() {
    this.getAll()
  },
  methods:{
    getAll(){
    request.get("getAllAdmin").then(
        res=>{
         this.tableData=res
        }
    )

    },
    add(){
      this.dialogFormVisible=true
    },
    addAdmin(){
      this.dialogFormVisible=false
      request.post("/addAdmin",this.form).then(
          res=>{
            if(res=true){
              alert("添加成功！")
            }
            else
            {
              alert("添加失败！")
            }
          }
      )
    },
    deleteAdmin(id){
      request.post("/deleteAdmin",id).then(
          res=>{
            if (res=true){
              alert("删除成功！")
            }else{
              alert("删除失败！")
            }
            this.getAll()
          }
      )
    },
  }
}
</script>

<style scoped>

</style>