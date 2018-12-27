<!--活动 -> 配置-->
<template>
  <div class="list-lb">
  	<h3>日报查询</h3>
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
				</el-form>
				<!--表格-->
				<div class="table">
					<el-table
						  ref="multipleTable"
					    :data="tableDatas"
					    show-summary
					    border
					    :summary-method="getSummaries"
					    style="width: 100%;margin-bottom: 20px;">
					    <el-table-column
					      prop="logDate"
					      label="日期"
					      align='center'
					      width="180"
					      :formatter="formatterTime"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="registNum"
					      label="注册数量"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="activeNum"
					      label="创角数量"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="roleNum"
					      label="活跃量"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="imeiProp"
					      label="设备创角率"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="rechargeNum"
					      label="付费人数"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="newRechargeNum"
					      label="流水"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="arpu"
					      label="arpu"
					      align='center'
					       :formatter="formatterArpu"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="arppu"
					      label="arppu"
					      align='center'
					      :formatter="formatterArppu"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="activePayProp"
					      label="付费渗透率"
					      align='center'
					      :formatter="formatterActivePayProp"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="newRechargeMoney"
					      label="新增充值金额人数"
					      align='center'
					      >
					    </el-table-column>
					    <el-table-column
					      prop="newRechargeProp"
					      label="新增金额占比"
					      align='center'
					       :formatter="formatterMoney"
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
        		 		this.apiList4._postj_(window.apiUrl.api_querynewsletterdatereport,params,function (err) {
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
      getSummaries(param){
      	const { columns, data } = param;
        const sums = [];
        
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(index ==9 || index == 11){
            	sums[index] =Math.floor(sums[index] * 100) / 100
//          	Math.floor(sums[index] * 100) / 100 += " %"
            	sums[index] += ' %';
            }else if(index ==7 || index ==8){
            	sums[index] =Math.floor(sums[index] * 100) / 100
            }
          } else {
            sums[index] = 'N/A';
          }
          
          
        })
        return sums;
      },
      //价格
      formatterTime(obj){
      	if(!obj.logDate){
      		return ''
      	}
      	return dateFtt("yyyy-MM-dd hh:mm:ss",obj.logDate)
      },
      formatterArpu(obj){
      	return Math.floor(obj.arpu * 100) / 100
      },
      formatterArppu(obj){
      	return Math.floor(obj.arppu * 100) / 100
      },
      //渗透率
      formatterActivePayProp(obj){
      	let v=Math.floor(obj.activePayProp * 100) / 100
      	return v + " %"
      },//金额占比
      formatterMoney(obj){
      	return obj.newRechargeProp + " %"
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

