<template>
  <div class="content">
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
        <el-form-item label="培训费" required prop="trainMoney">
          <el-input v-model="addForm.trainMoney" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    

   </div>
</template>

<script>
  //import {saveTrainPlan} from '../../api/train';
  import NProgress from 'nprogress';

  export default {
    components: {
      quillEditor
    }
    
    data() {
      return {
       
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
    },

    mounted() {
      
    }

  }
</script>