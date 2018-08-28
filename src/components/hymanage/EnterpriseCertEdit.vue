<template>
  <div class="content">

    <el-row style="margin-top:30px">
      <el-col :span="18" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" >

            <el-row>
              <el-col :span="12">
                <el-form-item label="证书类型" required prop="certTypeName">
                  <el-select v-model="addForm.certTypeName" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="企业名称" required prop="enterpriseName">
                 <el-input v-model="addForm.enterpriseName" auto-complete="off"></el-input>
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
                <el-form-item label="证书级别" required prop="level">
                 <el-input v-model="addForm.level" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="有效期" required prop="startDate">
                    <el-col :span="11">
                       <el-date-picker
                      v-model="addForm.startDate"
                      type="date"
                      placeholder="开始日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="getStartDate"
                      style="width:150px">
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
                    @change="getEndDate"
                    style="width:150px">
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
  import {getEnterpriseCert,updateEnterpriseCert} from '../../api/service';


  export default {
   
    
    data() {
      return {
        
      
        addFormRules: {
          
          certTypeName: [
            { required: true, message: '请输入证书类型', trigger: 'blur' }
          ],
          enterpriseName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ],
          level:[
            { required: true, message: '请输入证书级别', trigger: 'blur' }
          ],
          certCode: [
            { required: true, message: '请输入证书编号', trigger: 'blur' }
          ],
          startDate:[
            { required: true, message: '请输入开始时间', trigger: 'blur' }
          ],
          endDate:[
            { required: true, message: '请输入结束时间', trigger: 'blur' }
          ]
          
        },
        addForm: {
          enterpriseId:'',
          certTypeName: '',
          enterpriseName:'',
          certCode:'',
          startDate:'',
          endDate:'',
          level:''
        
        },
         options:
        [
          {
            value: 'kwxf',
            label: '非开挖修复作业'
          },{
            value: 'jcpg',
            label: '检测评估作业'
          }
        ]
      }
        
    },

    methods: {

     
     getStartDate(date){
          this.addForm.startDate = date;
         
      },

      getEndDate(date){
          this.addForm.endDate = date;
         
      },

       //新增
      retBack() {
         this.$router.push({ path:'/main/system/enterprisecert', query:{enterpriseId:this.enterpriseId}});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              console.log(para);
              updateEnterpriseCert(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/enterprisecert', query:{enterpriseId:this.addForm.enterpriseId}});
              
              });
            });
          }
        });
      },
    },

    mounted() {
      let enterpriseCertId=this.$route.query.enterpriseCertId;
      let para = {enterpriseCertId: enterpriseCertId};
      getEnterpriseCert(para).then((data) => {
        this.addForm=data.retData;
      })
    }

  }
</script>

