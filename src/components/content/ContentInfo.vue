<template>
  <div class="content">
    <el-row>
      <el-col :span="3" style="border-right:1px solid #cccccc;min-height:930px">
        <el-tree :data="columnJson" :props="defaultProps" :highlight-current=true node-key="columnId" @node-click="nodeClick"></el-tree>
      </el-col> 

       <div style="margin-top:5px;text-align:center;font-size:18px;">
          {{listTitle}}
        </div>
        
      <el-col :span="19" style="margin-left:20px" v-if="listflag">

        <div style="margin-top:10px;">
          <el-form :inline="true" :model="filters" class="demo-form-inline">
            <el-form-item label="标题">
              <el-input v-model="filters.contentTitle" placeholder="标题"></el-input>
            </el-form-item>
            
            <el-form-item>
              <el-button  @click=" getList">查询</el-button>
              <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
       <div class="list">
          <el-table :data="contentList" highlight-current-row  border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="contentTitle" label="标题" > </el-table-column> 
            <el-table-column prop="level" label="级别" width="70" :formatter='formatLevel'></el-table-column>
            <el-table-column prop="contentJson.creator" label="发布者" width="80"></el-table-column>
             <el-table-column prop="contentJson.pdate" label="发布时间" width="100"
             :formatter='formatDate'>
             </el-table-column>
              
             <el-table-column prop="viewNum" label="点击" width="50"></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                 <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
       </div>
        <div class="page">
          <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="5" layout="total,  prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>

      <el-col :span="18" style="margin-left:20px" >
        <contentInfo-add @contentAddEvent='handleContentAdd' :columnId="columnId" v-if="addflag">
        </contentInfo-add>
        <contentInfo-edit @contentUpdateEvent='handleContentUpdate' :form="editContent" v-if="editflag">
        </contentInfo-edit>
      </el-col>

    </el-row>


  </div>
</template>

<script>
import NProgress from 'nprogress';
import {treeByPrivage,getContentList,deleteContent} from '../../api/column';
import {getColumnByUserId} from '../../api/api';
import ContentInfoAdd from './ContentInfoAdd.vue';
import ContentInfoEdit from './ContentInfoEdit.vue';
export default {
    components: {
        ContentInfoAdd,
        ContentInfoEdit,
     },
    data() {
      return {
         filters: {
          contentTitle: ''
        },
        columnJson:[],
        defaultProps: {
          children: 'children',
          label: 'columnName'
        },
        listTitle:'栏目标题',
        listflag:false,
        addflag:false,
        editflag:false,
        contentList:[],
        columnId:"",
        total: 0,
        pageNum: 1,
        editContent:{},
        levelMap:{90:'级别一',80:'级别二',70:'级别三'}
      }
  },
 
   methods: {

     

      //性别显示转换
      formatDate(row, column) {
          var val=row.contentJson.pdate
         if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
      },

      formatLevel(row, column) {
          var val=row.contentJson.level
          return this.levelMap[val];
      },

      nodeClick(columns,curcolumn,node){
        this.columnId=curcolumn.data.columnId;
        this.listTitle=curcolumn.data.columnName;
        console.log(curcolumn.data)
        if(curcolumn.data.children==undefined||curcolumn.data.children.length==0){
            this.listflag=true;
            this.addflag=false;
            this.editflag=false;
            this.getList();

        }
        
      },

       handleAdd(){

        this.addflag = true;
        this.listflag=false;
      },

      handleModel(){
        this.listflag=false;
      },

      handleEdit(index, row){
        this.editContent=row;
      
        this.editflag = true;
        this.listflag=false;
      },

      handleContentAdd(content){
        this.getList();
        this.addflag = false;
        this.listflag=true;
      },

      handleContentUpdate(content){

        this.getList();
        this.editflag = false;
        this.listflag=true;
      },

      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },

      
     //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {contentId: row.contentId};
          deleteContent(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            if(res.state==1){
              this.$notify({
                title: '成功',
                message: '删除成功',
                duration:2500,
                type: 'success'
              });
              let m=this.contentList.findIndex(t => t.contentId === para.contentId)
              this.contentList.splice(m,1);
            }
            
          });
        });
      },
      
      getTree(){
        let userpara={'userId': sessionStorage.getItem('accessToken')};
        getColumnByUserId(userpara).then((res) =>{
          var columnIdList=new Array()
          var i=0;
         for(var content of res.retData){
            columnIdList[i]=content.columnId;
            i=i+1;
          };
          let para={'columnIdList':columnIdList} ;
          treeByPrivage(para).then((res) => {
            this.columnJson =res.retData ;
          })

        })
         
      },

      getList(){
        let para =Object.assign({pageNum:this.pageNum,columnId:this.columnId}, this.filters);
        getContentList(para).then((data) => {
          this.contentList =data.retData.content;
          for(var content of this.contentList){
              content.contentJson=JSON.parse(content.contentJson);
          }
          this.total=data.retData.totalElements;
        })
      }

    },

     mounted() {
      this.getTree();
    }
  }
   </script>

