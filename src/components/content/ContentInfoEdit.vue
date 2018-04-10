<template>
  <div class="content">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-tabs value="nrxx">
          <el-tab-pane label="内容信息" name="nrxx">
              <el-row>
                 <el-form-item label="标题">
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
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col> 
              </el-row>
              <el-row>
                <el-col :span="12" >
                  <el-form-item label="固定级别">
                    <el-select v-model="form.contentJson.level" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    
                  </el-form-item>
                </el-col> 
                <el-col :span="12" >
                  <el-form-item label="固定时间">
                    <el-date-picker
                      v-model="form.contentJson.gddate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col> 
              </el-row>
          </el-tab-pane>
          <el-tab-pane label="正文内容" name="zero">
            <UE :defaultMsg="form.content" 
            :config="{initialFrameWidth:830,initialFrameHeight:300}" 
            id="ue1" 
            ref="ue"
           > 
            </UE>
          </el-tab-pane>
          <el-tab-pane label="标题图" name="first">
            <el-upload
              class="upload-demo"
              :action="uploadAction"
              :on-preview="handlePreview"
              :before-remove="handleRemove"
              multiple
              :limit="3"
             
              :file-list="titlefileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          </el-tab-pane>
          <el-tab-pane label="内容图" name="second">
             <el-upload
              class="upload-demo"
              :action="uploadAction"
              :data="contentDate"
              :on-success="handleContentSuccess"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              multiple
          
              :file-list="contentfileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="图片集" name="third">
             <el-upload
              class="upload-demo"
              :action="uploadAction"
              :on-success="handlePicSuccess"
              :data="picDate"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              multiple
            
              :file-list="picfileList"
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
              <el-button>取消</el-button>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import UE from '../ue/ue.vue';

import NProgress from 'nprogress';
import {updateContent} from '../../api/column';
import {fileinfos,deleteFileinfo,base} from '../../api/fileinfo';

var titleFileId="";
var contentFileId="";
var picFileId="";
var otherFileId="";

export default {
    components: {
      UE
    },
    props: {
     form:Object,
    },
    
    data() {
      
      return {
        uploadAction:base+"/file/upload.do",
        titleDate:
        {
          dirName:'content/title/'+titleFileId,
          token:sessionStorage.getItem('accessToken'),
          bussinessId:titleFileId
        },
        contentDate:
        {
          dirName:'content/content'+contentFileId,
          token:sessionStorage.getItem('accessToken'),
          bussinessId:contentFileId
        },
        picDate:
        {
          dirName:'content/pic'+picFileId,
          token:sessionStorage.getItem('accessToken'),
          bussinessId:picFileId
        },
        otherDate:
        {
          dirName:'content/other'+otherFileId,
          token:sessionStorage.getItem('accessToken'),
          bussinessId:otherFileId
        },
        titlefileList: [], 
        picfileList:[],
        contentfileList:[],
        fileList: [],
        addLoading:false,
        editorcontent:"",
        options:
        [
          {
            value: '90',
            label: '级别一'
          },{
            value: '80',
            label: '级别二'
          },{
            value: '70',
            label: '级别三'
          }
        ],
      }
    },

    methods: {
      onSubmit() {
        //this.addLoading=true;
        
        this.form.content=this.$refs.ue.getUEContent();;
        let para=Object.assign(this.form);
        para.contentJson=JSON.stringify(this.form.contentJson);
        updateContent(para).then((data) => {
          this.$emit('contentUpdateEvent',{retData:data.retData});
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
        handleContentSuccess(res, file) {
          this.form.contentFileId=res.retData.bussinessId;
          this.contentDate.bussinessId=res.retData.bussinessId;
          file.id=res.retData.fileInfoId;
        },
        handlePicSuccess(res, file) {
          this.form.picFileId=res.retData.bussinessId;
          this.picDate.bussinessId=res.retData.bussinessId;
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


    },

     mounted() {
      this.editorcontent=this.form.content;
      titleFileId=this.form.titleFileId;
      contentFileId=this.form.contentFileId;
      picFileId=this.form.picFileId;
      otherFileId=this.form.otherFileId;

      console.log(this.form);
      fileinfos({"bussinessId":this.form.titleFileId}).then((data) => {
          let list=data.retData;
          console.log(list);
          list.forEach ((f,k) =>{
            var file={};
            file.id=f.fileInfoId
            file.name=f.fileName
            file.url=base+f.fileWebPath
            this.titlefileList.push(file);
          })
      });

      fileinfos({"bussinessId":this.form.contentFileId}).then((data) => {
          let list=data.retData;
          list.forEach ((f,k) =>{
            var file={};
            file.id=f.fileInfoId
            file.name=f.fileName
             file.url=base+f.fileWebPath
            this.contentfileList.push(file);
          })
      });

      fileinfos({"bussinessId":this.form.picFileId}).then((data) => {
          let list=data.retData;
          list.forEach ((f,k) =>{
            var file={};
            file.id=f.fileInfoId
            file.name=f.fileName
             file.url=base+f.fileWebPath
            this.picfileList.push(file);
          })
      });

       fileinfos({"bussinessId":this.form.otherFileId}).then((data) => {
          let list=data.retData;
          list.forEach ((f,k) =>{
            var file={};
            file.id=f.fileInfoId
            file.name=f.fileName
             file.url=base+f.fileWebPath
            this.fileList.push(file);
          })
      });
      
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