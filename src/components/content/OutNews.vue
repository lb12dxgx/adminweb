<template>
  <div class="content">
    <div class="head" >
      <el-badge  class="item" v-for="(newsvo,index) in keyList" :value="newsvo.num" style="margin:5px 10px">
        <el-button size="small" @click="handleList(index)">
          {{ newsvo.keyword }}
        </el-button>
      </el-badge>
    </div>
    <div style="text-align:center">
      <h3>{{keyList[this.kindex].keyword}}</h3>
    </div>
    <div class="list">
      <div style="text-align:right;margin-bottom:5px">
          <el-button  size="small" @click="handleAllDel()" type="danger">
             全部删除
          </el-button>
      </div>
      <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="标题" > 
        </el-table-column> 
        
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
         
          </template>
      </el-table-column>
      </el-table>
    </div>
    

    

  </div>
</template>

<script>
  import {getOutNewsList,deleteOutNew,deleteAllOutNew} from '../../api/column';
  import NProgress from 'nprogress';
  export default {
    data() {
      return {
        listLoading:false,
        list: [],
        keyList:[],
        kindex:0,
      }
    },

    methods: {
      getList() {
          this.listLoading = true;
          NProgress.start();
          getOutNewsList().then(data => {
            this.listLoading = false;
            NProgress.done();
            this.keyList =data.retData;
            this.list=this.keyList[0].outNewsInfos;
          });
      },

      handleView(index, row){
        window.open(row.url);
      },

      handleDel(index, row){
        let para = {outnewsinfoId: row.outnewsinfoId };
        console.log(para);
        deleteOutNew(para).then(() => {
          this.list.splice(index, 1);
          this.keyList[this.kindex].num=this.keyList[this.kindex].num-1;
        }) 
      },

      handleAllDel(){
          let para={keyWord:this.keyList[this.kindex].keyword}
          deleteAllOutNew(para);
          this.keyList[this.kindex].num=0;
          this.list=null;
      },

      handleList(index){
        this.kindex=index;
        this.list=this.keyList[index].outNewsInfos;
      }
    },

    mounted() {
      this.getList();
    }

  }
</script>