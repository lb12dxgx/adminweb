<template>
  <div class="content">
    <el-row>
      <el-col :span="4" style="border-right:1px solid #cccccc;min-height:630px">
        <el-tree :data="menuJson" :props="defaultProps" node-key="menuId" @node-click="nodeClick"></el-tree>
      </el-col> 
      <el-col :span="18" style="margin-left:20px">
       <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="名称" required prop="menuName">
          <el-input v-model="editForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址"  prop="menuUrl" >
          <el-input v-model="editForm.menuUrl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="顺序"  prop="menuUrl" >
          <el-input v-model="editForm.code" auto-complete="off"></el-input>
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
          <el-table :data="subMenus" highlight-current-row  border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="menuName" label="名称" > </el-table-column>
            <el-table-column prop="menuUrl" label="地址"></el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                 <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
       </div>
      </el-col>
    </el-row>
    <el-dialog title="新增菜单" :visible.sync="addFormVisible">
       
      <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm">
       <el-form-item label="名称" required prop="menuName">
          <el-input v-model="addForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址"  prop="menuUrl" >
          <el-input v-model="addForm.menuUrl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="顺序"  prop="menuUrl" >
          <el-input v-model="addForm.code" auto-complete="off"></el-input>
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
  import {saveMenu,getMenuTree,deleteMenu,updateMenu} from '../../api/api';
  import {getNode,delNode,addNode,getParentNode} from '../../api/tree.js';



 export default {
  
    data() {
      return {
        menuJson:[],
       
        defaultProps: {
          children: 'children',
          label: 'menuName'
        },
        addLoading:false,
        addFormVisible:false,
        addFormRules: {
          menuName: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' }
          ]
        },
        addForm: {
          menuName: '',
          menuUrl: '',
          code:'',
        },

        editFormRules: {
          menuName: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' }
          ]
        },
        editForm: {
          menuName: '',
          menuUrl: '',
          menuId: '',
          code:'',
          parentMenuId:''
        },
        parentMenuId:'',
        subMenus:[],
    }
  },
  
   methods: {

      nodeClick(menus,curMenu,node){
        this.editForm.menuName=curMenu.data.menuName;
        this.editForm.menuUrl=curMenu.data.menuUrl;
        this.editForm.menuId=curMenu.data.menuId;
        this.editForm.parentMenuId=curMenu.data.parentMenuId;
        this.editForm.code=curMenu.data.code;
        this.subMenus=curMenu.data.children;
        this.parentMenuId=curMenu.data.menuId;
        
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

             let para = Object.assign({parentMenuId:this.parentMenuId}, this.addForm);
              saveMenu(para).then((res) => {
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
                this.subMenus.push(n);
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
              updateMenu(para).then((res) => {
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
                 var pNode=getParentNode(this.menuJson[0],updateNode,"menuId");
                   console.log(pNode);
                 let m=pNode.children.findIndex(t => t.menuId === updateNode.menuId)
                 this.$set(pNode.children, m, updateNode);
               
                 console.log(this.menuJson);
                
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
          let para = {menuId: row.menuId };
          deleteMenu(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '删除成功',
                duration:2500,
                type: 'success'
              });
              let m=this.subMenus.findIndex(t => t.menuId === para.menuId)
              this.subMenus.splice(m,1);
              delNode(this.menuJson[0],para.menuId,"menuId");
            }
            
          });
        });
      },
      
      getTree(){
         getMenuTree().then((res) => {
            console.table(res.retData);
            this.menuJson =res.retData ;
            this.editForm.menuName=this.menuJson[0].menuName;
            this.editForm.menuUrl=this.menuJson[0].menuUrl;
            this.editForm.menuId=this.menuJson[0].menuId;
            this.subMenus=this.menuJson[0].children;
            this.parentMenuId=this.menuJson[0].menuId;
          })
      }

    },

     mounted() {
      this.getTree();
    }
  }
   </script>

