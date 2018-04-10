<template>
  <div class="content">
    <el-row>
      <el-col :span="4" style="border-right:1px solid #cccccc;min-height:630px">
        <el-tree :data="columnJson" :props="defaultProps" node-key="columnId" @node-click="nodeClick"></el-tree>
      </el-col> 

      <el-col :span="18" style="margin-left:20px" v-show="flag">
       <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="栏目名称" required prop="columnName">
          <el-input v-model="editForm.columnName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码"  prop="columnCode" >
          <el-input v-model="editForm.columnCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态"  prop="state" >
          <el-select v-model="editForm.state" placeholder="请选择">
            <el-option
              v-for="item in stateList"
              :key="item.state"
              :label="item.stateName"
              :value="item.state">
            </el-option>
          </el-select>
       </el-form-item>
       <el-form-item label="浏览权限"  prop="login" >
          <el-select v-model="editForm.login" placeholder="请选择">
            <el-option
              v-for="item in loginList"
              :key="item.state"
              :label="item.stateName"
              :value="item.state">
            </el-option>
          </el-select>
       </el-form-item>
      </el-form>
        <div style="text-align:center;margin-top:10px;">
         <el-button type="primary" @click.native="editSubmit">保存</el-button>
         <!-- <el-button type="primary" @click.native="handleModel">内容模型</el-button> -->
        </div>
       <div style="margin-top:10px; border-top:1px solid #cccccc;">
         <div style="margin:10px; float:right">
          <el-button type="primary" @click.native="handleAdd">新增</el-button>
         </div>
          <el-table :data="subColumns" highlight-current-row  border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="columnName" label="栏目名称" > </el-table-column>
            <el-table-column prop="columnCode" label="编码"></el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                 <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
       </div>
      </el-col>

      <el-col :span="18" style="margin-left:20px" v-show="!flag">
        <div style="text-align:center;margin:10px 0">
          栏目名称: {{editForm.columnName}}
        </div>
        <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="{}"
                @change="onEditorChange($event)"
                >
          </quill-editor>
        <div style="text-align:center;margin-top:10px">
         <el-button type="primary" @click.native="handleEdit">确定</el-button>
       </div>
      </el-col>

    </el-row>



    <el-dialog title="新增栏目" :visible.sync="addFormVisible">
       
      <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm">
        <el-form-item label="栏目名称" required prop="columnName">
          <el-input v-model="addForm.columnName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码"  prop="columnCode" >
          <el-input v-model="addForm.columnCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态"  prop="state" >
          <el-select v-model="addForm.state" placeholder="请选择">
            <el-option
              v-for="item in stateList"
              :key="item.state"
              :label="item.stateName"
              :value="item.state">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="浏览权限"  prop="login" >
          <el-select v-model="addForm.login" placeholder="请选择">
            <el-option
              v-for="item in loginList"
              :key="item.state"
              :label="item.stateName"
              :value="item.state">
            </el-option>
          </el-select>
       </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  
  import NProgress from 'nprogress';
  import {saveColumn,getColumnTree,deleteColumn,updateColumn} from '../../api/column';
  import {getNode,delNode,addNode,getParentNode} from '../../api/tree.js';



 export default {
    components: {
      quillEditor
    },
    data() {
      return {

        columnJson:[],
       
        defaultProps: {
          children: 'children',
          label: 'columnName'
        },

        flag:true,
        addLoading:false,
        addFormVisible:false,
        addFormRules: {
          columnName: [
            { required: true, message: '请输入栏目名称', trigger: 'blur' }
          ],
           columnCode: [
            { required: true, message: '请输入栏目编码', trigger: 'blur' }
          ]
        },
        addForm: {
          columnName: '',
          columnCode: '',
          contentjson:'',
          state:0,
          login:0,
        },

        editFormRules: {
          columnName: [
            { required: true, message: '请输入栏目名称', trigger: 'blur' }
          ],
           columnCode: [
            { required: true, message: '请输入栏目编码', trigger: 'blur' }
          ]
        },
        editForm: {
         columnName: '',
         columnCode: '',
         columnId: '',
         contentjson:[],
         state:'',
         login:'',
         parentId:'',
        },
        parentId:'',
        subColumns:[],
        stateList:[
          {state:0,stateName:'启用'},
          {state:1,stateName:'停用'}
        ],
        loginList:[
          {state:0,stateName:'不需要登录'},
          {state:1,stateName:'需要登录'}
        ],
        content:""

    }
  },
  computed: {
    
    editor() {
      console.log("myQuillEditor");
        console.log(this.$refs.myQuillEditor);
        return this.$refs.myQuillEditor.quill
    },

  },
   methods: {

      //性别显示转换
      formatState(row, column) {
          if(row.state == 0){
            return '启用';
          }else if(row.state ==1){
            return '停用';
          }
      },

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


      nodeClick(columns,curcolumn,node){
        this.editForm.columnName=curcolumn.data.columnName;
        this.editForm.columnCode=curcolumn.data.columnCode;
        this.editForm.columnId=curcolumn.data.columnId;
        this.editForm.state=curcolumn.data.state;
        this.editForm.login=curcolumn.data.login;
        this.editForm.parentId=curcolumn.data.parentId;
        this.content="<pre>"+curcolumn.data.contentjson+"</pre>";
        this.subColumns=curcolumn.data.children;
        this.parentId=curcolumn.data.columnId;
        this.flag=true;
        
      },

       handleAdd(){
        this.addFormVisible = true;
      },

      handleModel(){
        this.flag=false;
      },

      handleEdit(){
        this.flag=true;
      },

      


      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              NProgress.start();

             let para = Object.assign({parentId:this.parentId}, this.addForm);
              saveColumn(para).then((res) => {
                this.addLoading = false;
                NProgress.done();
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                let n = res.retData ;
                this.subColumns.push(n);
              });
            });
          }
        });
      },

      editSubmit: function () {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              NProgress.start();
              this.editForm.contentjson=this.editor.getText();
              let para = this.editForm;
              updateColumn(para).then((res) => {
                this.editLoading = false;
                NProgress.done();
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  duration:2500,
                  type: 'success'
                });
                 console.log(res.retData);
                 let updateNode=res.retData;
                 console.log(updateNode);
                 var pNode=getParentNode(this.columnJson[0],updateNode,"columnId");
                  if(pNode!=undefined){
                   let m=pNode.children.findIndex(t => t.columnId === updateNode.columnId)
                   this.$set(pNode.children, m, updateNode);
                  }
               
                 console.log(this.columnJson);
                
              }).catch((err)=>{
                  this.editLoading = false;
                  console.log(err);
                  NProgress.done();
                    this.$alert('提交错误，请联系系统管理员!', '系统提示', {
                              confirmButtonText: '确定'
                      });
                });
            });
      },
    

     //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {columnId: row.columnId };
          deleteColumn(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '删除成功',
                duration:2500,
                type: 'success'
              });
              let m=this.subColumns.findIndex(t => t.columnId === para.columnId)
              this.subColumns.splice(m,1);
              delNode(this.columnJson[0],para.columnId,"columnId");
            }
            
          });
        });
      },
      
      getTree(){
         getColumnTree().then((res) => {
            this.columnJson =res.retData ;
            this.editForm.columnName=this.columnJson[0].columnName;
            this.editForm.columnCode=this.columnJson[0].columnCode;
            this.editForm.state=this.columnJson[0].state;
            this.editForm.login=this.columnJson[0].login;
            this.editForm.columnId=this.columnJson[0].columnId;
            this.editForm.login=this.columnJson[0].login;
            this.editForm.parentId=this.columnJson[0].parentId;
            this.content="<pre>"+this.columnJson[0].contentjson+"</pre>";
            this.subColumns=this.columnJson[0].children;
            this.parentId=this.columnJson[0].columnId;
          })
      }

    },

     mounted() {
      this.getTree();
    }
  }
   </script>

