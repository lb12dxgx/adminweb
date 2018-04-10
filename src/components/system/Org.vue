<template>
  <div class="content">
    <el-row>
      <el-col :span="6">
        <el-tree :data="orgJson" :props="defaultProps" node-key="orgId"></el-tree>
      </el-col>
      <el-col :span="18">
        <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                >
        </quill-editor>
        <div style="text-align:center;margin-top:10px">
         <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
       </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  import NProgress from 'nprogress';
  import {saveOrg,getOrgTree} from '../../api/api';

  var orgJson=[{"orgId":"0","orgName":"部门管理","children":[{"orgId":"0-1","orgName":"平台运维部"},{"orgId":"0-2","orgName":"平台市场部1"}]}];

 export default {
    components: {
      quillEditor
    },
    data() {
      return {
        orgJson:[],
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        editorOption: {
        },
        editLoading: false,
        content:""
    }
  },
  computed: {
    
    editor() {
        return this.$refs.myQuillEditor.quill
    }
  },
   methods: {
      onEditorBlur(quill) {
        //console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        //console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
       // console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        //this.content = text
      },

      editSubmit: function () {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              NProgress.start();
              let para = JSON.parse(this.editor.getText());
              saveOrg(para).then((res) => {
                this.editLoading = false;
                NProgress.done();
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  duration:2500,
                  type: 'success'
                });
                console.log(res.retData);
                this.orgJson = JSON.parse(res.retData.orgJsonTree) ;
                
              }).catch((err)=>{
                  console.log(err);
                  this.editLoading = false;
                  NProgress.done();
                    this.$alert('提交错误，请联系系统管理员!', '系统提示', {
                              confirmButtonText: '确定'
                      });
                });
            });
      }
    },

     mounted() {
      getOrgTree().then((res) => {
         if(res.retData==""){
          this.orgJson=orgJson;
         }else{
          this.orgJson = JSON.parse(res.retData) ;
        }

        this.content="<pre>"+JSON.stringify(this.orgJson , null, 4)+"</pre>";
      })
    }
  }
   </script>

