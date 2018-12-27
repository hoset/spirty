<!--活动 -> 配置-->
<template>
  <div class="list-lb">
  	<h3>小时数据</h3>
			<el-form :inline="true" :model="formData" class="demo-form-inline"  ref="form" :rules="rules">
				  <el-form-item label="选择服务器/渠道/子渠道" prop="channelId">
				  		<el-cascader
				  			  expand-trigger="hover"
							    :options="channelIds"
							    v-model="channelId"
							    @change="handleChange" style="width: 350px;margin-right: 20px;">
						  </el-cascader>
				  </el-form-item>
				  <el-form-item label="查询时间" prop='startTime'>
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
				  <el-form-item v-if="allDatas.length > 0">
				    	<el-button type="primary" @click="downloading()"><i class="el-icon-download"></i>导出exec表</el-button>
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
					      prop="logDate"
					      label="日期"
					      align='center'
					      :formatter="formatterTime"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="hour"
					      label="时间（小时）"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="createRole"
					      label="创建量"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="activeNum"
					      label="活跃量"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="totalMoney"
					      label="流水量"
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
    name: 'rankLog',
    data () {
      return {
      		formData:{
      			 serverId:'',
      			 channelId:'',
      			 channelAppId:'',
      			 startTime:'',
      			 endTime:''
      		},
      		channelId:[],
      		channelIds:[],
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
      		props: {
		          value: 'value',
		          label: 'label',
		          children: 'children'
		       },
      		rules: {
		          startTime: [
		            { required: true, message: '请选择时间', trigger: 'blur' }
		          ],
		          channelId: [
		            { required: true, message: '请选择子渠道', trigger: 'change' }
		          ]
		          
		          
	        },
      }
    },
     components: {
    },
    methods: {
    	handleChange(value) {
    		this.formData.serverId=value[0]
    		this.formData.channelId=value[1]
    		this.formData.channelAppId=value[2]
        console.log(value);
     },
      // 获取服务器分组
      getServerGroup () {
        this.apiList4._get_(window.apiUrl.api_condition, {}, (err)=> {console.log(err)}, (res)=> {
//      	console.log(res)
        	this.serverDatas = res
					var arr2=[]
         	for(var w=0;w<res.length;w++){arr2.push(res[w])}	
	          var arr=[]
						for(var i=0;i<arr2.length;i++){
							arr.push({value:arr2[i].serverId,label:arr2[i].serverName,children:[]})
							for(var j=0;j<arr2[i].channelIds.length;j++){
								arr[i].children.push({value:arr2[i].channelIds[j].channelId,label:arr2[i].channelIds[j].channelName,children:[]})
								for(var k=0;k<arr2[i].channelIds[j].channelAppIds.length;k++){
									arr[i].children[j].children.push({value:arr2[i].channelIds[j].channelAppIds[k].channelAppId,label:arr2[i].channelIds[j].channelAppIds[k].channelAppName})
								}
							}
						}
						
	          this.channelIds = arr
	          
	          
	          
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
        		 		channelId:this.formData.channelId,
        		 		channelAppId:this.formData.channelAppId,
        		 		startTime:this.formData.startTime?this.formData.startTime[0]:'',
        		 		endTime:this.formData.startTime?this.formData.startTime[1]:''
        		 	}
        		 	console.log(params)
        		 		this.apiList4._postj_(window.apiUrl.api_querynewsletterhourdata,params,function (err) {
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
      downloading(){
      	var params={
        		 		serverId:this.formData.serverId,
        		 		channelId:this.formData.channelId,
        		 		channelAppId:this.formData.channelAppId,
        		 		startTime:this.formData.startTime?this.formData.startTime[0]:'',
        		 		endTime:this.formData.startTime?this.formData.startTime[1]:'',
        		 	}
      	{
        }
      	var that=this
      	this.apiList4._postj_(window.apiUrl.api_createfile,params,(err)=> {
        		 			console.log('失败')
        		 			that.$Message.error('下载失败')
        		 		},(res)=>{
        		 			console.log(res)
        		 			console.log('成功')
        		 			let params={
        		 				fileName:res.fileName
        		 			}
			            let link = document.createElement('a')
			            link.href = window.config.dev.baseServerUrl+"/game_boss_schudler/newsletterhourdatacontroller/download?fileName="+res.fileName
			            link.click()
        		 			
        		 			
        		 			
        		 			
        		 			
        		 			
//      		 			  let link = document.createElement('a')
//				            link.href = window.apiUrl.api_hourdataDownload+"?fileName="+res.fileName
				            //配置下载的文件名
//				            link.download = fileNames[scheduleType] + '_' + response.headers.datestr + '.xls'
//				            link.click()
        		 			
//      		 			window.location.href=window.apiUrl.api_hourdataDownload+"?fileName="+res.fileName
//      		 			this.apiList4._get_(window.apiUrl.api_hourdataDownload,params,(err)=> {
//      		 				console.log(err)
//      		 				console.log('失败')
//      		 				window.location.href=window.URL.createObjectURL(new Blob([err], { type:'application/vnd.ms-excel' }))
//      		 			},(res)=>{
//      		 				console.log(res)
//      		 				console.log('成功')
//      		 			})
        		 			
//      		 			 if(res){
//	        		 			 		console.log(res)
//	        		 			 		window.location.href=window.URL.createObjectURL(new Blob([res], { type:'application/vnd.ms-excel' }))
//      		 			 }else{
//      		 			 		that.$Message.error('暂无数据！')
//      		 			 		that.allDatas=[]
//	        		 			 	that.setPaginations()
//      		 			 }
        		 			 
        		 		})
      	
      },
//    
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
      },
      
      //价格
      formatterTime(obj){
      	if(!obj.logDate){
      		return ''
      	}
      	return dateFtt("yyyy-MM-dd hh:mm:ss",obj.logDate)
      },
      //渗透率
      formatterActivePayProp(obj){
      	return obj.activePayProp + "%"
      },//金额占比
      formatterMoney(obj){
      	return obj.newRechargeProp + "%"
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

