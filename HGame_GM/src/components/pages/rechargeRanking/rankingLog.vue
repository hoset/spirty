<!--活动 -> 配置-->
<template>
  <div class="list-lb">
  	<h3>排行日志查询</h3>
			<el-form :inline="true" :model="formData" class="demo-form-inline"  ref="form" :rules="rules">
				<el-form-item label="">
				    <el-radio v-model="queryTypes" label="1">根据类型查询</el-radio>
  					<el-radio v-model="queryTypes" label="2">根据玩家ID查询</el-radio>
				  </el-form-item>
				 	<br />
					<el-form-item label="选择数据库服务器" prop="serverId">
				    <el-select v-model="formData.serverId" placeholder="请选择数据库服务器">
					      <el-option :label="item.serverName" :value="item.serverId" v-for="(item,i) in serverDatas" :key='i'></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="选择排行类型" prop="type" v-if="queryTypes == 1">
				    <el-select v-model="formData.type" placeholder="选择排行类型">
					      <el-option :label="item.id+':'+item.name" :value="item.id" v-for="(item,i) in ranklogConfig.rankType" :key='i'></el-option>
				    </el-select>
				  </el-form-item>
				  
				  <el-form-item label="玩家ID" prop='playerId' v-if="queryTypes == 2">
				    	<el-input v-model="formData.playerId" placeholder="请输入玩家id"></el-input>
				  </el-form-item>
				  
				  <el-form-item label="选择时间" >
				    	<el-date-picker
						      v-model="formData.startTime"
						      type="daterange"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      format="yyyy 年 MM 月 dd 日"
						      value-format="timestamp"
						      >
    					</el-date-picker>
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
					      prop="rankType"
					      label="排名类型"
					      sortable
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="serverId"
					      label="服务器ID"
					      sortable
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="name"
					      label="角色名字"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="playerId"
					      label="玩家ID"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="rank"
					      label="排名"
					      sortable
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="session"
					      label="轮数"
					      sortable
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="time"
					      label="日志时间"
					      align='center'
					      sortable
					      :formatter="formatterTime"
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
    name: 'rankLog',
    data () {
      return {
      		formData:{
      			 serverId:'',
      			 type:'',
      			 playerId:'',
      			 startTime:'',
      			 endTime:''
      		},
      		queryTypes:'1',
      		ranklogConfig:ranklogConfig,
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
      		rules: {
		          serverId: [
		            { required: true, message: '请选择服务器ID', trigger: 'change' }
		          ],
		          type: [
		            { required: true, message: '请选择状态', trigger: 'change' }
		          ],
		          playerId: [
		            { required: true, message: '请输入玩家id', trigger: 'blur' }
		          ],
		          startTime: [
		            { required: true, message: '请选择时间', trigger: 'blur' }
		          ]
	        },
      }
    },
     components: {
    },
    methods: {
      // 获取服务器分组
      getServerGroup () {
        this.apiList4._get_(window.apiUrl.api_condition, {}, (err)=> {console.log(err)}, (res)=> {
          this.serverDatas = res
        }, false)
      },
      //点击查询
      logSubmit(form) {
	        this.$refs[form].validate((valid) => {
	        	var that=this
	        	if(valid){
					   	//根据ID查
        		 	var params={
        		 		serverId:this.formData.serverId,
        		 		startTime:this.formData.startTime?this.formData.startTime[0]:'',
        		 		endTime:this.formData.startTime?this.formData.startTime[1]:''
        		 	}
        		 	if(this.queryTypes == 1){
        		 		params.type=this.formData.type
        		 	}else{
        		 		params.playerId=this.formData.playerId
        		 	}
        		 	console.log(params)
        		 	console.log(window.apiUrl.api_queryactivityranking)
//      		 	return
        		 		this.apiList4._postj_(window.apiUrl.api_queryactivityranking,params,function (err) {
        		 			console.log(err)
        		 			that.$Message.error(err.statusText)
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
      //设置分页
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
      },
      //价格
      formatterTime(obj){
      	return dateFtt("yyyy-MM-dd hh:mm:ss",obj.time)
      }
    },
    filters:{
      	filtersStateColor(v){
      		switch (v){
      			case 0:
      				return 'blue'
      				break;
      			case 1:
      				return 'yellow'
      				break;
      			case 2:
      				return 'red'
      				break;
      			case 4:
      				return 'green'
      				break;
      		}
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

