<template>
  <div class="content">
   <div style="text-align:right;margin-bottom:5px">
       <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <div class="list">
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="trainName" label="培训名称" > </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
      </el-table>
    </div>
    

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible">
       
      <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm">
        <el-form-item label="培训名称" required prop="trainName">
          <el-input v-model="addForm.trainName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="培训地点" required prop="trainAddr">
          <el-input v-model="addForm.trainAddr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="培训开始时间" required prop="trainStartDate">
          <el-input v-model="addForm.trainStartDate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="培训结束时间" required prop="trainEndDate">
          <el-input v-model="addForm.trainEndDate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="培训人数" required prop="personNum">
          <el-input v-model="addForm.personNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="培训名称" required prop="trainName">
          <el-input v-model="addForm.trainName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

   </div>
</template>

<script>
  import {outKeyList,deleteOutKey,saveOutKey} from '../../api/column';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        filters: {
          userName: ''
        },
        listLoading:false,
        list: [],
        

        

        addFormVisible: false,//新增界面是否显示
        
        addLoading: false,
        addFormRules: {
          keyStr: [
            { required: true, message: '请输入关键词', trigger: 'blur' }
          ]
        },
        addForm: {
          keyStr: ''
        }
        }
    },

    methods: {
     
     
      handleAdd(){
        this.addFormVisible = true;
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
              saveOutKey(para).then((res) => {
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

      

      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {outkeyinfoId: row.outkeyinfoId };
          deleteOutKey(para).then((res) => {
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
          var params = Object.assign({pageNum:this.pageNum,accountType:10}, this.filters);
          this.listLoading = true;
          NProgress.start();
          outKeyList(params).then(data => {
            this.listLoading = false;
            NProgress.done();
            this.list =data.retData;
          });
      }
    },

    mounted() {
      this.getList();
    }

  }
</script>