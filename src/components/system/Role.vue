<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="filters.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">查询</el-button>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180"> </el-table-column>
        <el-table-column prop="roleCode" label="角色编码" width="180"></el-table-column>
        <el-table-column prop="roleSummary" label="备注"> </el-table-column>
        <el-table-column label="操作" width="380">
          <template slot-scope="scope">
            <el-button size="small" @click="handleUser(scope.$index, scope.row)">设置人员</el-button>
            <el-button size="small" @click="handleMenu(scope.$index, scope.row)">设置权限</el-button>
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="5" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--新增界面-->
    <el-dialog title="新增角色" :visible.sync="addFormVisible">
       
      <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm">
        <el-form-item label="角色名称" required prop="roleName">
          <el-input v-model="addForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" required prop="roleCode" >
          <el-input v-model="addForm.roleCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注"  prop="roleSummary" >
          <el-input v-model="addForm.roleSummary" auto-complete="off"></el-input>
        </el-form-item>
       </el-form>  
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
      </div>
   
  </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
         <el-form-item label="角色名称" required prop="roleName">
          <el-input v-model="editForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" required prop="roleCode" >
          <el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注"  prop="roleSummary" > 
          <el-input v-model="editForm.roleSummary" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {roleList,deleteRole,saveRole,updateRole} from '../../api/api';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          roleName: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,

        addFormVisible: false,//新增界面是否显示
        addFormOrgVisible:false,//选择部门
        addLoading: false,
        addFormRules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          roleCode: [
            
            { required: true, message: '请输入角色编码', trigger: 'blur' }
          ]
        },
        addForm: {
          roleName: '',
          roleCode: '',
          roleSummary: ''
        },

        editFormVisible: false,//界面是否显示
        editLoading: false,
        editFormRules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          roleCode: [
            
            { required: true, message: '请输入角色编码', trigger: 'blur' }
          ]
        },
        editForm: {
          roleName: '',
          roleCode: '',
          roleSummary: '',
          roleId:''
        }

      }
    },

    methods: {
     
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },
      handleAdd(){
        this.addFormVisible = true;
      },

      handleEdit(index, row){
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },

       handleUser(index, row){
        this.$router.push({ path:'role/user', query:{roleId:row.roleId}});
      },

       handleMenu(index, row){
         this.$router.push({ path:'role/menu', query:{roleId:row.roleId}});
      },

      handleSubmit(){

      },


      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              NProgress.start();
              let para = Object.assign({}, this.addForm);
              console.log(para);
              saveRole(para).then((res) => {
                this.addLoading = false;
                NProgress.done();
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getList();
              });
            });
          }
        });
      },
    

      //编辑
      editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              NProgress.start();
              let para = Object.assign({}, this.editForm);
              updateRole(para).then((res) => {
                this.editLoading = false;
                NProgress.done();
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  duration:2500,
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getList();
              }).catch((err)=>{
                  this.editLoading = false;
                NProgress.done();
                    this.$alert('提交错误，请联系系统管理员!', '系统提示', {
                              confirmButtonText: '确定'
                      });
                });
            });
          }
        });
      },

      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {roleId: row.roleId };
          deleteRole(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '删除成功',
                duration:2500,
                type: 'success'
              });
             this.getList();
            }
            
          });
        });
      },

      getList() {
        var params = Object.assign({pageNum:this.pageNum}, this.filters);
        this.listLoading = true;
        NProgress.start();
        roleList(params).then(data => {
          this.listLoading = false;
          NProgress.done();
          this.list =data.retData.content;
          this.total=data.retData.totalElements;
        });
      }
    },

    mounted() {
      this.getList();
    }

  }
</script>