webpackJsonp([67],{1225:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"rechargeRanking",components:{},data:function(){var e=this;return{ranking_top:[{title:"玩家ID",key:"pid"},{title:"渠道ID",key:"channelId"},{title:"服务器id",key:"serverId"},{title:"总充值",key:"money"},{title:"最大等级",key:"maxLevel"},{title:"最后充值时间",key:"lastRecharge",render:function(t,a){return t("span",e.timeChange(a.row.lastRecharge))}},{title:"最后登录时间",key:"lastLogin",render:function(t,a){return t("span",e.timeChange(a.row.lastLogin))}},{title:"排名",key:"sort"}],ranking_down:[{title:"充值区间",key:"step"},{title:"充值人数",key:"totalPre"},{title:"充值金额",key:"totalRecharge"},{title:"总充值",key:"totalMoney"},{title:"充值占比",key:"proportion"}],loading:!1,ranking_item:[],ranking_count:[],searchItem:{serverIds:[],startDate:void 0,endDate:void 0},searchCount:{serverIds:[],startDate:void 0,endDate:void 0,position:[99,199,299]},serverIdItem:[],itemPage:{current:1,"page-size":10,"page-size-opts":[10,20],item:[],page:function(t){e.itemPage.current=t;var a=(t-1)*e.itemPage["page-size"];e.itemPage.item=e.ranking_item.slice(a,a+e.itemPage["page-size"]+1)},size:function(t){e.itemPage["page-size"]=t,e.itemPage.page(e.itemPage.current)}}}},methods:{queryCount:function(){var e=this;this.apiList4._postj_(window.apiUrl.api_getRankingCount,this.searchCount,function(e){},function(t){e.ranking_count=t})},queryItem:function(){var e=this;this.loading=!0,this.itemPage.current=1,this.apiList4._postj_(window.apiUrl.api_getRankingItem,this.searchItem,function(t){e.loading=!1},function(t){e.ranking_item=t,e.itemPage.page(1),e.loading=!1})},timeChange:function(e){var t=new Date(e);return t.getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()<10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()<10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())}},mounted:function(){var e=this;this.apiList4._get_(window.apiUrl.api_condition,{},function(e){},function(t){return e.serverIdItem=t},this.serverIdCount)}}},1675:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"demo-split"},[a("div",{attrs:{mode:"vertical"}},[a("div",{staticClass:"demo-split-pane",attrs:{slot:"top"},slot:"top"},[a("h2",[e._v("充值排行")]),e._v(" "),a("Table",{attrs:{border:"",loading:e.loading,columns:e.ranking_top,height:"400",data:e.itemPage.item}},[a("h3",{staticStyle:{width:"1400px"},attrs:{slot:"header"},slot:"header"},[e._v("服务器id：\n        "),a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择服务器id",multiple:""},model:{value:e.searchItem.serverIds,callback:function(t){e.$set(e.searchItem,"serverIds",t)},expression:"searchItem.serverIds"}},e._l(e.serverIdItem,function(t){return a("Option",{key:t.serverId,attrs:{value:t.serverId}},[e._v(e._s(t.serverName))])}),1),e._v("\n        开始时间：\n    \n        "),a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"date",confirm:"",placeholder:"Select date"},model:{value:e.searchItem.startDate,callback:function(t){e.$set(e.searchItem,"startDate",t)},expression:"searchItem.startDate"}}),e._v("\n      \n        结束时间：\n        \n       "),a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"date",confirm:"",placeholder:"Select date"},model:{value:e.searchItem.endDate,callback:function(t){e.$set(e.searchItem,"endDate",t)},expression:"searchItem.endDate"}}),e._v(" "),a("Button",{attrs:{icon:"ios-search"},on:{click:function(t){e.queryItem()}}},[e._v("查询")])],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Page",{attrs:{total:e.ranking_item.length,"page-size-opts":e.itemPage["page-size-opts"],"page-size":e.itemPage["page-size"],"show-sizer":"","show-total":"",current:e.itemPage.current,size:"small","show-elevator":""},on:{"on-change":e.itemPage.page,"on-page-size-change":e.itemPage.size}})],1)])],1),e._v(" "),a("div",{staticStyle:{height:"30px"},attrs:{slot:"trigger"},slot:"trigger"}),e._v(" "),a("div",{staticClass:"demo-split-pane",attrs:{slot:"bottom"},slot:"bottom"},[a("h2",[e._v("充值区间")]),e._v(" "),a("Table",{attrs:{border:"",columns:e.ranking_down,data:e.ranking_count}},[a("h3",{staticStyle:{width:"1400px"},attrs:{slot:"header"},slot:"header"},[e._v("服务器id：\n        "),a("Select",{staticStyle:{width:"10%"},attrs:{placeholder:"选择服务器id",multiple:!0},model:{value:e.searchCount.serverIds,callback:function(t){e.$set(e.searchCount,"serverIds",t)},expression:"searchCount.serverIds"}},e._l(e.serverIdItem,function(t){return a("Option",{key:t.serverId,attrs:{value:t.serverId}},[e._v(e._s(t.serverName))])}),1),e._v("\n        充值区间：\n        0--\n        "),a("Input",{staticStyle:{width:"50px"},attrs:{placeholder:"数字.."},model:{value:e.searchCount.position[0],callback:function(t){e.$set(e.searchCount.position,0,t)},expression:"searchCount.position[0]"}}),e._v("\n        --\n        "),a("Input",{staticStyle:{width:"50px"},attrs:{placeholder:"数字.."},model:{value:e.searchCount.position[1],callback:function(t){e.$set(e.searchCount.position,1,t)},expression:"searchCount.position[1]"}}),e._v("\n        --\n        "),a("Input",{staticStyle:{width:"50px"},attrs:{placeholder:"数字.."},model:{value:e.searchCount.position[2],callback:function(t){e.$set(e.searchCount.position,2,t)},expression:"searchCount.position[2]"}}),e._v("\n        开始时间：\n       \n        "),a("DatePicker",{staticStyle:{width:"10%"},attrs:{type:"date",confirm:"",placeholder:"Select date"},model:{value:e.searchCount.startDate,callback:function(t){e.$set(e.searchCount,"startDate",t)},expression:"searchCount.startDate"}}),e._v("\n      \n        结束时间：\n        \n       "),a("DatePicker",{staticStyle:{width:"10%"},attrs:{type:"date",confirm:"",placeholder:"Select date"},model:{value:e.searchCount.endDate,callback:function(t){e.$set(e.searchCount,"endDate",t)},expression:"searchCount.endDate"}}),e._v(" "),a("Button",{attrs:{icon:"ios-search"},on:{click:function(t){e.queryCount()}}},[e._v("查询")])],1)])],1)])])},staticRenderFns:[]}},943:function(e,t,a){var n=a(64)(a(1225),a(1675),null,null,null);e.exports=n.exports}});