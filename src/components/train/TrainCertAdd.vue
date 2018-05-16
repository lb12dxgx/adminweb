<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="证书类型" required prop="trainClassName">
                  <el-input v-model="addForm.trainClassName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              
            </el-row>
            
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" required prop="userName">
                 <el-input v-model="addForm.userName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                <el-form-item label="身份证号" required prop="userCode">
                 <el-input v-model="addForm.userCode" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
            
            <el-row>
              <el-col :span="12">
                <el-form-item label="证书编码" required prop="certCode">
                 <el-input v-model="addForm.certCode" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期" required prop="certCode">
                    <el-col :span="11">
                       <el-date-picker
                      v-model="addForm.startDate"
                      type="date"
                      placeholder="开始日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="getStartDate">
                      </el-date-picker>
                  </el-col>
                   <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-date-picker
                    v-model="addForm.endDate"
                    type="date"
                    placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="getEndDate">
                    </el-date-picker>
                  </el-col>
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
  

  import {saveTrainCert} from '../../api/train';

  export default {
   
    
    data() {
      return {
      
        addFormRules: {
          certTypeName: [
            { required: true, message: '请输入证书类型', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          userCode: [
            { required: true, message: '请输入证书编号', trigger: 'blur' }
          ],
          startDate:[
            { required: true, message: '请输入开始时间', trigger: 'blur' }
          ],
          endDate:[
            { required: true, message: '请输入结束时间', trigger: 'blur' }
          ],
          
        },
        addForm: {
          trainPlanId:'',
          certTypeName: '',
          userName:'',
          userCode:'',
          certCode:'',
          startDate:'',
          endDate:''
        
        },
         options:
        [
          {
            value: 'xmjl',
            label: '项目经理'
          },{
            value: 'jl',
            label: '项目监理'
          }
        ]
      }
        
    },

    methods: {


     getStartDate(date){
          this.addForm.startDate = date;
          console.log(this.trainStartDate);
      },

      getEndDate(date){
          this.addForm.endDate = date;
          console.log(this.trainStartDate);
      },

       //新增
      retBack() {
         this.$router.push({ path:'/main/system/traincert', query:{trainPlanId:this.trainPlanId}});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              console.log(para);
              saveTrainCert(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/traincert', query:{trainPlanId:this.addForm.trainPlanId}});
              
              });
            });
          }
        });
      },
    },

    mounted() {
      this.addForm.trainPlanId=this.$route.query.trainPlanId;
    }

  }
</script>

