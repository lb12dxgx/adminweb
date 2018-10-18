<template>
  <div class="content">

    <el-row style="margin-top:30px">
      <el-col :span="18" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" >
            <el-row>
              <el-col :span="18">
                <el-form-item label="区县名称" required prop="districtName">
                 <el-input v-model="addForm.districtName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              
            </el-row>

             <el-row>
              <el-col :span="12">
                <el-form-item label="申请单位"  prop="applyCompany">
                 <el-input v-model="addForm.applyCompany" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                <el-form-item label="单位电话"  prop="enttelphone">
                 <el-input v-model="addForm.enttelphone" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人"  prop="person">
                 <el-input v-model="addForm.person" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                <el-form-item label="联系电话"  prop="telphone">
                 <el-input v-model="addForm.telphone" auto-complete="off"></el-input>
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
  
  import {saveCitydistrict} from '../../api/before';
  


  export default {
   
    
    data() {
      return {
        
      
        addFormRules: {
          districtName: [
            { required: true, message: '请输入区县名称', trigger: 'blur' }
          ]
          
        },
        addForm: {
          applyCityId:'',
          districtName:'',
          applyCompany: '',
          enttelphone:'',
          person:'',
          telphone:''
        
        }
      }
        
    },

    methods: {

     
     
       //新增
      retBack() {
        this.$router.push({
          path:'/main/system/citydistrict', 
          query:{applyCityId:row.applyCityId}
        });
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              console.log(para);
              saveCitydistrict(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
               this.$router.push({
                path:'/main/system/citydistrict', 
                query:{applyCityId:row.applyCityId}
               });
              
              });
            });
          }
        });
      },
    },

    mounted() {
      this.addForm.applyCityId=this.$route.query.applyCityId;
    }

  }
</script>

