<template>
  <div class="content">

    <el-row style="margin-top:30px">
      <el-col :span="18" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="网格名称" required prop="areaName">
                 <el-input v-model="addForm.areaName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网格说明"  prop="areaDesc">
                 <el-input type="textarea" v-model="addForm.areaDesc" auto-complete="off"></el-input>
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
  
  import {saveCityarea} from '../../api/before';
  


  export default {
   
    
    data() {
      return {
        
      
        addFormRules: {
          areaName: [
            { required: true, message: '请输入网格名称', trigger: 'blur' }
          ]
          
        },
        addForm: {
          cityDistrictId:'',
          areaName:''
        
        }
      }
        
    },

    methods: {

     
     
       //新增
      retBack() {
        this.$router.push({
          path:'/main/system/cityarea', 
          query:{cityDistrictId:this.addForm.cityDistrictId}
        });
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              saveCityarea(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
               this.$router.push({
                  path:'/main/system/cityarea', 
                  query:{cityDistrictId:this.addForm.cityDistrictId}
                });
              
              });
            });
          }
        });
      },
    },

    mounted() {
      this.addForm.cityDistrictId=this.$route.query.cityDistrictId;
    }

  }
</script>

