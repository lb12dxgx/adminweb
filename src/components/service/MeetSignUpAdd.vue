<template>
  <div class="content">
    <el-row>
      <el-col :span="16" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm">
            
                <el-form-item label="姓名" required prop="userName">
                 <el-input v-model="addForm.userName"  >
                  </el-input> 
                </el-form-item>
            
                <el-form-item label="手机" required prop="telphone">
                 <el-input v-model="addForm.telphone"  >
                  </el-input> 
                </el-form-item>
            
                  <el-form-item label="企业名称" required prop="empName">
                   <el-input v-model="addForm.empName"  >
                    </el-input> 
                  </el-form-item>
               
                 <el-form-item label="职务"  prop="post">
                     <el-input v-model="addForm.post"  >
                    </el-input> 
                  </el-form-item>
                
                <el-form-item label="邮件"  prop="email">
                  <el-input v-model="addForm.email"  >
                  </el-input> 
                 </el-form-item>
             
                <el-form-item label="住宿要求"  prop="singleRoom">
                  <el-select v-model="addForm.singleRoom" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                   </el-select>
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
 
  import {saveMeetSignUp} from '../../api/service';


  export default {
    
    data() {
      return {
        

        addFormRules: {
          
          
        },

        addForm: {
         
        },

        options:
        [
          {
            value: '单住',
            label: '单住'
          },{
            value: '合住',
            label: '合住'
          },{
            value: '不住',
            label: '不住'
          }
        ],
      }
        
    },

    methods: {
    //新增
      retBack() {
         this.$router.push({ path:'/main/system/meetsignup', query:{meetId:this.addForm.meetId}});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let para = Object.assign({}, this.addForm);
              console.log(para);
              saveMeetSignUp(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/meetsignup', query:{meetId:this.addForm.meetId}});
              
              });
            });
          }
        });
      },
    },

    mounted() {
       this.addForm.meetId=this.$route.query.meetId;
    }

  }
</script>




