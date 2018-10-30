<template>
  <div class="content">
    <el-row>
      <el-col :span="20" :offset="2">
      <el-form :model="addForm" label-width="120px"  :rules="addFormRules" ref="addForm" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="礼物名称" required prop="name">
                 <el-input v-model="addForm.name"  >
                  </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="积分" required prop="price">
                 <el-input v-model.number="addForm.price" type="price">
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="规格"  prop="spec">
                 <el-input v-model="addForm.spec">
                 </el-input> 
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="库存数量"  prop="num">
                  <el-input v-model.number="addForm.num" type="number">
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="大图地址"  prop="picUrl">
                 <el-input v-model="addForm.picUrl">
                 </el-input> 
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="小图地址"  prop="smailPicUrl">
                  <el-input v-model="addForm.smailPicUrl">
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="礼物介绍地址"  prop="descUrl">
                  <el-input v-model="addForm.descUrl">
                  </el-input> 
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="12">
                <el-form-item label="邮费"  prop="post">
                   <el-select v-model="addForm.post" placeholder="请选择">
                      <el-option
                        v-for="item in postOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="状态"  prop="state">
                   <el-select v-model="addForm.state" placeholder="请选择">
                      <el-option
                        v-for="item in stateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
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
  import {saveGift,getGift} from '../../api/sns';
  

  export default {
    data() {
      return {
        
        

        addFormRules: {
          name: [
            { required: true, message: '请输入礼物名称', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入积分', trigger: 'blur' }
          ],
          spec:[
            { required: true, message: '请输入规格', trigger: 'blur' }
          ],
          post:[
            { required: true, message: '请选择邮费', trigger: 'blur' }
          ],
          num:[
            { required: true, message: '请填写数量', trigger: 'blur' }
          ],
          state:[
            { required: true, message: '请填写状态', trigger: 'blur' }
          ]
        },

        addForm: {
          name:'',
          price:'', 
          meetPrice:'',
          num:'',
          spec:'', 
          post:'',
          num:'',
          state:''
        },
         postOptions: 
        [
          {
            value: 0,
            label: '免邮费'
          },{
            value: 1,
            label: '收邮费'
          }
        ],
        stateOptions: 
        [
          {
            value: 0,
            label: '上架'
          },{
            value: 1,
            label: '下架'
          }
        ],
      }
        
    },

    methods: {
      
      //新增
      retBack() {
         this.$router.push({ path:'/main/system/gift'});
      },

      //新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            
              let para = Object.assign({}, this.addForm);
              console.log(para);
              saveGift(para).then((res) => {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  duration:2500,
                  type: 'success'
                });
                this.$router.push({ path:'/main/system/gift'});
              
              });
            });
          }
        });
      }

      
    },

     

    mounted() {
      let giftId=this.$route.query.giftId;
      let para = {giftId: giftId};
      getGift(para).then((data) => {
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
