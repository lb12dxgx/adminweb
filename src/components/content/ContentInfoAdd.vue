<template>
  <div class="content">
    <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
     <el-row>
        <el-tabs value="nrxx">
          <el-tab-pane label="内容信息" name="nrxx">
              <el-row>
                 <el-form-item label="标题" required prop="contentTitle">
                    <el-input v-model="form.contentTitle"></el-input>
                  </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="标签">
                    <el-input v-model="form.contentJson.tag" placeholder="用','分开"></el-input>
                  </el-form-item>
                </el-col> 
              </el-row>
              <el-row>
                <el-col :span="24" >
                  <el-form-item label="摘要">
                    <el-input type="textarea" v-model="form.contentJson.desc"></el-input>
                  </el-form-item>
                </el-col> 
              </el-row>
               <el-row>
                <el-col :span="24" >
                  <el-form-item label="链接">
                    <el-input  v-model="form.contentJson.url" placeholder="页面链接"></el-input>
                  </el-form-item>
                </el-col> 
              </el-row>
              <el-row>
                <el-col :span="12" >
                  <el-form-item label="发布人">
                    <el-input v-model="form.contentJson.creator" style="width:50%"></el-input>
                  </el-form-item>
                </el-col> 
                <el-col :span="12" >
                  <el-form-item label="发布时间">
                    <el-date-picker
                      v-model="form.contentJson.pdate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col> 
              </el-row>
              <el-row>
                <el-col :span="12" >
                  <el-form-item label="固定级别">
                    <el-select v-model="form.level" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    
                  </el-form-item>
                </el-col> 
                <el-col :span="6" >
                  <el-form-item label="固定时间">
                    <el-date-picker
                      v-model="form.contentJson.gddate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col> 
                </el-row>
              <el-row>
                <el-col :span="12" >
                  <el-form-item label="新闻来源">
                    <el-input v-model="form.contentJson.source"></el-input>
                  </el-form-item>
                </el-col> 
              </el-row>
              
          </el-tab-pane>
          <el-tab-pane label="正文内容" name="zero">
            <UE defaultMsg="" 
            :config="{initialFrameWidth:830,initialFrameHeight:300}" 
            id="ue1" 
            ref="ue"> 

            </UE>
          </el-tab-pane>
          <el-tab-pane label="标题图" name="first">
            <el-upload
              class="upload-demo"
              :action="uploadAction"
              :data="titleDate"
              :limit="1"
              :on-success="handleTitleSuccess"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :file-list="titlefileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          
          <el-tab-pane label="附件" name="fourth">
             <el-upload
              class="upload-demo"
              :action="uploadAction"
              :on-success="handleOtherSuccess"
              :data="otherDate"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple 
             
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </el-row>

      <el-row>
        <el-col :span="24" style="margin-top:20px;text-align:center">
          <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="addLoading">
                保存
              </el-button>
              <el-button @click="onCancle">取消</el-button>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>


import UE from '../ue/ue.vue';

import NProgress from 'nprogress';
import {deleteFileinfo,base} from '../../api/fileinfo';
import {saveContent} from '../../api/column';


const uuidv1 = require('uuid/v1');


export default {
    components: {
      UE
    },
    props: {
     columnId:String,
    },
    
    data() {
      
      return {
        uploadAction:base+"/file/upload.do",
        titleDate:
        {
          dirName:'content/title/',
          token:sessionStorage.getItem('accessToken'),
          bussinessId:""
        },
        otherDate:
        {
          dirName:'content/other',
          token:sessionStorage.getItem('accessToken'),
          bussinessId:""
        },
        titlefileList:[], 
        picfileList:[],
        contentfileList:[],
        fileList:[],
        addLoading:false,
        form: {
          contentTitle: '',
          content: '',
          level:'',
          contentJson:{},
          titleFileId:'',
          otherFileId:''
        },

         formRules: {
          contentTitle: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
        },
        editorcontent:"",
        options:
        [
          {
            value: 90,
            label: '级别一'
          },{
            value: 80,
            label: '级别二'
          },{
            value: 70,
            label: '级别三'
          }
        ],
      }
    },

    methods: {
      onSubmit() {
        //this.addLoading=true;
      
        this.form.content=this.$refs.ue.getUEContent();
        let para=Object.assign({columnId:this.columnId}, this.form);
        para.contentJson=JSON.stringify(this.form.contentJson);
        saveContent(para).then((data) => {
          this.$emit('contentAddEvent',{retData:data.retData});
        })
      },
      onCancle(){
        this.$emit('contentAddEvent',{retData:""});
      },

        handleTitleSuccess(res, file) {
          this.form.titleFileId=res.retData.bussinessId;
          this.titleDate.bussinessId=res.retData.bussinessId;
          file.id=res.retData.fileInfoId;
        },
       
        handleOtherSuccess(res, file) {
          this.form.otherFileId=res.retData.bussinessId;
          this.otherDate.bussinessId=res.retData.bussinessId;
          file.id=res.retData.fileInfoId;
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
      
      handlePreview(){

      },

      handleRemove(file, fileList) {
        let para = {fileInfoId:file.id };
        deleteFileinfo(para).then(data => {
          fileList.splice(fileList.indexOf(file), 1);
        })
        
      },

      beforeRemove(file, fileList) {
        return this.$confirm(`确定删除 ${ file.name }？`);
      }

     

    },

     mounted() {
      let r=uuidv1();
     this.form.titleFileId=r+"titleFileId";
     this.titleDate.bussinessId=r+"titleFileId";
     this.form.otherFileId=r+"otherFileId";
     this.otherDate.bussinessId=r+"otherFileId";
    }
  }
   </script>

<style>
.quill-editor {
    height: 545px;
  }

.quill-editor .ql-container {
    height: 480px;
  }

</style>