<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" size="small">
            <el-form-item label="日程名称" required prop="meetPlanName">
              <el-input v-model="addForm.meetPlanName" auto-complete="off"></el-input>
            </el-form-item>

             <el-row>
              <el-col :span="12">
                <el-form-item label="教师名称"  prop="teacherName">
                  <el-input v-model="addForm.teacherName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="教师职称"  prop="startDate">
                  <el-input v-model="addForm.teacherPost" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="单位"  prop="teacherCompany">
                  <el-input v-model="addForm.teacherCompany" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开始时间"  prop="startDate">
                  <el-input v-model="addForm.startDate" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="视频地址"  prop="videoUrl">
                  <el-input v-model="addForm.videoUrl" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="视频图片"  prop="picUrl">
                 <el-input v-model="addForm.picUrl" auto-complete="off"></el-input>


                </el-form-item>
              </el-col>
              
            </el-row>
            
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
  

  import {updateMeetPlan,getMeetPlan} from '../../api/service';

  export default {
   
    
    data() {
      return {
        
        addFormRules: {
          meetPlanName: [
            { required: true, message: '请输入日程名称', trigger: 'blur' }
          ]
        },
         addForm: {
          meetPlanId:'',
          meetId:'',
          meetPlanName: '',
          teacherName:'',
          startDate:'',
          teacherCompany:'',
          teacherPost:'',
          videoUrl:'',
          picUrl:''
        }
      }
        
    },

    methods: {

      

     
       //新增
      retBack() {
         this.$router.push({ path:'/main/system/meetplan', query:{meetId:this.addForm.meetId}});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              console.log(para);
              updateMeetPlan(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/meetplan', query:{meetId:this.addForm.meetId}});
              
              });
            });
          }
        });
      },
    },

    mounted() {
      let meetPlanId=this.$route.query.meetPlanId;
      let para = {meetPlanId: meetPlanId};
      console.log(para); 
      getMeetPlan(para).then((data) => {
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