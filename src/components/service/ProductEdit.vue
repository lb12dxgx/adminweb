<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品名称" required prop="productName">
                 <el-input v-model="addForm.productName"  >
                  </el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品品牌" required prop="productBrand">
                 <el-input v-model="addForm.productBrand"  >
                  </el-input> 
                </el-form-item>
              </el-col>
             </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="产品价格" required prop="productPrice">
                   <el-input v-model="addForm.productPrice"  >
                    </el-input> 
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                 <el-form-item label="级别" required prop="level">
                      <el-select v-model="addForm.level" placeholder="请选择">
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
                <el-form-item label="联系人" required prop="person">
                  <el-input v-model="addForm.person"  >
                  </el-input> 
                 </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="联系电话" required prop="telphone">
                 <el-input v-model="addForm.telphone" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="顺序"  prop="orderNum">
                 <el-input v-model="addForm.orderNum" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>
        

             <el-form-item label="产品图片"  prop="productPicId"> 
               <el-upload
                :action="uploadAction" 
                :data="otherDate"
                list-type="picture"
                :on-success="handleOtherSuccess"
                :before-upload="beforeAvatarUpload"
                :on-exceed="handleExceed"
                :file-list="picfileList"
                :on-remove="handleRemove"
                :limit=3>
                 <el-button size="small" type="primary">点击上传</el-button>
                 <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB,最多上传3个文件</div>
              </el-upload>
            </el-form-item>

            <el-form-item label="产品介绍"  prop="productDesc">
               <UE defaultMsg="" 
                :config="{initialFrameWidth:830,initialFrameHeight:300}" 
                id="ue1" 
                ref="ue"> 

                </UE>
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
  import UE from '../ue/ue.vue';
  
  import {fileinfos,deleteFileinfo,base} from '../../api/fileinfo';
  import {getProduct,updateProduct} from '../../api/service';
  const uuidv1 = require('uuid/v1');

  export default {
    components: {
      UE
    },
    
    data() {
      return {
        picfileList:[],
        uploadAction:base+"/file/upload.do",
        viewAction:base+"/file/download.do?fileInfoId=",
        otherDate:
        {
          dirName:'content/product/logo',
          token:sessionStorage.getItem('accessToken'),
          bussinessId:''
        },
        editorOption: {
        
        },

        addFormRules: {
          enterpriseName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ],
          addree:[
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          telphone:[
            { required: true, message: '请输入电话', trigger: 'blur' }
          ],
          level:[
            { required: true, message: '请输入等级', trigger: 'blur' }
          ],
          orderNum:[
            { required: true, message: '请输入顺序', trigger: 'blur' }
          ],
          
        },

        addForm: {
          productId:'',
          productName:'',
          productPrice:'', 
          productBrand:'',
          person:'',
          telphone:'',
          level:'',
          orderNum:'',
          productDesc:'',
          productPicId:'',
          enterpriseId:''
        },

        options:
        [
          {
            value: 10,
            label: '一级'
          },{
            value: 20,
            label: '二级'
          },{
            value: 30,
            label: '三级'
          }
        ],
      }
        
    },

    methods: {

      handleOtherSuccess(res, file) {
          this.addForm.productPicId=res.retData.bussinessId;
          this.viewAction=this.viewAction+res.retData.fileInfoId;
          console.log(this.viewAction);
        },

      handleExceed(files, fileList){
        console.log("fileList0=="+fileList.length);
        if(fileList.length>=3){
          this.$message.error('上传文件个数不能大于3!');
        }
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
          this.addForm.publishDate = date;
          console.log(this.trainStartDate);
      },

      getEndDate(date){
           this.addForm.endDate = date;
          console.log(this.trainStartDate);
      },

     
       //新增
      retBack() {
         this.$router.push({ path:'/main/system/product', query:{enterpriseId:this.addForm.enterpriseId}});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addForm.productDesc=this.$refs.ue.getUEContent();
              let para = Object.assign({}, this.addForm);
              console.log(para);
              updateProduct(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/product', query:{enterpriseId:this.addForm.enterpriseId}});
              
              });
            });
          }
        });
      },
    },

    mounted() {
       this.addForm.productId=this.$route.query.productId;
       let para = {productId: this.addForm.productId};
       getProduct(para).then((data) => {
        this.addForm=data.retData;
        this.otherDate.bussinessId=this.addForm.productPicId;
        fileinfos({"bussinessId":this.addForm.productPicId}).then((data) => {
          let list=data.retData;
          list.forEach ((f,k) =>{
            var file={};
            file.id=f.fileInfoId
            file.name=f.fileName
             file.url=base+f.fileWebPath
            this.picfileList.push(file);
          })
      });
      this.$refs.ue.setUEContent(this.addForm.productDesc);
        
      })
    }

  }
</script>

<style>

</style>

<style>
  /*编辑器样式修改*/
  .ql-container{
    min-height: 220px
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
