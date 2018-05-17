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

            <el-form-item label="照片"  prop="certPicPath">
              <el-upload
                class="avatar-uploader"
                :action="uploadAction" 
                :data="otherDate"
                :show-file-list="false"
                :on-success="handleOtherSuccess"
                :before-upload="beforeAvatarUpload"
                :on-remove="handleRemove">
                <img v-if="addForm.certPicPath" :src="viewAction" 
                class="avatar" style="width:178;height:178px">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
  
  import {getTrainCert,updateTrainCert} from '../../api/train';
  import {deleteFileinfo,base} from '../../api/fileinfo';
  const uuidv1 = require('uuid/v1');

  export default {
   
    
    data() {
      return {
        uploadAction:base+"/file/uploadone.do",
        viewAction:"",
        otherDate:
        {
          dirName:'content/cert',
          token:sessionStorage.getItem('accessToken'),
          bussinessId:''
        },
      
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
          certPicPath:[
            { required: true, message: '请输入照片', trigger: 'blur' }
          ]
          
        },
        addForm: {
          trainPlanId:'',
          certTypeName: '',
          userName:'',
          userCode:'',
          certCode:'',
          startDate:'',
          endDate:'',
          certPicPath:''
        
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

      handleOtherSuccess(res, file) {
       
         this.viewAction=base+"/file/downloadByBusi.do?bussinessId="+res.retData.bussinessId+"&timestamp="+new Date().getTime();
       },

      beforeAvatarUpload(file) {
            console.log(file.type);
            const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
       },

       handleRemove(file, fileList) {
            console.log(file);
            this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {fileInfoId:file.id };
          deleteFileinfo(para).then(data => {

          })
        }).catch(() => {
          fileList.push(file);
          return false;
        }); 
      },


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
         this.$router.push({ path:'/main/system/traincert', query:{trainPlanId:this.addForm.trainPlanId}});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              console.log(para);
              updateTrainCert(para).then((res) => {
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
     let trainCertId=this.$route.query.trainCertId;
      let para = {trainCertId: trainCertId};
      console.log(para); 
      getTrainCert(para).then((data) => {
        this.addForm=data.retData;
        this.otherDate.bussinessId=data.retData.certPicPath;
        this.viewAction=base+"/file/downloadByBusi.do?bussinessId="+data.retData.certPicPath+"&timestamp="+new Date().getTime();
      })
    }

  }
</script>

