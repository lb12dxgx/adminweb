<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" size="small">
            <el-form-item label="课程名称" required prop="trainClassName">
              <el-input v-model="addForm.trainClassName" auto-complete="off"></el-input>
            </el-form-item>
            
            <el-row>
              <el-col :span="12">
                <el-form-item label="课时" required prop="num">
                 <el-input v-model.number="addForm.num" type="number" auto-complete="off" style="width:200px">
                    <template slot="append">小时</template>
                  </el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开始时间" required prop="startDate">
                   <el-date-picker
                    v-model="addForm.startDate"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="getStartDate">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="教师名称"  prop="teacherName">
                  <el-input v-model="addForm.teacherName"  style="width:200px">
                  </el-input> 
                </el-form-item>
              </el-col>
             
            </el-row>

            <el-form-item label="课程说明"  prop="classSumary">
               <quill-editor v-model="addForm.classSumary"
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

  import {updateTrainClass,getTrainClass} from '../../api/train';

  export default {
    components: {
      quillEditor
    },
    
    data() {
      return {
        editorOption: {
        },
        addFormRules: {
          trainClassName: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '请输入课时', trigger: 'blur' }
          ],
          startDate:[
            { required: true, message: '请输入开始时间', trigger: 'blur' }
          ],
            teacherName:[
            { required: true, message: '请输入教师姓名', trigger: 'blur' }
          ]
        },
        addForm: {
          trainClassId:'',
          trainPlanId:'',
          trainClassName: '',
          num:'',
          startDate:'',
          teacherName:'',
          classSumary:''
        }
      }
        
    },

    methods: {

      getStartDate(date){
          this.startDate = date;
          console.log(this.trainStartDate);
      },

     
       //新增
      retBack() {
         this.$router.push({ path:'/main/system/trainclass', query:{trainPlanId:this.addForm.trainPlanId}});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              console.log(para);
              updateTrainClass(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/trainclass', query:{trainPlanId:this.addForm.trainPlanId}});
              
              });
            });
          }
        });
      },
    },

    mounted() {
      let trainClassId=this.$route.query.trainClassId;
      let para = {trainClassId: trainClassId};
      console.log(para); 
      getTrainClass(para).then((data) => {
        this.addForm=data.retData;
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