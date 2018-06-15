<template>
  <div class="content">
    <el-row>
      <el-col :span="4" style="border-right:1px solid #cccccc;min-height:630px">
        <el-tree :data="dictJson" :props="defaultProps" node-key="dictId" @node-click="nodeClick"></el-tree>
      </el-col> 
      <el-col :span="18" style="margin-left:20px">
       <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="名称" required prop="dictName">
          <el-input v-model="editForm.dictName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="值"  prop="dictValue" >
          <el-input v-model="editForm.dictValue" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="顺序"  prop="orderNum" >
          <el-input v-model="editForm.orderNum" auto-complete="off"></el-input>
        </el-form-item>
        
        </el-form-item>
      </el-form>
        <div style="text-align:center;margin-top:10px;">
         <el-button type="primary" @click.native="editSubmit">保存</el-button>
        </div>
       <div style="margin-top:10px; border-top:1px solid #cccccc;">
         <div style="margin:10px; float:right">
          <el-button type="primary" @click.native="handleAdd">新增</el-button>
         </div>
          <el-table :data="subDicts" highlight-current-row  border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="dictName" label="名称" > </el-table-column>
            <el-table-column prop="dictValue" label="值"></el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                 <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
       </div>
      </el-col>
    </el-row>
    <el-dialog title="新增字典" :visible.sync="addFormVisible">
       
      <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm">
       <el-form-item label="名称" required prop="dictName">
          <el-input v-model="addForm.dictName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="值"  prop="dictValue" >
          <el-input v-model="addForm.dictValue" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="顺序"  prop="orderNum" >
          <el-input v-model="addForm.orderNum" auto-complete="off"></el-input>
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
  
  import NProgress from 'nprogress';
  import {saveDict,getDictTree,deleteDict,updateDict} from '../../api/api';
  import {getNode,delNode,addNode,getParentNode} from '../../api/tree.js';



 export default {
  
    data() {
      return {
        dictJson:[],
       
        defaultProps: {
          children: 'children',
          label: 'dictName'
        },
        addLoading:false,
        addFormVisible:false,
        addFormRules: {
          dictName: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' }
          ]
        },
        addForm: {
          dictName: '',
          dictValue: '',
          orderNum:'',
        },

        editFormRules: {
          menuName: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' }
          ]
        },
        editForm: {
          dictName: '',
          dictValue: '',
          orderNum:'',
          dictId: '',
          pdictId:''
        },
        pdictId:'',
        subDicts:[],
    }
  },
  
   methods: {

      nodeClick(dicts,curdict,node){
        this.editForm.dictName=curdict.data.dictName;
        this.editForm.dictValue=curdict.data.dictValue;
        this.editForm.dictId=curdict.data.dictId;
        this.editForm.pdictId=curdict.data.pdictId;
        this.editForm.orderNum=curdict.data.orderNum;
        this.subDicts=curdict.data.children;
        this.pdictId=curdict.data.dictId;
        
      },

       handleAdd(){
        this.addFormVisible = true;
      },


      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              NProgress.start();

             let para = Object.assign({pdictId:this.pdictId}, this.addForm);
              saveDict(para).then((res) => {
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
                let n = res.retData;
                this.subDicts.push(n);
              });
            });
          }
        });
      },

      editSubmit: function () {
            console.table(this.editForm);
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              NProgress.start();
             
              let para = this.editForm;
              updateDict(para).then((res) => {
                this.editLoading = false;
                NProgress.done();
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  duration:2500,
                  type: 'success'
                });
                 console.log(res.retData);
                 //this.subMenus.push(res.retData.node);
                 let updateNode=res.retData;
                 console.log(updateNode);
                 var pNode=getParentNode(this.dictJson[0],updateNode,"dictId");
                   console.log(pNode);
                 let m=pNode.children.findIndex(t => t.dictId === updateNode.dictId)
                 this.$set(pNode.children, m, updateNode);
               
                 console.log(this.dictJson);
                
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
          let para = {dictId: row.dictId };
          deleteDict(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '删除成功',
                duration:2500,
                type: 'success'
              });
              let m=this.subDicts.findIndex(t => t.dictId === para.dictId)
              this.subDicts.splice(m,1);
              delNode(this.dictJson[0],para.dictId,"dictId");
            }
            
          });
        });
      },
      
      getTree(){
         getDictTree().then((res) => {
            console.table(res.retData);
            this.dictJson =res.retData ;
            this.editForm.dictName=this.dictJson[0].dictName;
            this.editForm.dictValue=this.dictJson[0].dictValue;
            this.editForm.dictId=this.dictJson[0].dictId;
            this.subDicts=this.dictJson[0].children;
            this.pdictId=this.dictJson[0].dictId;
          })
      }

    },

     mounted() {
      this.getTree();
    }
  }
   </script>

