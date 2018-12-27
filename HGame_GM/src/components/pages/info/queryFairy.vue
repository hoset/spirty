<!--活动 -> 配置-->
<template>
  <div class="list-lb">
  	<h3>精灵查询</h3>
			<el-form :inline="true" :model="formData" class="demo-form-inline"  ref="form" :rules="rules">
				  <el-form-item label="选择数据库服务器" prop="serverId">
				    <el-select v-model="formData.serverId" placeholder="请选择数据库服务器">
					      <el-option :label="item.serverName" :value="item.serverId" v-for="(item,i) in serverDatas" :key='i'></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="选择用户类型" prop="userType">
				    <el-select v-model="formData.userType" placeholder="选择排行类型">
					      <el-option :label="item.name" :value="item.id" v-for="(item,i) in ranklogConfig.userTypes" :key='i'></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    	<el-button type="primary" @click="logSubmit('form')">查询</el-button>
				  </el-form-item>
				</el-form>
				<!--表格-->
				<div class="table">
					<el-table
						  ref="multipleTable"
					    :data="tableDatas"
					    border
					    style="width: 100%;margin-bottom: 20px;">
					    <el-table-column
					      type="index"
					      align='center'
					      width="50">
					    </el-table-column>
					    <el-table-column
					      prop="logDate"
					      label="精灵名字"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="logDate"
					      label="拥有人数"
					      align='center'
					      >
					    </el-table-column>
					 </el-table>
					 <el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page.sync="paginations.pageCurrent"
				      :page-sizes="paginations.pageSizes"
				      :page-size="paginations.pageSize"
				      :layout="paginations.layout"
				      :total="paginations.pageNum">
			    </el-pagination>
			    </div>
   </div>
</template>
<script>
   import {ranklogConfig,dateFtt} from 'common/utils/publicConfig.js'
  export default {
    name: 'queryFairy',
    data () {
      return {
      		formData:{
      			 serverId:'',
      			 userType:''
      		},
      		//分页信息
      		paginations:{
      			pageSize:10,
      			pageCurrent:1,
      			pageSizes:[10,20,30,40],
      			pageNum:0,
      			layout: "total, sizes, prev, pager, next, jumper"
      		},
      		serverDatas:[],
      		allDatas:[],
      		tableDatas:[],
      		ranklogConfig:ranklogConfig,
      		rules: {
		          serverId: [
		            { required: true, message: '请选择服务器', trigger: 'change' }
		          ],
		          userType: [
		            { required: true, message: '请选择用户类型', trigger: 'change' }
		          ]
	        },
      }
    },
    methods: {
      // 获取服务器分组
      getServerGroup () {
        this.apiList4._get_(window.apiUrl.api_condition, {}, (err)=> {console.log(err)}, (res)=> {this.serverDatas = res}, false)
      },
      //点击查询
      logSubmit(form) {
	        this.$refs[form].validate((valid) => {
	        	var that=this
	        	if(valid){
        		 	console.log(this.formData)
        		 		this.apiList4._postj_(window.apiUrl.api_querynewsletterdatereport,this.formData,function (err) {
        		 			console.log(err)
        		 			that.$Message.error('err.statusText')
        		 			 that.allDatas=[]
        		 			 that.setPaginations()
        		 		},function(res){
        		 			console.log(res)
        		 			 if(res.length >0){
	        		 			 		that.allDatas=res
	        		 			 		that.setPaginations()
        		 			 }else{
        		 			 		that.$Message.error('暂无数据！')
        		 			 		that.allDatas=[]
	        		 			 	that.setPaginations()
        		 			 }
        		 			 
        		 		})
					        		 
	        	}else{
	        		return
	        	}
	        })
      },
      //设置分页开始
      setPaginations(){
      			this.paginations.pageCurrent=1
      			this.paginations.pageNum=this.allDatas.length
      			this.tableDatas = this.allDatas.filter((item,i)=>{
      				return i<this.paginations.pageSize
      			})
      			
      },
      handleSizeChange(size){
      	this.paginations.pageSize=size
      	this.tableDatas=this.allDatas.filter((item,i)=>{
      		return i<size
      	})
      },
      handleCurrentChange(page){
      	//从第几条开始
      	let startnum=this.paginations.pageSize*(page-1)
      	//遍历所有大于5的数据
      	let table = this.allDatas.filter((item,i)=>{
      		return i >= startnum
      	})
      	//设置默认分组数据
      	this.tableDatas=table.filter((item,i)=>{
      		return i<this.paginations.pageSize
      	})
      }
    },
    created () {
      // 获取服务器分组
      this.getServerGroup()
    }
  }
</script>
<style lang="less"  scoped>
 .list-lb{background: #fff;padding: 10px;}
 .demo-form-inline{margin-top:20px;border: 1px solid gainsboro;padding:20px 10px;}
  .table{margin-bottom: 10px;}
</style>

