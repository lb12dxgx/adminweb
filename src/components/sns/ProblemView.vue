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

          <el-card style="margin-left:40px" v-for="(item,index) in list" :key="index">
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

        </el-col>
      </el-row>
      <div style="text-align:center;margin-top:20px">
        <el-button type="primary" @click="retBack" >返回</el-button>
      </div>
    

   </div>
</template>

<script>
  import {getProblem,getAnswerList} from '../../api/sns';
  

  export default {
    data() {
      return {
        addForm: {
        },
        type:1,
        list:[]
      }
    },

    methods: {
      
      //新增
      retBack() {
        if(this.type==1){
         this.$router.push({ path:'/main/system/sns/problem'});
        }else{
          this.$router.push({ path:'/main/system/sns/problem/over'});
        }
      },

     

      
    },

     

    mounted() {
      let problemId=this.$route.query.problemId;
      this.type=this.$route.query.type;
      let para = {problemId: problemId};
      getProblem(para).then((data) => {
        this.addForm=data.retData;
        getAnswerList(para).then((data) => {
          this.list=data.retData;
        });
      })
    }

  }
</script>

<style>

</style>

