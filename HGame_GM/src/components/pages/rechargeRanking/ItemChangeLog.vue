<template>
  <div>
    <h3 style="width: 900px">
    服务器ID：
    <Select placeholder="选择服务器id" transfer multiple v-model="seachParams.serverIds" style="width:200px">
      <Option v-for="item in serverIdItems" :value="item.serverId" :key="item.serverId">{{ item.serverName }}</Option>
    </Select>
    开始时间：
    <DatePicker type="date" placeholder="起始时间" v-model="seachParams.startDate" style="width: 200px"></DatePicker>
    结束时间：
    <DatePicker type="date"  placeholder="结束时间" v-model="seachParams.endDate" style="width: 200px"></DatePicker><br/>
    玩家_ID：
    <Input v-model="seachParams.pid" style="width: 160px" placeholder="pid"></Input>
    用户_UID：
    <Input v-model="seachParams.accountUid" style="width: 160px" placeholder="accountUid"></Input>
    动作类型：
    <Input v-model="seachParams.logType" style="width: 160px" placeholder="log_type"></Input>
    <Button icon="ios-search" v-on:click="queryItems()">查询</Button>
</h3>
    <Table :columns="columns" height="800" :data="divisionData()" show-header>
      <h1 slot="header">道具使用日志</h1>
      <Page :total="datas.length" show-total v-on:on-change="(p) => page.current = p" v-on:on-page-size-change="(p) => page.pageSize = p" slot="footer" size="small" :current="page.current" :page-size-opts="page.sizeOpts" :page_size="page.pageSize" show-elevator show-sizer />
    </Table>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'ItemChangeLog',
  components: {

  },
  data() {
    return {
      page: {
        sizeOpts: [10, 20, 30, 40],
        current: 1,
        pageSize: 10
      },
      datas: [],
     
      columns: [{
          type: 'index',
          width: 60,
          align: 'center'
        }, {
          title: '日志时间',
          key: 'logDate',
          minWidth: 45,
          render: (h, params) => {
            return h("span", this.timeChange(params.row.logDate))
          }
        },
        {
          title: '用户_ID',
          key: 'accountUid'
        },
        {
          title: '玩家pid',
          key: 'pid',
          minWidth: 40,
        }, {
          title: "服务器ID",
          key: 'serverId'
        }, {
          title: '渠道ID',
          key: 'channelId'
        }, {
          title: '玩家等级',
          key: 'plvl'
        },{
          title:"vip等级",
          key:"pvip"
        }, {
          title: '角色名',
          key: 'pname'
          
        }, {
          title: '道具ID',
          key: 'itemId'
        }, {
          title: '变化数量',
          key: 'changeNum'
        }, {
          title: '当前数量',
          key: 'currentNum'
        }, {
          title: '动作类型',
          key: 'logType'
        }, {
          title: '变化途径',
          key: 'logExt'
        },{
          title:"action",
          key:"action"
        },{
          title:"desc",
          key:"desc"
        } /*{
          title: '变化途径',
          key: 'orderId',
          minWidth: 40,*/
          /*,
                   
                    render: (h, params) => {
                      return h('Tooltip', {
                        props: { placement: 'top' }
                      }, [
                        params.row.orderId,
                        h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } },params.row.orderId)
                      ])

                    }*/
        /*}*/
      ],
      serverIdItems: undefined,
      seachParams: {
        serverIds: [],
        startDate: undefined,
        endDate: new Date(),
        accountUid: undefined,
        pid: undefined,
        logType: undefined
      }
    }

  },
  watch: {
    datas: function(v) {
      this.page.current = 1;
    }
  },
  methods: {

    divisionData() {

      return this.datas.slice((this.page.current - 1) * this.page.pageSize, this.page.current * this.page.pageSize )

    },
    queryItems() {
      if (this.validateSeachParam()) return;
      let check = (o) => {
        const params = {};
        for (let i in o) {
          o[i] && (i === "startDate" || i === "endDate" ? params[i] = o[i].getTime() : params[i] = o[i]);
        }
        return params;
      }


      this.apiList4._postj_(window.apiUrl.api_getItemChangeLog, check(this.seachParams), (e) => console.log(e), (e) => this.datas = e);
    },
    validateSeachParam() {
      return (this.seachParams.serverIds.length <= 0 && this.mesgInfo("serverIds 不能为空")) | (this.seachParams.startDate > this.seachParams.endDate && this.mesgInfo("开始时间 应该小于（等于）结束时间"));

    },
    mesgInfo(mesg) {
      this.$Message.info({
        content: mesg,
        duration: 5
      });
      return true;
    },
    timeChange(timestamp) {
      let date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + ' '
      let h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':'
      let m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes() )+ ':'
      let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    }
  },
  mounted: function() {
    // alert(1)
    this.apiList4._get_(window.apiUrl.api_condition, {}, (e) => console.log(e), (e) => this.serverIdItems = e);
  }
}

</script>
