//日志排行
export const ranklogConfig={
	 	// 日志排行类型
        rankType: [  
          {
            id: 1,
            name: '跨服石英大会排行'
          },
          {
            id: 2,
            name: '跨服石英大会每日排行（0点）'
          },
          {
            id: 3,
            name: '石英大会'
          },
          {
            id: 4,
            name: '对战塔'
          },
          {
            id: 5,
            name: '世界boss个人排行'
          },
          {
            id: 6,
            name: '战力大比拼排名'
          },
          {
            id: 7,
            name: '武道馆排名'
          },
          {
            id: 8,
            name: '公会副本排行'
          },
          {
            id: 9,
            name: '跨服石英大会决赛排行'
          },
          {
            id: 10,
            name: '联盟战排行'
          },
          {
            id: 11,
            name: '联盟战每日积分排行'
          },
          {
            id: 12,
            name: '限时精灵排行'
          },
          {
            id: 13,
            name: '馆主次数排行'
          },
          {
            id: 14,
            name: '道馆占领次数排行'
          }
        ],
       //用户类型
       userTypes:[
   		  {
            id: 1,
            name: '免费用户'
          },
          {
            id: 2,
            name: '付费用户'
          },
          {
            id: 3,
            name: '全部用户'
          }
       ]
}
 
//字符串转时间
export function strTotime(str){
	console.log(str)
	if(str){
		if(str.indexOf('-')){
			var time=str.split('-')
			var t2=time[0]+'/'+time[1]+'/'+time[2]+" "+time[3]+':'+time[4]+':'+time[5]
			return new Date(t2).getTime();
		}else{
			return '';
		}
	}else{
		return '';
	}
		
		
}
//时间转字符串
export function dateFtt(fmt,dates){
				//yyyy-MM-dd hh:mm:ss
	     	  let date=new Date(dates);
			  let o = {   
			    "M+" : date.getMonth()+1,                    
			    "d+" : date.getDate(),                    //日   
			    "h+" : date.getHours(),                   //小时   
			    "m+" : date.getMinutes(),                 //分   
			    "s+" : date.getSeconds(),                 //秒   
			    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
			    "S"  : date.getMilliseconds()             //毫秒   
			  };   
			  if(/(y+)/.test(fmt))
			    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
			  for(var k in o)
			    if(new RegExp("("+ k +")").test(fmt))   
			  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		      return fmt;
}