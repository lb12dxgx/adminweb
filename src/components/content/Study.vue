<template>
  <div class="content">
  	 <div class="seach">
      <el-form :inline="true" :model="filters" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="bigNum" ></el-input>
        </el-form-item>
        <el-form-item label="-">
          <el-input v-model="smalNum" ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button  @click="handleSubmit">计算</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>{{ step1 }}</div>
    <div>{{ step2 }}</div>
    <div>{{ step3 }}</div>
    <div>{{ step4 }}</div>
    

  </div>
</template>

<script>

  import {oneStep,twoStep,threeStep,foreStep} from '../../api/column';

   export default {
    data() {
      return {
       num:0,
       bigNum:'',
       smalNum:'',
       step1:'',
       step2:'',
       step3:'',
       step4:'',

    	}
	},

    methods: {


      handleSubmit() {
      	if(this.num==0){
	      	this.step1="";
	      	this.step2="";
	      	this.step3="";
	      	this.step4="";
      	}

        this.num = this.num+1;
        var params = {bigNum:this.bigNum,smalNum:this.smalNum};
        if(this.num==1){
        	oneStep(params).then(data => {
             
              this.step1 =data.retData;
             });
        };

        if(this.num==2){
        	twoStep(params).then(data => {
             
              this.step2 =data.retData;
             });
        };

        if(this.num==3){
        	threeStep(params).then(data => {
             
              this.step3 =data.retData;
             });
        };


        if(this.num==4){
        	foreStep(params).then(data => {
             	this.step4 =data.retData;
              	this.num=0;
             });
        };
      },

    }
}
 </script>