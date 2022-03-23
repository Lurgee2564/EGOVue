<template>

  <div class="common-layout" style="height: 100%">
    <el-container class="el-container" direction="vertical">
      <el-header direction="horizontal" >

          <div style="width:100%;font-weight: bold;color: cornflowerblue;text-align: left">
            <el-image class="imageBox" style="width: 50px;height: 50px;margin: 0px;" :src="require('@/assets/images/main.png')"></el-image>
            EGO后台管理
            <el-tag class="ml-2" type="info" style="position: relative;bottom:17px;left: 67.8rem;">管理员：</el-tag>
            <el-dropdown trigger="click" style="position: relative;top: 20px;left: 68rem;">
            <span class="el-dropdown-link">
             Root
            <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item disabled>Action 4</el-dropdown-item>
                  <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

      </el-header>
      <el-container>
        <el-aside width="200px"  class="aside">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><avatar /></el-icon>管理员
                </template>

                  <el-menu-item index="1-1" @click="toAdmin">基本信息管理
                  </el-menu-item>
                  <el-menu-item index="1-2">Option 2</el-menu-item>


                  <el-menu-item index="1-3">Option 3</el-menu-item>

                <el-sub-menu index="1-4">
                  <template #title>Option4</template>
                  <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-sub-menu index="2" >
                <template #title>
                  <el-icon><user-filled /></el-icon>用户管理
                </template>


                <el-menu-item index="2-1" @click="toUser">基本信息管理</el-menu-item>
                  <el-menu-item index="2-2">Option 2</el-menu-item>


                  <el-menu-item index="2-3">Option 3</el-menu-item>

                <el-sub-menu index="2-4">
                  <template #title>Option 4</template>
                  <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><tickets /></el-icon> 订单管理
                </template>


                  <el-menu-item index="3-1">Option 1</el-menu-item>
                  <el-menu-item index="3-2">Option 2</el-menu-item>

                  <el-menu-item index="3-3">Option 3</el-menu-item>

                <el-sub-menu index="3-4">
                  <template #title>Option 4</template>
                  <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>


        </el-aside>
        <el-main class="main">
          <div>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>


import Main from "@/components/Main";
export default {
  name: 'home',
  components: {
    Main

  },
  methods:{
    toUser(){
      this.$router.push('/home/user')
    },
    toAdmin(){
      this.$router.push('/home/main')
    }
  }
}
</script>

<style>
  .header{
    width: 100%;

    border: 1px solid var(--el-border-color)
  }
  .main{
    height: 100%;
  }
  .aside{
    height: 100%;
    border: 1px solid var(--el-border-color)
  }
.el-container{
  height: 100%;
  border: 1px solid var(--el-border-color)
}
  .imageBox{
    margin: 0;
    padding:0;
    width: 50px;
    height: 50px;
    position: relative;
    left: 0;
    top: 0;

  }
  .layout-container-demo .el-header {
    position: relative;
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-aside {
    width: 240px;
    color: var(--el-text-color-primary);
    background: #fff !important;
    border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
  }
  .layout-container-demo .el-menu {
    border-right: none;
  }
  .layout-container-demo .el-main {
    padding: 0;
  }
  .layout-container-demo .toolbar {
    position: absolute;
    display: inline-flex;
    align-items: center;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
</style>