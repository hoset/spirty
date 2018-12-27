<template>
  <div class="demo-split">
    <div mode="vertical">
      <div slot="top" class="demo-split-pane">
        <h2>充值排行</h2>
        <Table border :loading="loading" :columns="ranking_top" height="400" :data="itemPage.item">
          <h3 slot="header"  style="width: 1400px">服务器id：
          <Select placeholder="选择服务器id" multiple v-model="searchItem.serverIds" style="width:200px">
            <Option v-for="item in serverIdItem" :value="item.serverId" :key="item.serverId">{{ item.serverName }}</Option>
          </Select>
          开始时间：
      
          <DatePicker type="date" confirm placeholder="Select date" v-model="searchItem.startDate" style="width: 200px"></DatePicker>
        
          结束时间：
          
         <DatePicker type="date" confirm placeholder="Select date" v-model="searchItem.endDate" style="width: 200px"></DatePicker>
        <Button icon="ios-search" v-on:click="queryItem()">查询</Button>
        </h3>
          <div slot="footer">

            <Page :total="ranking_item.length" :page-size-opts="itemPage['page-size-opts']" :page-size="itemPage['page-size']" v-on:on-change="itemPage.page" v-on:on-page-size-change="itemPage.size" show-sizer show-total :current="itemPage.current" size="small" show-elevator />

          </div>
        </Table>
      </div>
      <div slot="trigger" style="height: 30px"></div>
      <div slot="bottom" class="demo-split-pane">
        <h2>充值区间</h2>
        <Table border :columns="ranking_down" :data="ranking_count">
          <h3 slot="header" style="width: 1400px">服务器id：
          <Select placeholder="选择服务器id" :multiple="true" v-model="searchCount.serverIds" style="width:10%">
            <Option v-for="item in serverIdItem" :value="item.serverId" :key="item.serverId">{{ item.serverName }}</Option>
          </Select>
          充值区间：
          0--
          <Input v-model="searchCount.position[0]" placeholder="数字.." style="width: 50px" />
          --
          <Input v-model="searchCount.position[1]" placeholder="数字.." style="width: 50px" />
          --
          <Input v-model="searchCount.position[2]" placeholder="数字.." style="width: 50px" />
          开始时间：
         
          <DatePicker type="date" v-model="searchCount.startDate" confirm placeholder="Select date" style="width: 10%"></DatePicker>
        
          结束时间：
          
         <DatePicker type="date" v-model="searchCount.endDate" confirm placeholder="Select date" style="width: 10%"></DatePicker>
        <Button icon="ios-search" v-on:click="queryCount()">查询</Button>
        </h3>
          <!--  <div slot="footer">
            <Page :total="ranking_count.length" :page-size-opts="countPage['page-size-opts']" :page-size="countPage['page-size']" v-on:on-change="countPage.page" show-sizer show-total :current="countPage.current" size="small" show-elevator />
          </div> -->
        </Table>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'rechargeRanking',
  components: {

  },
  data() {
    return {
      ranking_top: [{
          title: "玩家ID",
          key: "pid"
        },
        {
          title: "渠道ID",
          key: "channelId"
        },
        {
          title: "服务器id",
          key: "serverId"
        },
        {
          title: "总充值",
          key: "money"
        },
        {
          title: "最大等级",
          key: "maxLevel"
        },
        {
          title: "最后充值时间",
          key: "lastRecharge",
          render: (h, params) => {

            return h("span", this.timeChange(params.row.lastRecharge));
          }
        },
        {
          title: "最后登录时间",
          key: "lastLogin",
          render: (h, params) => {

            return h("span", this.timeChange(params.row.lastLogin));
          }
        },
        {
          title: "排名",
          key: "sort"
        }
      ],
      ranking_down: [{
          title: "充值区间",
          key: "step"
        },
        {
          title: "充值人数",
          key: "totalPre"
        },
        {
          title: "充值金额",
          key: "totalRecharge"
        },
        {
          title: "总充值",
          key: "totalMoney"
        },
        {
          title: "充值占比",
          key: "proportion"
        }
      ],
      loading: false,
      ranking_item: [],
      ranking_count: [],
      searchItem: {
        serverIds: [],
        startDate: undefined,
        endDate: undefined
      },
      searchCount: {
        serverIds: [],
        startDate: undefined,
        endDate: undefined,
        position: [99, 199, 299]
      },
      serverIdItem: [],
      itemPage: {
        current: 1,
        'page-size': 10,
        'page-size-opts': [10, 20],
        item: [],
        page: (e) => {
         
          this.itemPage.current = e;
          let index = (e - 1) * this.itemPage['page-size'];
          this.itemPage.item = this.ranking_item.slice(index, index + this.itemPage['page-size'] + 1);
          console.log(this.itemPage.item);
        },
        size:(e) => {
          
          this.itemPage['page-size'] = e;
          this.itemPage.page(this.itemPage.current)
        }
      }
      /*,
            countPage:{
               current: 1,
              'page-size': 10,
              'page-size-opts': [10, 20],
              item: [],
              page: (e) => {
                let index = (e - 1) * this.countPage['page-size'];
                this.itemPage.item = this.ranking_count.slice(index, index + this.countPage['page-size'] + 1);
                console.log(this.countPage.item);
              }
            }*/
    }
  },
  methods: {
    queryCount() {
      console.log(this.searchCount)
      this.apiList4._postj_(window.apiUrl.api_getRankingCount, this.searchCount, (e) => console.log(e), (e) => {
        console.log(e);
        this.ranking_count = e;
      });
    },
    queryItem() {
      this.loading = true
      this.itemPage.current=1;
        this.apiList4._postj_(window.apiUrl.api_getRankingItem, this.searchItem, (e) => { console.log(e);
          this.loading = false }, (e) => {
          this.ranking_item = e;
          console.log(this.itemPage)
          this.itemPage.page(1);
          this.loading = false;
        });
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
    this.apiList4._get_(window.apiUrl.api_condition, {}, (e) => console.log(e), (e) => this.serverIdItem = e, this.serverIdCount);
  }

}

</script>
