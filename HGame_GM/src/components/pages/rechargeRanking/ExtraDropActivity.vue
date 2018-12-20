<template>
  <div>
    <h3 style="width: 900px">
    服务器ID：
    <Select placeholder="选择服务器id" transfer  v-model="seachParams.serverName" style="width:200px">
      <Option v-for="item in serverIdItems" :value="item['id']" :key="item['id']">{{ item['text'] }}</Option>
    </Select>
    活动ID：
    <Input v-model="seachParams['id']" style="width: 160px" placeholder="log_type"></Input>
    <Button icon="ios-search" v-on:click="queryItems()">查询</Button>
    <Button icon="ios-search" v-on:click="editModal('新增额外掉落活动')">新增</Button><br/>
    重载类型：
    <Select placeholder="选择重载类型..." transfer  v-model="seachParams['type']" style="width:200px">
      <Option v-for="item in reloadType" :value="item[0]" :key="item[0]">{{ item[1] }}</Option>
    </Select>
    <Button icon="ios-search" v-on:click="reloadActivity">重载</Button>
</h3>
    <Table :columns="columns" height="800" :data="divisionData()" show-header>
      <h1 slot="header">额外掉落活动</h1>
      <Page :total="datas.length" show-total v-on:on-change="(p) => page.current = p" v-on:on-page-size-change="(p) => page.pageSize = p" slot="footer" size="small" :current="page.current" :page-size-opts="page.sizeOpts" :page_size="page.pageSize" show-elevator show-sizer />
    </Table>
    <Modal v-model="tableModal.open" loading v-on:on-ok="updateOrCreate" :mask-closable="false" :width="890">
      <h2 slot="header" style="color: red">{{tableModal['title']}}</h2>
      <Form :model="formData" label-position="left" inline :label-width="100">
        <span v-if="!tableModal.sn">
        <FormItem >
          服务器ID：
          <Select placeholder="选择服务器id" transfer v-model="formData.serverName" style="width:160px">
            <Option v-for="item in serverIdItems" :value="item['id']" :key="item['id']">{{ item['text'] }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          活动的ID：<Input  v-model="formData['id']" placeholder="id..." style="width: auto" />
          活动名称：<Input v-model="formData['name']" placeholder="name..." style="width: auto" />
        </FormItem>
        </span>
        <span v-if="tableModal.sn">
           <FormItem >
             服务器ID：
          <Select placeholder="选择服务器id" transfer v-model="formData.serverName" style="width:160px">
            <Option v-for="item in serverIdItems" :value="item['id']" :key="item['id']">{{ item['text'] }}</Option>
          </Select>
              活动名称：<Input v-model="formData['name']" placeholder="name..." style="width: auto" />
           </FormItem>
        </span>
        <FormItem>
          活动备注： <Input v-model="formData['remark']" placeholder="remark..." style="width: auto" />
          时间类型：
          <Select placeholder="open..." transfer v-model="formData['timeType']" style="width:160px">
            <Option v-for="item in timeType" :value="item[0]" :key="item[0]">{{ item[1] }}</Option>
          </Select>

        </FormItem>
        <FormItem>
          活动时间： <Input v-model="formData['activeTime']" placeholder="activeTime..." style="width: auto" />
          开服时间：<Input v-model="formData['openServerTime']" placeholder="openServerTime..." style="width: auto" />
        </FormItem>
        <FormItem>
          活动权重： <Input v-model="formData['weight']" placeholder="weight..." style="width: auto" />
          图片URL：<Input v-model="formData['imgUrl']" placeholder="imgUrl..." style="width: auto" />
        </FormItem>
        <FormItem>
          活动明细： <Input v-model="formData['itemStr']" placeholder="itemStr..." style="width: auto" />
          活动INFO：<Input v-model="formData['info']" placeholder="info..." style="width: auto" />
        </FormItem>
        <FormItem>
          活动jumpId： <Input v-model="formData['jumpId']" placeholder="jumpId..." style="width: auto" />
          活动状态：
          <Select placeholder="open..." transfer v-model="formData['open']" style="width:160px">
            <Option v-for="item in status" :value="item[0]" :key="item[0]">{{ item[1] }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'ExtraDropActivity',
  components: {

  },
  data() {
    return {
      page: {
        sizeOpts: [10, 20, 30, 40],
        current: 1,
        pageSize: 10
      },
      tableModal: {
        open: false,
        title: "dsfaf",
        sn: false
      },
      formData: {

      },
      datas: [],

      columns: [{
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: "活动ID",
          key: "id"
        },
        {
          title: "活动名称",
          key: "name"
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "时间类型",
          key: "timeType",
           render: (h, params) => {

          var statusMap = new Map(this.timeType);

            return h("span", statusMap.get(params.row.timeType))
          }
        },
        {
          title: "活动时间",
          key: "activeTime",
          ellipsis: true,
          minWidth: 45,
          render: (h, params) => {
            var value = params.row.activeTime.split(",");

            return h('Tooltip', {
              props: { placement: 'right-end' }
            }, [
              params.row.itemStr,
              h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, this.timeChange_(value))
            ])

          }
        },
        {
          title: "开服时间",
          key: "openServerTime"
        },
        {
          title: "权重",
          key: "weight"
        },
        {
          title: "图片URL",
          key: "imgUrl",
          render: (h, params) => {
            return h('Tooltip', {
              props: { placement: 'right-end', theme: "light" }
            }, [
              params.row.imgUrl,
              h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.imgUrl)
            ])

          }
        },
        {
          title: "明细",
          key: "itemStr",
          ellipsis: true,
          tooltip: true,
          render: (h, params) => {
            return h('Tooltip', {
              props: { placement: 'right-end', theme: "light" }
            }, [
              params.row.itemStr,
              h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.itemStr)
            ])

          }
        },
        {
          title: "info",
          key: "info"
        },
        {
          title: "jumpId",
          key: "jumpId"
        },
        {
          title: "状态",
          key: "open",
          render: (h, params) => {

          var statusMap = new Map(this.status);

            return h("span", statusMap.get(params.row.open))
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => this.editModal('修改ID为' + params.row.id + "的活动", params.row)
                }
              }, '修改')/*,
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => this.editModal('ID为' + params.row.id + "的活动详情", params.row)

                }
              }, '详情')*/
            ]);
          }
        }
      ],
      serverIdItems: undefined,
      reloadType: [
        [1, "清空当前活动"],
        [2, "活动数据归零"]
      ],
      /*open  1启用0禁用*/
      status: [
        [1, "开启"],
        [2, "禁用"]
      ],
      /*1:开服时间, 2:自然时间*/
      timeType:[
        [1,"开服时间"],
        [2,"自然时间"]
      ],
      seachParams: {
        serverName: undefined,
        id: undefined,
        type: undefined
      }
    }

  },
  watch: {
    datas: function(v) {
      this.page.current = 1;
    }
  },
  methods: {
    reloadActivity() {
      if (this.validateSeachParam()) return;
      this.apiList4._get_(window.apiUrl.api_reloadExtraDropActivity, this.seachParams, (e) => this.$Message.error("操作失败：" + e), (e) => {
        this.$Message.success("操作成功");
      });
    },
    updateOrCreate() {
      this.apiList4._postj_(window.apiUrl.api_addOrUpdateExtraDropActivity, this.formData, (e) => this.$Message.error("操作失败：" + e), (e) => {
        alert(e["code"])
        if(e["code"] != 0)
          this.$Message.success("操作失败");
        else
        this.$Message.success("操作成功");
        this.tableModal.open = false;
      });
    },
    editModal(title, params = {}) {
      this.tableModal["title"] = title;
      this.formData = params;
      this.formData.serverName = this.seachParams.serverName;
      this.tableModal.open = true;

      params["id"] ? this.tableModal.sn = false : this.tableModal.sn = true;

    },

    divisionData() {

      return this.datas.slice((this.page.current - 1) * this.page.pageSize, this.page.current * this.page.pageSize)

    },
    queryItems() {
      // alert(this.validateSeachParam())
      console.log(this.statusArr);

      if (this.validateSeachParam()) return;

      const check = (o) => {
        const params = {};
        for (let i in o) {
          o[i] && (i === "startDate" || i === "endDate" ? params[i] = o[i].getTime() : params[i] = o[i]);
        }
        return params;
      }


      this.apiList4._get_(window.apiUrl.api_ExtraDropActivity, check(this.seachParams), (e) => { this.mesgInfo("查询失败");this.datas = [];}, (e) => this.datas = e);
    },
    validateSeachParam() {
      return this.seachParams.serverName ? false : this.mesgInfo("serverIds 不能为空")
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
      let m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ':'
      let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    timeChange_(timestamps) {
      let arr = new Array();
      let tempArr = null;
      for (let i = 0; i < timestamps.length; i++) {

        if (i % 2 === 0) {
          tempArr = new Array();
          arr.push(tempArr);
        }
        tempArr.push(Number.parseInt(timestamps[i]));
      }

      return arr.map((x) => x.map(this.timeChange).join(" 至 ")).join("<br/>");
    }
  },
  mounted: function() {
    this.serverIdItems = this.apiList3.api_spirityluckcontroller_server();
  }
}

</script>
