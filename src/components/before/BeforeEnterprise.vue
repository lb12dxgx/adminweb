<template>
  <div class="content">
    <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="机构名称">
          <el-input v-model="filters.orgName" placeholder="机构名称"></el-input>
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
        <el-table-column prop="orgCode" label="机构编码" width="180"> </el-table-column>
        <el-table-column prop="orgName" label="机构名称" width="180"></el-table-column>
        <el-table-column prop="city" label="管理城市"> </el-table-column>
        <el-table-column prop="telphone" label="机构电话" width="180"></el-table-column>
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
      <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="10" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--新增界面-->
    <el-dialog title="新增管理机构" :visible.sync="addFormVisible">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm">
         <el-form-item label="业务表单编码" required prop="formCode">
          <el-input v-model="addForm.formCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构编码" required prop="orgCode">
          <el-input v-model="addForm.orgCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构名称" required prop="orgName" >
          <el-input v-model="addForm.orgName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理城市" required prop="city">
          <el-input  v-model="addForm.city" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构电话"  prop="telphone" >
          <el-input  v-model="addForm.telphone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构地址"  prop="address" >
          <el-input  v-model="addForm.address" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item label="工作时间"  prop="workDate" >
          <el-input  v-model="addForm.workDate" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="顺序号"  prop="orderNum" >
          <el-input  v-model="addForm.orderNum" auto-complete="off"></el-input>
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
        <el-form-item label="业务表单编码" required prop="formCode">
          <el-input v-model="editForm.formCode" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item label="机构编码" required prop="orgCode">
          <el-input v-model="editForm.orgCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构名称" required prop="orgName" >
          <el-input v-model="editForm.orgName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理城市" required prop="city">
          <el-input   v-model="editForm.city" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构电话"  prop="telphone" >
          <el-input  v-model="editForm.telphone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构地址"  prop="address" >
          <el-input  v-model="editForm.address" auto-complete="off"></el-input>
        </el-form-item>
       
        <el-form-item label="工作时间"  prop="workDate" >
          <el-input  v-model="editForm.workDate" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="顺序号"  prop="orderNum" >
          <el-input  v-model="editForm.orderNum" auto-complete="off"></el-input>
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
  import {applyorgList,deleteApplyorg,saveApplyorg,updateApplyorg} from '../../api/before';
  import {resetAccount} from '../../api/api';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          orgName: ''
        },
        listLoading:false,
        list: [],
        total: 0,
        pageNum: 1,
        
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          orgName: [
            { required: true, message: '请输入单位名称', trigger: 'blur' }
          ]
        },
        addForm: {
          formCode: '',
          orgCode: '',
          orgName: '',
          city:'',
          telphone:'',
          address:'',
          contacts:'',
          contactsTel:'',
          workDate:'',
          feedback:'',
          orderNum:'',
        },

        editFormVisible: false,//界面是否显示
        editLoading: false,
        editFormRules: {
          orgName: [
            { required: true, message: '请输入单位名称', trigger: 'blur' }
          ]
        },
        editForm: {
          formCode: '',
          orgCode: '',
          orgName: '',
          city:'',
          telphone:'',
          address:'',
          contacts:'',
          contactsTel:'',
          workDate:'',
          feedback:'',
          orderNum:'',
        }

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
          this.getList();
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
              saveApplyorg(para).then((res) => {
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
              updateApplyorg(para).then((res) => {
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
          let para = {applyOrgId: row.applyOrgId };
          deleteApplyorg(para).then((res) => {
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

      //密码重置
      handleRest: function (index, row) {
        this.$confirm('确认重置密码吗?', '提示', {
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
                message: '重置成功',
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
          applyorgList(params).then(data => {
            this.listLoading = false;
            NProgress.done();
    
            this.list =data.retData.content;
            this.total=data.retData.totalElements;
          });
      },
    },

    mounted() {
      this.getList();
     
    }

  }
</script>