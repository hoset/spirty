<!--信息 -> 游戏服务器-->
<template>
  <div class="list-lb">
    <Row>
      <Col>
      <Card>
        <!--操作按钮-->
        <div slot="title">
          <Button type="success" @click="tableAddClick()">
            添加
          </Button>
        </div>
        <!--表格头部搜索功能-->
        <tableTopSearch v-if="false" :id="pageType" :searchData="searchData" @on-click-search="onClickSearch"></tableTopSearch>
        <!--table-->
        <Table class="content-table" :loading="loading2" :show-header="showHeader" :size="tableSize" :data="listDataShow" :columns="columnsSet" />
        <!--分页-->
        <Page :total="pageNum" show-sizer show-elevator v-if="isShowPage" @on-change="pageChange" @on-page-size-change="PageSizeChange" id="page-click" />
      </Card>
      </Col>
    </Row>
    <!-- 编辑 -->
    <Modal v-model="editModal" width="650" @on-ok="tableEditClick(rowDataVal)">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>编辑</span>
      </p>
      <div style="text-align:center" id="formId">
        <Form :label-width="80">
          <Row>
            <Col span="12">
            <Form-item label="参与跨服帮派战">
              <Input placeholder="请输入" v-model="rowDataVal.joinCrossGuildBattle"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="游戏服地址">
              <Input placeholder="请输入" v-model="rowDataVal.address"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="参与跨服个人战">
              <Input placeholder="请输入" v-model="rowDataVal.joinCrossChampionsBattle"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="最低版本号">
              <Input placeholder="请输入" v-model="rowDataVal.minVersion"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="不可推荐阀值">
              <Input placeholder="请输入" v-model="rowDataVal.noRecThreshold"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="推荐阀值">
              <Input placeholder="请输入" v-model="rowDataVal.recThreshold"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="在线人数上限">
              <Input placeholder="请输入" v-model="rowDataVal.maxLoginCount"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="服务器id">
              <Input placeholder="请输入" v-model="rowDataVal.serverId"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="预计开服时间">
              <DatePicker class="sel-date" v-model="rowDataVal.openServerTime" type="datetime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="跨服服务器地址">
              <Input placeholder="请输入" v-model="rowDataVal.crossServer"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="跨服聊天分组">
              <Input placeholder="请输入" v-model="rowDataVal.serverChatGroup"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="火爆阀值">
              <Input placeholder="请输入" v-model="rowDataVal.hotThreshold"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="system">
              <Input placeholder="请输入" v-model="rowDataVal.system"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="负载情况">
              <Input placeholder="请输入" v-model="rowDataVal.load"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="维护公告">
              <Input placeholder="请输入" v-model="rowDataVal.upkeepMessage"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="区服名称">
              <Input placeholder="请输入" v-model="rowDataVal.name"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="最高版本号">
              <Input placeholder="请输入" v-model="rowDataVal.maxVersion"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="分区id">
              <Input placeholder="请输入" v-model="rowDataVal.zoneId"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="注册人数上限">
              <Input placeholder="请输入" v-model="rowDataVal.maxRegCount"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="跨服地址">
              <Input placeholder="请输入" v-model="rowDataVal.strideServer"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="跨服活动分组">
              <Input placeholder="请输入" v-model="rowDataVal.activityServerGroup"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="跨服分组">
              <Input placeholder="请输入" v-model="rowDataVal.strideServerGroup"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="开服时间">
              <DatePicker class="sel-date" v-model="rowDataVal.openTime" type="datetime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="标志">
              <Select filterable v-model="rowDataVal.mark">
                <Option v-for="item in remarkData" :value="item.id" :key="item.id">{{item.val}}</Option>
              </Select>
            </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
    <!--查看详情弹框-->
    <Modal v-model="isShowDetail" title="详情">
      <div class="outDetailDiv">
        <p class="inDetailP" v-for="(item, key, i) in rowDataValC" v-if="mathShow.get(key)">

           {{mathShow.get(key)}} : {{item}}

        </p>
      </div>
    </Modal>
  </div>
</template>
<script>
import editTables from './../../smallcpt/editTables'
import elementResizeDetectorMaker from 'element-resize-detector'
import tableTopSearch from './../../smallcpt/tableTopSearch'
var erd = elementResizeDetectorMaker()
export default {
  name: 'infgameserver',
  components: {
    tableTopSearch,
    editTables
  },
  data() {
    return {
      rowDataValC: {}, // 拷贝的对象
      serverId: '', // 输入的服务器id
      playerId: '', // 输入的玩家id
      modeljfType: '', // 输入的解封类型
      endTime: '', // 输入的结束时间
      pushNum: null,
      a: 0,
      rowDataVal: {}, // 当前行的完整数据
      isShowDetail: false, // 表格点击查看弹框是否显示
      initPages: { // 初始化加载第几页
      },
      loading2: false, // 加载loading
      pageNum: 0, // 表格内容条数
      addOrEdit: 0, // 用于区分添加和编辑（添加：1；编辑：2）
      listDatas: [], // 表格总数据
      listDataShow: [], // 展示数据
      listDatasLength: 0, // 当前得到的数据长度
      showHeader: true, // 是否显示表头 @:show-header
      tableSize: 'small', // @:size
      isShowPage: true, // 是否显示分页条
      limits: 10, // 多少条每页
      setPageData: 0, // 当前点击页数，应该请求对应的数据
      searchData: [], // 表搜索数据
      pageType: 2, // 页面类型（决定表搜索框的样式）
      resourcesButton: [], // 权限按钮数据
      leftIsShowButton_r: false, // 查询权限按钮是否显示
      leftIsShowButton_c: false, // 添加权限按钮是否显示
      rightIsShowButton_u: false, // 编辑权限按钮是否显示
      editModal: false, // 添加封禁弹框是否弹出
      mathShow: new Map(),
      remarkData: [ // 下拉框字段
        {
          id: 0,
          val: '无标示'
        },
        {
          id: 4,
          val: '推荐'
        },
        {
          id: 8,
          val: '火爆'
        }
      ],
      columnsSet: [ // 表头数据
        {
          sortable: true,
          title: '参与跨服帮派战',
          key: 'joinCrossGuildBattle'
        },
        {
          sortable: true,
          title: '游戏服地址',
          key: 'address'
        },
        {
          sortable: true,
          title: '参与跨服个人战',
          key: 'joinCrossChampionsBattle'
        },
        {
          sortable: true,
          title: '最低版本号',
          key: 'minVersion'
        },
        {
          sortable: true,
          title: '不可推荐阀值',
          key: 'noRecThreshold'
        },
        {
          sortable: true,
          title: '推荐阀值',
          key: 'recThreshold'
        },
        {
          sortable: true,
          title: '在线人数上限',
          key: 'maxLoginCount'
        },
        {
          sortable: true,
          title: '服务器id',
          key: 'serverId'
        },
        {
          sortable: true,
          title: '预计开服时间',
          key: 'openServerTime'
        },
        {
          sortable: true,
          title: '跨服服务器地址',
          key: 'crossServer'
        },
        {
          sortable: true,
          title: '跨服聊天分组',
          key: 'serverChatGroup'
        },
        {
          sortable: true,
          title: '火爆阀值',
          key: 'hotThreshold'
        },
        {
          sortable: true,
          title: 'system',
          key: 'system'
        },
        {
          sortable: true,
          title: '负载情况',
          key: 'load'
        },
        {
          sortable: true,
          title: '维护公告',
          key: 'upkeepMessage'
        },
        {
          sortable: true,
          title: '区服名称',
          key: 'name'
        },
        {
          sortable: true,
          title: '最高版本号',
          key: 'maxVersion'
        },
        {
          sortable: true,
          title: '分区id',
          key: 'zoneId'
        },
        {
          sortable: true,
          title: '注册人数上限',
          key: 'maxRegCount'
        },
        {
          sortable: true,
          title: '跨服地址',
          key: 'strideServer'
        },
        {
          sortable: true,
          title: '跨服活动分组',
          key: 'activityServerGroup'
        },
        {
          sortable: true,
          title: '跨服分组',
          key: 'strideServerGroup'
        },
        {
          sortable: true,
          title: '开服时间',
          key: 'openTime'
        },
        {
          sortable: true,
          title: '标志',
          key: 'mark'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  color: '#5cadff'
                },
                on: {
                  click: () => {
                    this.show(params)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  color: '#ff5035',
                  display: this.rightIsShowButton_u ? 'inline-block' : 'none' // 权限操作
                },
                on: {
                  click: () => {
                    this.rightIsShowButton_u ? this.edit(params) : this.$Message.info('没有权限') // 权限操作
                  }
                }
              }, '编辑')
            ])
          }
        }
      ]
    }
  },
  /**
   * watch
   */
  watch: {
    'setPageData'(a) {
      this.a = a
    },
    // 清除表单值
    'editModal'(val) {
      if (!val) {
        this.listDataShow = this.listDatas.slice(0, this.limits)
      }
    }
  },
  methods: {
    /**
     * 获取表数据
     */
    getAddListData(page) {
      var _this = this
      // 请求数据
      var res = _this.apiList3.api_spirityservercontroller_loadall(page)
      if (!res || res.hasOwnProperty('code')) {
        this.$Message.error(res.message)
        this.loading2 = false
        return
      }
      _this.loading2 = false
      this.setPageData = 1
      // 时间戳转时间
      for (var i = 0; i < res.rows.length; i++) {
        res.rows[i].openServerTime = window.timeChange(res.rows[i].openServerTime)
        res.rows[i].openTime = window.timeChange(res.rows[i].openTime)
      }
      _this.pageNum = res.total // 总共条数
      _this.listDatas = res.rows // 总数据
      _this.listDatasLength = res.rows.length // 当前得到的数据长度
      _this.listDataShow = res.rows.slice(0, 10) // 展示数据
    },

    /**
     * 页码改变后截取当页数据显示
     */
    pageChange(page) {
      var _this = this
      let getLimitPageR = this.listDatas.length // 一次获取的数据量长度
      let getLimitPage = this.listDatasLength // 当前得到的数据长度
      let countPage = Math.ceil(this.pageNum / this.limits) // 总页数
      let getPageNum = Math.ceil(getLimitPage / this.limits) // 一次请求分多少页显示
      let getPageNumR = Math.ceil(getLimitPageR / this.limits) // 一次请求分多少页显示(用于下面比较)
      // 一次请求对于当前分页的数量所占比例
      var pageToCount = getPageNum / countPage
      // 当前点击页数，应该请求对应的数据
      this.setPageData = Math.ceil((page / countPage - pageToCount) / pageToCount) + 1
      // 跨分页获取数据
      // this.pushNum: 如果一旦有值，则说明用户跨分页点击了
      if (page > getPageNumR) {
        if (this.setPageData - this.a > 1) {
          this.pushNum = getLimitPage * (this.setPageData - this.a - 1) // 需要push空字符串的量
          for (let i = 0; i < this.pushNum; i++) {
            this.listDatas.push('')
          }
        }
      }
      // 当前点击的页数大于当前页显示的数量（数据展示完了）
      if (page > getPageNumR) {
        this.loading2 = true
        // 请求数据
        var res = _this.apiList3.api_spirityservercontroller_loadall({ currentPage: _this.setPageData })
        if (!res || res.hasOwnProperty('code')) {
          this.$Message.error(res.message)
          this.loading2 = false
          return
        }
        _this.loading2 = false
        // 时间戳转时间
        for (var i = 0; i < res.rows.length; i++) {
          res.rows[i].censusDate = window.timeChange(res.rows[i].censusDate)
          res.rows[i].createTime = window.timeChange(res.rows[i].createTime)
          res.rows[i].updateTime = window.timeChange(res.rows[i].updateTime)
        }
        _this.listDatas = _this.listDatas.concat(res.rows) // 重新赋值新数据
        // _this.pageNum = res.total // 总共条数
      }
      // 截取展示
      _this.listDataShow = _this.listDatas.slice((page - 1) * _this.limits, (page - 1) * _this.limits + _this.limits)
    },

    /**
     * 切换每页条数后，重新展示
     */
    PageSizeChange(limit) {
      this.limits = limit
      this.listDataShow = this.listDatas.slice(0, limit)
    },

    /**
     * 获取服务器列表
     */
    getServerData() {
      var res = this.apiList3.api_spirityluckcontroller_server()
      if (!res) {
        return
      }
      this.searchData = res
    },

    /**
     * 点击编辑弹框
     */
    edit(params) {
      // alert(1)
      this.addOrEdit = 2 // 标示编辑
      this.editModal = true
      this.rowDataVal = params.row // 当前行的数据
    },

    /**
     * 点击查询
     */
    onClickSearch(res) {
      this.getAddListData(res)
    },

    /**
     * 添加弹框
     */
    tableAddClick() {
      // alert(2)
      this.rowDataVal = {}
      this.addOrEdit = 1 // 标示添加
      this.editModal = true
      // alert(this.editModal)
    },

    /**
     * 编辑功能
     */
    tableEditClick(r) {
      console.log(r)
      let o = this.copy(r)
      o.openServerTime = o.openServerTime.getTime()
      o.openTime = o.openTime.getTime()
      // 编辑
      let jo = JSON.stringify(o)
      let o2 = {
        serverInfo: jo
      }
      if (this.addOrEdit === 2) {
        var res = this.apiList3.api_spirityservercontroller_update(o2)
        if (!res && res.code === 0) {
          this.$Message.info('更改失败')
          return
        }
        this.$Message.info('更改成功')
      }
      // 添加
      if (this.addOrEdit === 1) {
        var res2 = this.apiList3.api_spirityservercontroller_save(o2)
        if (!res2 && res.code === 0) {
          this.$Message.info('添加失败')
          return
        }
        this.$Message.info('添加成功')
      }
      this.getAddListData(this.initPages)
    },

    /**
     * 对象拷贝
     */
    copy(obj) {
      var newobj = {}
      for (var attr in obj) {
        newobj[attr] = obj[attr]
      }
      return newobj
    },

    /**
     * 权限按钮操作
     * 菜单按钮（this.resourcesButton）
     * 'c': 增加, 'r': 查询, 'u': 修改, 'd': 删除
     */
    powerButton() {
      var _this = this
      window.MEMU.forEach((e) => {
        if (e.path === '/' + this.$route.name && (e.resources.length !== 0 || e.resources != null)) {
          _this.resourcesButton = e.resources
        } else {
          if (e.childMenu.length !== 0 || e.childMenu != null) {
            e.childMenu.forEach((e1) => {
              if (e1.path === '/' + this.$route.name && (e1.resources.length !== 0 || e1.resources != null)) {
                _this.resourcesButton = e1.resources
              } else {
                if (e1.childMenu.length !== 0 || e1.childMenu != null) {
                  e1.childMenu.forEach((e2) => {
                    if (e2.path === '/' + this.$route.name && (e2.resources.length !== 0 || e2.resources != null)) {
                      _this.resourcesButton = e2.resources
                    }
                  })
                }
              }
            })
          }
        }
      })
      this.resourcesButton.forEach((e) => {
        // 查询按钮
        if (e.coordinate === 'left' && e.sn === 'r') {
          _this.leftIsShowButton_r = true
        }
        // 添加按钮
        if (e.coordinate === 'left' && e.sn === 'c') {
          _this.leftIsShowButton_c = true
        }
        // 编辑按钮
        if (e.coordinate === 'right' && e.sn === 'u') {
          _this.rightIsShowButton_u = true
        }
      })
    },

    /**
     * 表格详情查看
     */
    show(row) {
      // alert(index)
      // this.rowDataVal = this.listDataShow[index]
      // console.log(row)
      // var s = this.columnsSet.pop(); title: '跨服分组',
      // key: 'strideServerGroup'
      if (this.mathShow.size <= 0) {
        var arr = new Array(this.columnsSet).pop();
        // mathShow
        arr.map((x) => { this.mathShow.set(x.key, x.title) });
      }

console.log(this.mathShow)


      this.rowDataValC = JSON.parse(JSON.stringify(row.row));
      console.log(this.rowDataValC)
      this.isShowDetail = true
    },

    /**
     * js时间戳转换时间
     */
    timeChange(timestamp) {
      let date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() + ' '
      let h = date.getHours() + ':'
      let m = date.getMinutes() + ':'
      let s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  },
  created() {
    // 初始化表数据
    this.getAddListData(this.initPages)
    // 初始化表搜索数据
    this.getServerData()
    // 初始化按钮
    this.powerButton()
  },
  mounted() {
    erd.listenTo(window, 'resize', this.handleResize)
    this.columnsSet.forEach((e) => {
      e.width = 150
    })
  }
}

</script>
<style lang="less">
#page-click {
  margin-top: 20px;
}

.outDetailDiv {
  display: flex;
  flex-flow: row wrap;
  text-align: center;

  .inDetailP {
    width: 50%;
    padding: 5px;
    text-align: left;
  }
}

#formId {
  overflow: auto;
  height: 450px;
  padding: 10px;
}

</style>
