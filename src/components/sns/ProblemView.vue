<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
      <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="兑换编码" required prop="exchangeCode">
                 <el-input v-model="addForm.exchangeCode" :disabled="true" >
                  </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="姓名" required prop="personName">
                 <el-input v-model.number="addForm.personName" :disabled="true">
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
                <el-form-item label="兑换数量" required prop="num">
                 <el-input v-model.number="addForm.num":disabled="true" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="用户电话"  prop="telphone">
                 <el-input v-model="addForm.telphone" :disabled="true">
                 </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="邮寄地址"  prop="postAddren">
                  <el-input v-model="addForm.postAddren" :disabled="true" >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="12">
                <el-form-item label="快递时间"  prop="postDate">
                  <el-date-picker
                    v-model="addForm.postDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="快递单号"  prop="postCode">
                  <el-input v-model="addForm.postCode"  >
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

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
  import {addExchangePost,getExchange} from '../../api/sns';
  

  export default {
    data() {
      return {
        addForm: {
         
        },
      }
    },

    methods: {
      
      //新增
      retBack() {
         this.$router.push({ path:'/main/system/Exchange'});
      },

     addSubmit(){
      let para = {exchangeId: this.addForm.exchangeId,postCode:this.addForm.postCode,postDate:this.addForm.postDate};
      addExchangePost(para).then((data) => {
        this.$router.push({ path:'/main/system/Exchange'});
      })
     } 

      
    },

     

    mounted() {
      let exchangeId=this.$route.query.exchangeId;
      let para = {exchangeId: exchangeId};
      getExchange(para).then((data) => {
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

  
</style>
