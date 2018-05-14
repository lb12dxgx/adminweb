<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
       <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" size="small">
            <el-row>
              <el-col :span="20">
                <el-form-item label="招标项目" required prop="zbXmName">
                 <el-input v-model="addForm.zbXmName"  >
                  </el-input> 
                </el-form-item>
              </el-col>
              
            </el-row>

            <el-row>
               <el-col :span="12">
                <el-form-item label="发布日期" required prop="publishDate">
                  <el-date-picker
                      v-model="addForm.publishDate"
                      style="width: 100%;"
                      type="date"
                      placeholder="发布日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="getStartDate">
                  </el-date-picker>

                </el-form-item>
                
              </el-col>

              <el-col :span="12">
                <el-form-item label="项目所在地" required prop="area">
                 <el-input v-model="addForm.area"  style="width:200px">
                  </el-input> 
                </el-form-item>
              </el-col>

            </el-row>
           
           <el-form-item label="招标内容"  prop="zbContent">
                <quill-editor v-model="addForm.zbContent"
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
  import {updateZbInfo,getZbInfo} from '../../api/service';
  const uuidv1 = require('uuid/v1');

  export default {
    components: {
      quillEditor
    },
    
    data() {
      return {
        editorOption: {
        },

        addFormRules: {
          zbXmName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '请输入地区', trigger: 'blur' }
          ],
          publishDate:[
            { required: true, message: '请输入发布日期', trigger: 'blur' }
          ],
            endDate:[
            { required: true, message: '请输入结束时间', trigger: 'blur' }
          ]
        },

        addForm: {
          zbInfoId:'',
          zbXmName:'',
          area:'', 
          publishDate:'',
          endDate:'',
          zbContent:''
        }
      }
        
    },

    methods: {

      
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
         this.$router.push({ path:'/main/system/zbinfo'});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              console.log(para);
              updateZbInfo(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/zbinfo'});
              
              });
            });
          }
        });
      },
    },

    mounted() {
      let zbInfoId=this.$route.query.zbInfoId;
      let para = {zbInfoId: zbInfoId};
      getZbInfo(para).then((data) => {
        this.addForm=data.retData;
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
