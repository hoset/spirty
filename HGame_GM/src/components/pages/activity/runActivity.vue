<template>
  <div>
    <h3 style="width: 900px">
        服务器ID：
        <Select placeholder="选择服务器id" transfer  v-model="seachParams.serverName" style="width:200px">
          <Option v-for="item in serverIdItems" :value="item['id']" :key="item['id']">{{ item['text'] }}</Option>
        </Select>
        活动ID：
        <Input v-model="seachParams['id']" style="width: 160px" placeholder="log_type"></Input>
        <Button icon="ios-search" v-on:click="queryDatas">查询</Button>
        <Button icon="ios-search" v-on:click="openAddTableModal('新增运营活动')">新增</Button>
        <Button icon="ios-search" v-on:click="reloadActivity">重载所有</Button>
    </h3>
    <h3>运营活动..</h3>
    <Table :columns="columns" :height="800" show-header align="center" :data="divisionData()">
      <Page :total="datas.length" show-total v-on:on-change="(p) => page.current = p" v-on:on-page-size-change="(p) => page.pageSize = p" slot="footer" size="small" :current="page.current" :page-size-opts="page.sizeOpts" :page_size="page.pageSize" show-elevator show-sizer />
    </Table>
    <Modal v-model="tableModal.open" v-on:on-ok="updateOrCreate" :mask-closable="false" :width="890">
      <h2 slot="header" style="color: red">{{tableModal['title']}}</h2>
      <Form label-position="left" :model="formData" inline :label-width="100">
        <span v-if="!tableModal.view">
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
        <span v-if="tableModal.view">
           <FormItem >
             服务器ID：
          <Select placeholder="选择服务器id" transfer v-model="formData.serverName" style="width:160px">
            <Option v-for="item in serverIdItems" :value="item['id']" :key="item['id']">{{ item['text'] }}</Option>
          </Select>
              活动模板：
              <Input v-model="template" placeholder="name..." style="width: auto" />
              <Button icon="ios-search" v-on:click="loadTemplate">应用模板</Button>
           </FormItem>
           <FormItem>
              活动名称：<Input v-model="formData['name']" placeholder="name..." style="width: auto" />
           </FormItem>
        </span>
        <FormItem>
          活动备注：<Input v-model="formData['remark']" placeholder="remark..." style="width: auto" />
          界面类型：
          <Select v-model="formData['showType']" style="width:160px">
            <Option v-for="item in showType_" :value="item[0]" :key="item.value">{{ item[1] }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          活动类型：
          <Select v-model="formData['activityType']" style="width:160px">
            <Option v-for="item in activityType_" :value="item[0]" :key="item.value">{{ item[1] }}</Option>
          </Select>
          时间类型：
          <Select v-model="formData['timeType']" style="width:160px">
            <Option v-for="item in timeType_" :value="item[0]" :key="item.value">{{ item[1] }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          活动权重：<Input v-model="formData['weight']" placeholder="weight..." style="width: auto" />
          界面状态：
          <Select v-model="formData['status']" style="width:160px">
            <Option v-for="item in status_" :value="item[0]" :key="item.value">{{ item[1] }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          重置类型：
          <Select v-model="formData['resetType']" style="width:160px">
            <Option v-for="item in resetType_" :value="item[0]" :key="item.value">{{ item[1] }}</Option>
          </Select>
          重置表达式：<Input v-model="formData['resetExpression']" placeholder="resetExpression..." style="width: auto" />
        </FormItem>
        <FormItem>
          开始时间： <DatePicker v-model="formData['startTime']" type="datetime" placeholder="Select date and time(Excluding seconds)" style="width: 160px"></DatePicker>
          结束时间： <DatePicker v-model="formData['endTime']" type="datetime" placeholder="Select date and time(Excluding seconds)" style="width: 160px"></DatePicker>
        </FormItem>
        <FormItem>
          开服时间：<Input v-model="formData['openingTime']" placeholder="openingTime..." style="width: auto" />
          活动图片：<Input v-model="formData['icon']" placeholder="icon..." style="width: auto" />
        </FormItem>
        <FormItem>
          活动说明：<Input v-model="formData['info']" placeholder="info..." style="width: auto" />
          活动参数：<Input v-model="formData['params']" placeholder="params..." style="width: auto" />
        </FormItem>
        <FormItem>
          活动状态：
          <Select v-model="formData['open']" style="width:160px">
            <Option v-for="item in openStatus" :value="item[0]" :key="item.value">{{ item[1] }}</Option>
          </Select>
          活动条目：<Input v-model="formData['itemList']" placeholder="itemList..." style="width: auto" />
          <Button icon="ios-search" v-on:click="listItems">条目明细</Button>
          <Button icon="ios-search" v-on:click="newItem">新增条目</Button>
        </FormItem>
        <FormItem>
          <FormItem v-for="(items ,index) in formDataItems" :key="index">
            <Input v-bind:value="items" placeholder="itemList..." style="width: auto" />
            <Button icon="ios-search" v-on:click="removeItem(index)">删除</Button>
            <Button icon="ios-search" v-on:click="editItem(index)">修改</Button>
          </FormItem>
        </FormItem>
      </Form>
    </Modal>
    <!-- 明细列表 -->
    <Modal v-model="itemModal.open" v-on:on-ok="confirmItem" :mask-closable="false" :width="890">
      <h2 slot="header" style="color: red">{{itemModal['title']}}</h2>
      <Form label-position="left" :model="item" inline :label-width="100">
        <FormItem>
          明细配置id：<Input v-model="item['id']" placeholder="id..." style="width: auto" />
          索引：<Input v-model="item['index']" placeholder="index..." style="width: auto" />
          基本活动类型：<Input v-model="item['type']" placeholder="type..." style="width: auto" />
        </FormItem>
        <FormItem>
          所属活动id：<Input v-model="item.activityId" placeholder="activityId..." style="width: auto" />
          完成条件：<Input v-model="item.finishType" placeholder="finishType..." style="width: auto" />
          完成条件参数：<Input v-model="item.finishParam" placeholder="finishParam..." style="width: auto" />
        </FormItem>
        <FormItem>
          奖励：<Input v-model="item.reward" placeholder="reward..." style="width: auto" />
          额外奖励：<Input v-model="item.extraReward" placeholder="extraReward..." style="width: auto" />
          兑换列表：<Input v-model="item.exchangeList" placeholder="exchangeList..." style="width: auto" />
        </FormItem>
        <FormItem>
          任务目标：<Input v-model="item.targetStr" placeholder="targetStr..." style="width: auto" />
          替换字符串：<Input v-model="item.replaceStr" placeholder="replaceStr..." style="width: auto" />
          可获取次数：<Input v-model="item.receiveTimes" placeholder="receiveTimes..." style="width: auto" />
        </FormItem>
        <FormItem>
          跳转ID：<Input v-model="item.jumpId" placeholder="jumpId..." style="width: auto" />
          最大兑换次数：<Input v-model="item.maxChangeNum" placeholder="maxChangeNum..." style="width: auto" />
          月卡额外获取金额：<Input v-model="item.getNum" placeholder="getNum..." style="width: auto" />
        </FormItem>
        <FormItem>
          高级月卡每日获取金额：<Input v-model="item.extraGetNum" placeholder="extraGetNum..." style="width: auto" />
          额外掉落：<Input v-model="item.extraDrop" placeholder="extraDrop..." style="width: auto" />
          折扣：<Input v-model="item.discount" placeholder="discount..." style="width: auto" />
        </FormItem>
        <FormItem>
          所属VIP等级：<Input v-model="item.vip" placeholder="vip..." style="width: auto" />
          自定义商品：<Input v-model="item.customPackage" placeholder="customPackage..." style="width: auto" />
          购买价格：<Input v-model="item.buyPrice" placeholder="buyPrice..." style="width: auto" />
        </FormItem>
        <FormItem>
          购买VIP：<Input v-model="item.buyVip" placeholder="buyVip..." style="width: auto" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "runActivity",
  components: {

  },
  data() {
    return {

      datas: [],
      serverIdItems: [],
      page: {
        sizeOpts: [10, 20, 30, 40],
        current: 1,
        pageSize: 10
      },
      seachParams: {
        serverName: undefined,
        id: undefined
      },
      tableModal: {
        open: false,
        view: false, // 区分是新增modal还是修改的modal
        title: ""
      },
      itemModal: {
        open: false,
        title: ""
      },
      formData: undefined, //form表单的数据对象
      formDataItems: [],
      item: {},
      index: 0, // item所在的索引
      template: 1,
      columns: [{

          title: '服务器',
          key: 'serverName',
          width: 100,
          fixed: 'left'
        },
        {

          title: 'id',
          key: 'id',
          width: 100,
          fixed: 'left',
          tooltip: true,
          render: (h, params) => {
            return h('Tooltip', {
              props: { placement: 'bottom', theme: "light" }
            }, [
              params.row["id"],
              h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row["id"])
            ])
          }
        },
        {
          title: '活动名称',
          key: 'name',
          width: 100,
          fixed: 'left'
        },
        {
          title: '开始时间',
          key: 'startTime',
          width: 150
        },
        {
          title: '结束时间',
          key: 'endTime',
          width: 150
        },
        {
          title: '活动备注',
          key: 'remark',
          width: 100
        },
        {
          title: '界面类型',
          key: 'showType',
          width: 100,
          render: (h, params) => {
            var statusMap = new Map(this.showType_);
            return h("span", statusMap.get(params.row.showType))
          }
        },
        {
          title: '活动类型',
          key: 'activityType',
          width: 100,
          render: (h, params) => {
            var statusMap = new Map(this.activityType_);
            return h("span", statusMap.get(params.row.activityType))
          }
        },
        {
          title: '时间类型',
          key: 'timeType',
          width: 100,
          render: (h, params) => {
            var statusMap = new Map(this.timeType_);
            return h("span", statusMap.get(params.row.timeType))
          }
        },
        {
          title: '权重',
          key: 'weight',
          width: 100
        },
        {
          title: '活动状态',
          key: 'status',
          width: 100,
          render: (h, params) => {
            var statusMap = new Map(this.status_);
            return h("span", statusMap.get(params.row.status))
          }
        },
        {
          title: '重置类型',
          key: 'resetType',
          width: 100,
          render: (h, params) => {
            var statusMap = new Map(this.resetType_);
            return h("span", statusMap.get(params.row.resetType))
          }
        },
        {
          title: '重置表达式',
          key: 'resetExpression',
          width: 100
        },
        {
          title: '开服时间',
          key: 'openingTime',
          width: 100
        },
        {
          title: '图片',
          key: 'icon',
          width: 100,
          ellipsis: true,
          tooltip: true,
          render: (h, params) => {
            return h('Tooltip', {
              props: { placement: 'bottom', theme: "light" }
            }, [
              params.row.icon,
              h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.icon)
            ])
          }
        },
        {
          title: '活动说明',
          key: 'info',
          width: 100,
          ellipsis: true,
          tooltip: true,
          render: (h, params) => {
            return h('Tooltip', {
              props: { placement: 'bottom', theme: "light" }
            }, [
              params.row.info,
              h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.info)
            ])
          }
        },
        {
          title: '活动参数',
          key: 'params',
          width: 100,
          ellipsis: true,
          tooltip: true,
          render: (h, params) => {
            return h('Tooltip', {
              props: { placement: 'bottom', theme: "light" }
            }, [
              params.row.params,
              h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.params)
            ])
          }
        },
        {
          title: '活动明细列表',
          key: 'itemList',
          width: 120,
          height: 50,
          ellipsis: true
        },
        {
          title: '是否开启',
          key: 'open',
          width: 100,

          render: (h, params) => {
            var statusMap = new Map(this.openStatus);
            return h("span", statusMap.get(params.row.open))
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => this.openEditTableModal('修改ID为' + params.row.id + "的活动", params.row)
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => this.reloadActivityById(params.row.serverName, params.row.id)
                }
              }, '重载'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {

                    let s = {};

                    s.name = params.row.serverName;

                    s.id = params.row.id;
                    s.open = params.row.open == 1 ? 0 : 1;
                    this.openOrClose(s, params.row);

                  }
                }
              }, '开/关'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {

                    let s = {};

                    s.serverName = params.row.serverName;

                    s.ids = params.row["id"];

                    this.deleteActivity(s, params["index"]);

                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      openStatus: [
        [0, "关闭"],
        [1, "开启"]
      ],
      activityType_: [
        [1, "普通界面"],
        [2, "每日单笔充值"],
        [3, "连续每日充值"],
        [4, "累积消费"],
        [5, "物品兑换"],
        [6, "开服好礼"],
        [7, "额外掉落"],
        [8, "累积抽卡"],
        [9, "等级礼包"],
        [10, "成长基金"],
        [11, "月卡福利"],
        [12, "体力翻倍"],
        [13, "精力翻倍"],
        [14, "限时打折"],
        [15, "超值返利"],
        [16, "面包供应"]

      ],

      showType_: [
        [1, "普通界面"],
        [2, "每日充值界面"],
        [3, "额外掉落界面"],
        [4, "月卡福利界面"],
        [5, "打折商品界面"],
        [6, "限时礼包界面"],
        [7, "面包供应界面"]
      ],
      resetType_: [
        [0, "不重置"],
        [1, "每日重置"],
        [2, "每周一重置"],
        [3, "表达式重置"]
      ],
      status_: [
        [1, "自动检测"],
        [2, "长期显示"],
        [3, "强制无"]
      ],
      timeType_: [
        [1, "自然时间"],
        [2, "开服时间"]
      ]
    }
  },
  watch: {
    datas: function(v) {
      this.page.current = 1;
    }
  },
  methods: {
    initFormData() {
      // 初始化一个formData对象
      return {
        serverName: "",
        id: "",
        name: "",
        startTime: "",
        endTime: "",
        remark: "",
        showType: "",
        activityType: "",
        timeType: "",
        weight: "",
        status: "",
        resetType: "",
        resetExpression: "",
        openingTime: "",
        icon: "",
        info: "",
        params: "",
        open: "",
        itemList: ""
      }
    },
    openAddTableModal(title) {
      this.tableModal.title = title;
      this.tableModal.view = true;
      this.formData = this.initFormData();
      this.formDataItems = [];
      this.tableModal.open = true;
    },
    openEditTableModal(title, params) {
      this.tableModal.title = title;
      this.tableModal.view = false;
      this.formData = params;
      this.formDataItems = [];
      if (this.formData.startTime)
        this.formData.startTime = new Date(this.formData.startTime);
      if (this.formData.endTime)
        this.formData.endTime = new Date(this.formData.endTime);
      // this.listItems(this.formData.itemList)
      this.tableModal.open = true;

    },

    removeItem(index) {
      this.formDataItems.splice(index, 1);
    },
    newItem() {
      this.item = {};
      this.index = this.formDataItems.length;
      this.itemModal.title = "新加条目";
      this.itemModal.open = true;
    },
    editItem(index) {
      this.index = index;
      let temp = this.formDataItems[index];
      this.item = JSON.parse(temp);
      this.itemModal.title = "修改";
      this.itemModal.open = true;

    },
    listItems(str) {
      let deal = function(params) {
        if (params.length > 0) {
          let temp = JSON.parse(params);
          return temp.map((x) => {
            if (typeof x === "string")
              return x;
            return JSON.stringify(x);
          })
        }
        return [];
      }

      this.formDataItems = deal(this.formData.itemList);
      this.formData.itemList = "";
    },
    confirmItem() {
      let temp = {};

      for (var i in this.item) {
        if (this.item[i])
          temp[i] = this.item[i];
      }
      this.formDataItems[this.index] = JSON.stringify(temp);

    },
    loadTemplate() {
      let o = { serverName: this.formData.serverName, activityType: this.template };

      let temp = this.apiList3.api_spiritygenneralcontroller_template(o);
      let arr = temp.items.map(x => JSON.stringify(x));
      temp.itemList = JSON.stringify(arr);
      temp.serverName = o.serverName;
      this.formData = temp;


    },

    openOrClose(o, row) {
      this.apiList4._get_(window.apiUrl.api_spiritygenneralcontroller_openorclose, o, (res) => this.$Message.error("失败" + res), (res) => {
        this.$Message.info('成功');
        row.open = o.open
      });
    },
    reloadActivity() {
      if (this.validateSeachParam()) return;
      this.apiList4._get_(window.apiUrl.api_reloadAll, this.seachParams, (res) => this.$Message.error("失败"), (res) => this.$Message.info('重载成功'));

    },
    reloadActivityById(serverName, id) {


      this.apiList4._get_(window.apiUrl.api_reloadAll, { serverName: serverName, id: id }, (res) => this.$Message.error("失败"), (res) => this.$Message.info('重载成功'));
    },
    updateOrCreate() {
      if (this.formData.startTime) {
        this.formData.startTime = this.formData.startTime.getTime();
      }
      if (this.formData.endTime) {
        this.formData.endTime = this.formData.endTime.getTime();
      }
      if (this.formDataItems.length > 0) {


        const s = this.formDataItems.map(x => JSON.parse(x));
        this.formData.itemList = JSON.stringify(s);
      }


      this.apiList4._postj_(window.apiUrl.api_spiritygenneralcontroller_addorupdate, this.formData, (e) => this.$Message.error("操作失败：" + e), (e) => {

        this.seachParams.serverName = this.formData.serverName;
        this.queryDatas();
        this.$Message.success("操作成功");
      })
    },
    deleteActivity(params, index) {

      const del = (this.page.current - 1) * this.page.pageSize + index;
      const page_ = JSON.parse(JSON.stringify(this.page));
      console.log(page_)
      this.apiList4._get_(window.apiUrl.api_deleteGenneralActive, params, e => this.$Message.error("操作失败：" + e), e => {
        this.datas.splice(del, 1);
        // queryDatas();
        this.$Message.success("操作成功");
      });
      setTimeout(() => {this.page.current = page_.current;
      this.page.pageSize = page_.pageSize;},500)
      console.log(page_)
      console.log(this.page);

    },
    queryDatas() {
      if (this.validateSeachParam()) return;
      // this.datas = this.apiList3.api_spiritygenneralcontroller_loadall(this.seachParams).rows;

      this.apiList4._get_(window.apiUrl.api_spiritygenneralcontroller_loadall, this.seachParams, (e) => {
        console.log(e);
        this.$Message.error("操作失败：" + e.statusText);
        this.datas = []
      }, (e) => {
        console.log(e)
        this.datas = e.rows;
        // this.$Message.success("操作成功");
      });

    },
    divisionData() {

      return this.datas.slice((this.page.current - 1) * this.page.pageSize, this.page.current * this.page.pageSize)
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
    }
    /*,
        timeChange(timestamp) {
          let date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + ' '
          let h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':'
          let m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ':'
          let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
          return Y + M + D + h + m + s
        }*/
  },
  mounted: function() {
    this.serverIdItems = this.apiList3.api_spirityluckcontroller_server();
  },
  beforeMount: function() {
    this.formData = this.initFormData();
  }
}

</script>
