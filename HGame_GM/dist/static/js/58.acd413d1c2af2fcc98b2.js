webpackJsonp([58],{1017:function(e,a,t){"use strict";t.d(a,"a",function(){return n}),a.b=function(e,a){var t=new Date(a),n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));for(var r in n)new RegExp("("+r+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?n[r]:("00"+n[r]).substr((""+n[r]).length)));return e};var n={rankType:[{id:1,name:"跨服石英大会排行"},{id:2,name:"跨服石英大会每日排行（0点）"},{id:3,name:"石英大会"},{id:4,name:"对战塔"},{id:5,name:"世界boss个人排行"},{id:6,name:"战力大比拼排名"},{id:7,name:"武道馆排名"},{id:8,name:"公会副本排行"},{id:9,name:"跨服石英大会决赛排行"},{id:10,name:"联盟战排行"},{id:11,name:"联盟战每日积分排行"},{id:12,name:"限时精灵排行"},{id:13,name:"馆主次数排行"},{id:14,name:"道馆占领次数排行"}],userTypes:[{id:1,name:"免费用户"},{id:2,name:"付费用户"},{id:3,name:"全部用户"}]}},1189:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t(1017);a.default={name:"queryFairy",data:function(){return{formData:{serverId:"",sn:""},paginations:{pageSize:10,pageCurrent:1,pageSizes:[10,20,30,40],pageNum:0,layout:"total, sizes, prev, pager, next, jumper"},serverDatas:[],allDatas:[],tableDatas:[],ranklogConfig:n.a,rules:{serverId:[{required:!0,message:"请选择服务器",trigger:"change"}],userType:[{required:!0,message:"请选择用户类型",trigger:"change"}]}}},methods:{getServerGroup:function(){var e=this;this.apiList4._get_(window.apiUrl.api_condition,{},function(e){},function(a){e.serverDatas=a},!1)},logSubmit:function(e){var a=this;this.$refs[e].validate(function(e){var t=a;e&&a.apiList4._get_(window.apiUrl.api_queryplayerownheros,a.formData,function(e){t.$Message.error("err.statusText"),t.allDatas=[],t.setPaginations()},function(e){e.rows.length>0?(t.allDatas=e.rows,t.setPaginations()):(t.$Message.error("暂无数据！"),t.allDatas=[],t.setPaginations())})})},setPaginations:function(){var e=this;this.paginations.pageCurrent=1,this.paginations.pageNum=this.allDatas.length,this.tableDatas=this.allDatas.filter(function(a,t){return t<e.paginations.pageSize})},handleSizeChange:function(e){this.paginations.pageSize=e,this.tableDatas=this.allDatas.filter(function(a,t){return t<e})},handleCurrentChange:function(e){var a=this,t=this.paginations.pageSize*(e-1),n=this.allDatas.filter(function(e,a){return a>=t});this.tableDatas=n.filter(function(e,t){return t<a.paginations.pageSize})}},created:function(){this.getServerGroup()}}},1274:function(e,a,t){(e.exports=t(880)(!0)).push([e.i,".list-lb[data-v-68c673bb]{background:#fff;padding:10px}.demo-form-inline[data-v-68c673bb]{margin-top:20px;border:1px solid #dcdcdc;padding:20px 10px}.table[data-v-68c673bb]{margin-bottom:10px}","",{version:3,sources:["D:/HGame_GM/spirty/HGame_GM/src/components/pages/info/queryFairy.vue"],names:[],mappings:"AACA,0BACE,gBAAiB,AACjB,YAAc,CACf,AACD,mCACE,gBAAiB,AACjB,yBAA4B,AAC5B,iBAAmB,CACpB,AACD,wBACE,kBAAoB,CACrB",file:"queryFairy.vue",sourcesContent:["\n.list-lb[data-v-68c673bb] {\n  background: #fff;\n  padding: 10px;\n}\n.demo-form-inline[data-v-68c673bb] {\n  margin-top: 20px;\n  border: 1px solid gainsboro;\n  padding: 20px 10px;\n}\n.table[data-v-68c673bb] {\n  margin-bottom: 10px;\n}\n"],sourceRoot:""}])},1592:function(e,a,t){var n=t(1274);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);t(881)("7ec3ebac",n,!0,{})},1667:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"list-lb"},[t("h3",[e._v("精灵查询")]),e._v(" "),t("el-form",{ref:"form",staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formData,rules:e.rules}},[t("el-form-item",{attrs:{label:"选择数据库服务器",prop:"serverId"}},[t("el-select",{attrs:{placeholder:"请选择数据库服务器"},model:{value:e.formData.serverId,callback:function(a){e.$set(e.formData,"serverId",a)},expression:"formData.serverId"}},e._l(e.serverDatas,function(e,a){return t("el-option",{key:a,attrs:{label:e.serverName,value:e.serverId}})}),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"选择用户类型",prop:"sn"}},[t("el-select",{attrs:{placeholder:"选择用户类型"},model:{value:e.formData.sn,callback:function(a){e.$set(e.formData,"sn",a)},expression:"formData.sn"}},e._l(e.ranklogConfig.userTypes,function(e,a){return t("el-option",{key:a,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.logSubmit("form")}}},[e._v("查询")])],1)],1),e._v(" "),t("div",{staticClass:"table"},[t("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:e.tableDatas,border:""}},[t("el-table-column",{attrs:{prop:"heroId",label:"精灵ID",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"heroName",label:"精灵名字",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"num",label:"拥有人数",align:"center"}})],1),e._v(" "),t("el-pagination",{attrs:{"current-page":e.paginations.pageCurrent,"page-sizes":e.paginations.pageSizes,"page-size":e.paginations.pageSize,layout:e.paginations.layout,total:e.paginations.pageNum},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(a){e.$set(e.paginations,"pageCurrent",a)}}})],1)],1)},staticRenderFns:[]}},907:function(e,a,t){var n=t(64)(t(1189),t(1667),function(e){t(1592)},"data-v-68c673bb",null);e.exports=n.exports}});