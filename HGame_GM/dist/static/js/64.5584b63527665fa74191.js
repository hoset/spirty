webpackJsonp([64],{1118:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"ItemChangeLog",components:{},data:function(){var e=this;return{page:{sizeOpts:[10,20,30,40],current:1,pageSize:10},datas:[],columns:[{type:"index",width:60,align:"center"},{title:"日志时间",key:"logDate",minWidth:45,render:function(t,a){return t("span",e.timeChange(a.row.logDate))}},{title:"用户_ID",key:"accountUid"},{title:"玩家pid",key:"pid",minWidth:40},{title:"服务器ID",key:"serverId"},{title:"渠道ID",key:"channelId"},{title:"玩家等级",key:"plvl"},{title:"vip等级",key:"pvip"},{title:"角色名",key:"pname"},{title:"道具ID",key:"itemId"},{title:"变化数量",key:"changeNum"},{title:"当前数量",key:"currentNum"},{title:"动作类型",key:"logType"},{title:"变化途径",key:"logExt"},{title:"action",key:"action"},{title:"desc",key:"desc"}],serverIdItems:void 0,seachParams:{serverIds:[],startDate:void 0,endDate:new Date,accountUid:void 0,pid:void 0,logType:void 0}}},watch:{datas:function(e){this.page.current=1}},methods:{divisionData:function(){return this.datas.slice((this.page.current-1)*this.page.pageSize,this.page.current*this.page.pageSize)},queryItems:function(){var e=this;if(!this.validateSeachParam()){this.apiList4._postj_(window.apiUrl.api_getItemChangeLog,function(e){var t={};for(var a in e)e[a]&&(t[a]="startDate"===a||"endDate"===a?e[a].getTime():e[a]);return t}(this.seachParams),function(e){},function(t){return e.datas=t})}},validateSeachParam:function(){return(this.seachParams.serverIds.length<=0&&this.mesgInfo("serverIds 不能为空"))|(this.seachParams.startDate>this.seachParams.endDate&&this.mesgInfo("开始时间 应该小于（等于）结束时间"))},mesgInfo:function(e){return this.$Message.info({content:e,duration:5}),!0},timeChange:function(e){var t=new Date(e);return t.getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()<10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()<10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())}},mounted:function(){var e=this;this.apiList4._get_(window.apiUrl.api_condition,{},function(e){},function(t){return e.serverIdItems=t})}}},1572:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",{staticStyle:{width:"900px"}},[e._v("\n    服务器ID：\n    "),a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择服务器id",transfer:"",multiple:""},model:{value:e.seachParams.serverIds,callback:function(t){e.$set(e.seachParams,"serverIds",t)},expression:"seachParams.serverIds"}},e._l(e.serverIdItems,function(t){return a("Option",{key:t.serverId,attrs:{value:t.serverId}},[e._v(e._s(t.serverName))])}),1),e._v("\n    开始时间：\n    "),a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"date",placeholder:"起始时间"},model:{value:e.seachParams.startDate,callback:function(t){e.$set(e.seachParams,"startDate",t)},expression:"seachParams.startDate"}}),e._v("\n    结束时间：\n    "),a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"date",placeholder:"结束时间"},model:{value:e.seachParams.endDate,callback:function(t){e.$set(e.seachParams,"endDate",t)},expression:"seachParams.endDate"}}),a("br"),e._v("\n    玩家_ID：\n    "),a("Input",{staticStyle:{width:"160px"},attrs:{placeholder:"pid"},model:{value:e.seachParams.pid,callback:function(t){e.$set(e.seachParams,"pid",t)},expression:"seachParams.pid"}}),e._v("\n    用户_UID：\n    "),a("Input",{staticStyle:{width:"160px"},attrs:{placeholder:"accountUid"},model:{value:e.seachParams.accountUid,callback:function(t){e.$set(e.seachParams,"accountUid",t)},expression:"seachParams.accountUid"}}),e._v("\n    动作类型：\n    "),a("Input",{staticStyle:{width:"160px"},attrs:{placeholder:"log_type"},model:{value:e.seachParams.logType,callback:function(t){e.$set(e.seachParams,"logType",t)},expression:"seachParams.logType"}}),e._v(" "),a("Button",{attrs:{icon:"ios-search"},on:{click:function(t){e.queryItems()}}},[e._v("查询")])],1),e._v(" "),a("Table",{attrs:{columns:e.columns,height:"800",data:e.divisionData(),"show-header":""}},[a("h1",{attrs:{slot:"header"},slot:"header"},[e._v("道具使用日志")]),e._v(" "),a("Page",{attrs:{slot:"footer",total:e.datas.length,"show-total":"",size:"small",current:e.page.current,"page-size-opts":e.page.sizeOpts,page_size:e.page.pageSize,"show-elevator":"","show-sizer":""},on:{"on-change":function(t){return e.page.current=t},"on-page-size-change":function(t){return e.page.pageSize=t}},slot:"footer"})],1)],1)},staticRenderFns:[]}},839:function(e,t,a){var s=a(54)(a(1118),a(1572),null,null,null);e.exports=s.exports}});