<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="editForm" label-width="120px"  :rules="editFormRules" ref="editForm" size="small">
            <el-form-item label="培训名称" required prop="trainName">
              <el-input v-model="editForm.trainName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="培训地点" required prop="trainAddr">
              <el-input v-model="editForm.trainAddr" auto-complete="off"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="开始时间" required prop="trainStartDate">
                  <el-date-picker
                    v-model="editForm.trainStartDate"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="getStartTime">
                  </el-date-picker>
                  
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间" required prop="trainEndDate">
                   <el-date-picker
                    v-model="editForm.trainEndDate"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="getEndTime">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="培训人数"  prop="personNum">
                  <el-input v-model.number="editForm.personNum" type="number" style="width:200px">
                    <template slot="append">人数</template>
                  </el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="培训费"  prop="trainMoney">
                  <el-input  v-model.number="editForm.trainMoney" type="number" style="width:200px" >
                     <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="培训说明" required prop="trainSumary">
               <quill-editor v-model="editForm.trainSumary"
                    ref="myQuillEditor"
                    :options="editorOption"
                    
                    >
            </quill-editor>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
      <div style="text-align:center">
        <el-button  @click="retBack" >取消</el-button>
        <el-button type="primary" @click="addSubmit" >提交</el-button>
      </div>
    

   </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'

  import {updateTrainPlan,getTrainPlan} from '../../api/train';

  export default {
    components: {
      quillEditor
    },
    
    data() {
      return {
        editorOption: {
        },
       editFormRules: {
          trainName: [
            { required: true, message: '请输入计划名称', trigger: 'blur' }
          ],
          trainAddr: [
            { required: true, message: '请输入培训地址', trigger: 'blur' }
          ],
          trainStartDate:[
            { required: true, message: '请输入开始时间', trigger: 'blur' }
          ],
            trainEndDate:[
            { required: true, message: '请输入结束时间', trigger: 'blur' }
          ]
        },
        editForm: {
          trainPlanId:'',
          trainName: '',
          trainAddr:'',
          trainStartDate:'',
          trainEndDate:'',
          personNum:'',
          trainMoney:'',
          trainSumary:''
        }
      }
        
    },

    methods: {

      getStartTime(date){
          this.trainStartDate = date;
          console.log(this.trainStartDate);
      },

      getEndTime(date){
          this.trainEndDate = date;
           console.log(this.trainEndDate);
      },
       //新增
      retBack() {
        this.$router.push({ path:'/main/system/trainplan'});
      },

      //新增
      addSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.editForm);
              console.log(para);
              updateTrainPlan(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/trainplan'});
              });
            });
          }
        });
      },
    },

    mounted() {
      let trainPlanId=this.$route.query.trainPlanId;
      let para = {trainPlanId: trainPlanId};
      console.log(para);
      getTrainPlan(para).then((data) => {
        this.editForm=data.retData;
      })
    }

  }
</script>

<style>
/*编辑器样式修改*/
  .ql-container{
    min-height: 220px
  }
</style>