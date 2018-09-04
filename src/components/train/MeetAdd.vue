<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="会议名称" required prop="meetName">
                 <el-input v-model="addForm.meetName"  >
                  </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="会议地点" required prop="meetPlace">
                 <el-input v-model="addForm.meetPlace"  >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="会议价格"  prop="meetPrice">
                 <el-input v-model.number="addForm.meetPrice" type="number" >
                   <template slot="append">元</template>
                  </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="总人数"  prop="num">
                  <el-input v-model.number="addForm.num" type="number">
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="开始时间" required prop="startDate">
                  <el-date-picker
                      v-model="addForm.startDate"
                      style="width: 100%;"
                      type="date"
                      placeholder="开始时间"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="getStartDate">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="结束时间" required prop="endDate">
                  <el-date-picker
                      v-model="addForm.endDate"
                      style="width: 100%;"
                      type="date"
                      placeholder="开始时间"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="getEndDate">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>



            <el-row>
              <el-col :span="12">
                <el-form-item label="直播地址"  prop="zburl">
                    <el-input v-model="addForm.zburl"  >
                  </el-input> 
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="直播状态"  prop="zbState">
                   <el-select v-model="addForm.zbState" placeholder="请选择">
                      <el-option
                        v-for="item in optionStates"
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
                <el-form-item label="显示方式"  prop="showMain">
                   <el-select v-model="addForm.showMain" placeholder="请选择">
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

            <el-form-item label="会议摘要"  prop="meetSummary">
                 <el-input v-model="addForm.meetSummary" type="textarea"  :rows="4">
                  </el-input> 
            </el-form-item>

             <el-form-item label="会议图片"  prop="meetPicId">
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
            </el-form-item>


           
           <el-form-item label="会议内容"  prop="meetContent">
                <quill-editor v-model="addForm.meetContent"
                    ref="myQuillEditor"
                    :options="editorOption"
                >
                </quill-editor>
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
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor } from 'vue-quill-editor'
  import {deleteFileinfo,base} from '../../api/fileinfo';
  import {saveMeet} from '../../api/service';
  const uuidv1 = require('uuid/v1');

  export default {
    components: {
      quillEditor
    },
    
    data() {
      return {
        uploadAction:base+"/file/upload.do",
        titleDate:
        {
          dirName:'content/meet/',
          token:sessionStorage.getItem('accessToken'),
          bussinessId:uuidv1()
        },
        titlefileList:[], 
        editorOption: {
        
        },

        addFormRules: {
          meetName: [
            { required: true, message: '请输入会议名称', trigger: 'blur' }
          ],
          meetPlace: [
            { required: true, message: '请输入会议地点', trigger: 'blur' }
          ],
          startDate:[
            { required: true, message: '请输入发布日期', trigger: 'blur' }
          ],
            endDate:[
            { required: true, message: '请输入结束时间', trigger: 'blur' }
          ]
        },

        addForm: {
          meetName:'',
          meetPlace:'', 
          meetPrice:'',
          num:'',
          startDate:'', 
          endDate:'',
          meetSummary:'',
          meetContent:'',
          meetPicId:'',
          showMain:'',
          zburl:'',
          zbState:'',
        },
         options: 
        [
          {
            value: 1,
            label: '单独显示'
          },{
            value: 0,
            label: '列表显示'
          }
        ],
        optionStates: 
        [
          {
            value: 1,
            label: '启用'
          },{
            value: 0,
            label: '停用'
          }
        ],
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
         this.$router.push({ path:'/main/system/meet'});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              console.log(para);
              saveMeet(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/meet'});
              
              });
            });
          }
        });
      },

      handleTitleSuccess(res, file) {
          this.addForm.meetPicId=res.retData.bussinessId;
          this.titleDate.bussinessId=res.retData.bussinessId;
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
      },

    },

     

    mounted() {
      
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

  
</style>
