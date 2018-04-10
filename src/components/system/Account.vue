<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="filters.userName" placeholder="用户名"></el-input>
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
        <el-table-column prop="accountName" label="账号" width="180"> </el-table-column>
        <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="orgName" label="部门"> </el-table-column>
        <el-table-column prop="state" label="状态" :formatter='formatState'></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button type="danger" size="small" @click="handleRest(scope.$index, scope.row)">密码重置</el-button>
          </template>
      </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="5" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--新增界面-->
    <el-dialog title="新增账号" :visible.sync="addFormVisible">
       
      <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm">
        <el-form-item label="账号" required prop="accountName">
          <el-input v-model="addForm.accountName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" required prop="userName" >
          <el-input v-model="addForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="accountPassword">
          <el-input  type="password" v-model="addForm.accountPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门"  prop="orgName" >
          <el-input  v-model="addForm.orgName" auto-complete="off"></el-input>
          <el-button @click.native="addFormOrgVisible = true">选择部门</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
      </div>
      <el-dialog
          title="选择部门"
          :visible.sync="addFormOrgVisible"
          append-to-body>
            <el-tree
              :data="orgJson"
              node-key="orgId"
              ref="addOrgTree"
              highlight-current
              :default-checked-keys="[5]"
              :props="defaultProps"
              @node-click="nodeClick"
              >
            </el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormOrgVisible = false">取消</el-button>
            <el-button type="primary" @click="addFormOrgVisible = false">提交</el-button>
          </div>
      </el-dialog>

    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="账号" required prop="accountName">
          <el-input v-model="editForm.accountName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" required prop="userName" >
          <el-input v-model="editForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="部门"  prop="orgName" >
          <el-input  v-model="editForm.orgName" auto-complete="off"></el-input>

        </el-form-item>
        <el-form-item label="状态"  prop="state" >
          <el-select v-model="editForm.state" placeholder="请选择">
            <el-option
              v-for="item in stateList"
              :key="item.state"
              :label="item.stateName"
              :value="item.state">
            </el-option>
          </el-select>
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
  import {accountList,deleteAccount,saveAccount,updateAccount,getOrgTree,resetAccount} from '../../api/api';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          userName: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,

        orgJson:[],
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },

        addFormVisible: false,//新增界面是否显示
        addFormOrgVisible:false,//选择部门
        addLoading: false,
        addFormRules: {
          accountName: [
            { required: true, message: '请输入单位名称', trigger: 'blur' }
          ],
          accountPassword: [
            
            { required: true, message: '请输入单位编码', trigger: 'blur' }
          ]
        },
        addForm: {
          accountName: '',
          accountPassword: '',
          userName: '',
          orgName:'',
          orgId:''
        },

        editFormVisible: false,//界面是否显示
        editLoading: false,
        editFormRules: {
          accountName: [
            { required: true, message: '请输入单位名称', trigger: 'blur' }
          ],
          passworld: [
            { required: true, message: '请输入单位编码', trigger: 'blur' }
          ]
        },
        editForm: {
          accountName: '',
          accountPassword: '',
          userName: '',
          orgName:''
        },
        stateList:[
          {state:0,stateName:'启用'},
          {state:1,stateName:'停用'}
        ]

      }
    },

    methods: {
      //性别显示转换
      formatState(row, column) {
          if(row.state == 0){
            return '启用';
          }else if(row.state ==1){
            return '停用';
          }
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getUserList();
      },
      handleAdd(){
        this.addFormVisible = true;
      },

      handleEdit(index, row){
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },

      handleSubmit(){
          this.getUserList();
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
              saveAccount(para).then((res) => {
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
                this.getUserList();
              });
            });
          }
        });
      },

      addTreeSubmit(){
            console.log(this.$refs.addOrgTree.getCheckedNodes());
      },

      

      nodeClick(node,nodeCheck){
        this.addForm.orgId=node.orgId;
        this.addForm.orgName=node.orgName;
      },

      //编辑
      editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              NProgress.start();
              let para = Object.assign({}, this.editForm);
              updateAccount(para).then((res) => {
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
                this.getUserList();
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
          let para = {accountId: row.accountId };
          deleteAccount(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '删除成功',
                duration:2500,
                type: 'success'
              });
             this.getUserList();
            }
            
          });
        });
      },



      //删除
      handleRest: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {accountId: row.accountId };
          resetAccount(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '删除成功',
                duration:2500,
                type: 'success'
              });
             this.getUserList();
            }
            
          });
        });
      },

      getUserList() {
          var params = Object.assign({pageNum:this.pageNum,accountType:10}, this.filters);
          this.listLoading = true;
          NProgress.start();
          accountList(params).then(data => {
            this.listLoading = false;
            NProgress.done();
    
            this.list =data.retData.content;
            this.total=data.retData.totalElements;
          });
      },
    },

    mounted() {
      this.getUserList();
      getOrgTree().then((res) => {
        console.log(res.retData);
        this.orgJson =JSON.parse(res.retData);
      });
    }

  }
</script>