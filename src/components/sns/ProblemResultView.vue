<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
      <el-form :model="addForm" label-width="120px"  ref="addForm" size="small">
            <el-row>
              <el-col :span="20">
                <el-form-item label="问题标题" required prop="title">
                 <el-input v-model="addForm.title" :disabled="true" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="内容" required prop="content">
                <el-input v-model="addForm.content" :disabled="true"
                type="textarea"  :rows="4">
                </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="礼物名称" required prop="giftName">
                 <el-input v-model="addForm.giftName"  :disabled="true">
                  </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="问题积分" required prop="money">
                 <el-input v-model="addForm.money":disabled="true" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="用户名"  prop="personName">
                 <el-input v-model="addForm.personName" :disabled="true">
                 </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="职位"  prop="personPosition">
                  <el-input v-model="addForm.personPosition" :disabled="true" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="企业名"  prop="enterpriseName">
                 <el-input v-model="addForm.enterpriseName" :disabled="true">
                 </el-input> 
                </el-form-item>
              </el-col>

              
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="创建时间"  prop="createDate">
                 <el-input v-model="addForm.createDate" :disabled="true">
                 </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
               <el-form-item label="问题天数"  prop="dayNum">
                <el-input v-model="addForm.dayNum" :disabled="true" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="查看数量"  prop="viewNum">
                 <el-input v-model="addForm.viewNum" :disabled="true">
                 </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
               <el-form-item label="回答数量"  prop="answerNum">
                <el-input v-model="addForm.answerNum" :disabled="true" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>

           <el-tabs value="first"  @tab-click="handleClick">
            <el-tab-pane label="奖励列表" name="first"></el-tab-pane>
            <el-tab-pane label="回答列表" name="second"></el-tab-pane>
         </el-tabs>
          <div v-if="tabName=='second'">
            <el-card  v-for="(item,index) in list" :key="index">
              <div slot="header" class="clearfix" style="font-size:14px">
                <span>{{item.enterpriseName}}:</span>
                <span>
                  {{item.personName}}({{item.personPosition}})
                </span>
                <span style="float:right;margin-right:20px">
                  {{item.createDate}}
                </span>
              </div>
              <div>
                {{item.content}}
              </div>
            </el-card>
          </div>
          <div v-if="tabName=='first'">
            <el-table :data="resultlist" highlight-current-row  border style="width: 100%">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="personName" label="用户名" > </el-table-column>
              <el-table-column prop="personPosition" label="职位"></el-table-column>
              <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
              <el-table-column prop="scoreNum" label="积分"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div style="text-align:center;margin-top:20px">
        <el-button type="primary" @click="retBack" >返回</el-button>
      </div>
    

   </div>
</template>

<script>
  import {getProblem,getAnswerList,getResultList} from '../../api/sns';
  

  export default {
    data() {
      return {
        addForm: {
         
        },
        tabName:'first',
        list:[],
        resultlist:[],
        type:''
      }
    },

    methods: {
      
      //新增
      retBack() {
         this.$router.push({ path:'/main/system/sns/problem/finsh'});
      },

      handleClick(tab){
        this.tabName=tab.name;
      },

      
    },

     

    mounted() {
      let problemId=this.$route.query.problemId;
      let para = {problemId: problemId};
      getProblem(para).then((data) => {
        this.addForm=data.retData;
        getAnswerList(para).then((data) => {
          this.list=data.retData;
        });
         getResultList(para).then((data) => {
          this.resultlist=data.retData;
        });

      })
    }

  }
</script>

<style>

</style>

