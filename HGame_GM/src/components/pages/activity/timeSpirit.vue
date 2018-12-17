<!--活动 -> 限时精灵-->
<template>
  <div class="list-lb">
    <Row>
      <Col>
      <Card>
        <!--操作按钮-->
        <div slot="title">
          <Button type="success" @click="tableAddClick()" v-if="leftIsShowButton_c">
            添加
          </Button>
         
          <Button type="error" v-if="leftIsShowButton_d">
            批量删除
          </Button>
        </div>
        <!--表格头部搜索功能-->
        <tableTopSearch v-if="leftIsShowButton_r" :id="pageType" :searchData="searchData" @on-click-search="onClickSearch"></tableTopSearch>
        <!--table-->
        <Table class="content-table" :loading="loading2" :show-header="showHeader" :size="tableSize" :data="listDataShow" :columns="columnsSet" />
        <!--分页-->
        <Page :total="pageNum" show-sizer show-elevator v-if="isShowPage" @on-change="pageChange" @on-page-size-change="PageSizeChange" id="page-click" />
      </Card>
      </Col>
      <!-- 编辑 -->
      <Modal v-model="editModal" @on-ok="tableEditClick(tableRowData)">
        <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>编辑</span>
        </p>
        <div class="modalOutDiv">
          <Form :label-width="80" class="modalInDiv">
            <Form-item label="所属服务器">
              <Input placeholder="请输入" v-model="tableRowData.serverName"></Input>
            </Form-item>
            <Form-item label="英雄id">
              <Input placeholder="请输入" v-model="tableRowData.heroId"></Input>
            </Form-item>
            <Form-item label="消耗">
              <Input placeholder="请输入" v-model="tableRowData.consume"></Input>
            </Form-item>
            <Form-item label="10连抽消耗">
              <Input placeholder="请输入" v-model="tableRowData.consume5"></Input>
            </Form-item>
            <Form-item label="每日免费次数">
              <Input placeholder="请输入" v-model="tableRowData.freeTime"></Input>
            </Form-item>
            <Form-item label="排名奖励配置">
              <Input type="textarea" :autosize="true" v-model="tableRowData.rankRewardStr"></Input>
            </Form-item>
            <Form-item label="抽奖奖池">
              <Input type="textarea" :autosize="true" v-model="tableRowData.jackpot"></Input>
            </Form-item>
            <Form-item label="保底奖池">
              <Input type="textarea" :autosize="true" v-model="tableRowData.extraJackpot"></Input>
            </Form-item>
            <Form-item label="排行奖励显示">
              <Input type="textarea" :autosize="true" v-model="tableRowData.rewardShowStr"></Input>
            </Form-item>
            <Form-item label="积分盒子奖励">
              <Input type="textarea" :autosize="true" v-model="tableRowData.rewardBoxStr"></Input>
            </Form-item>
            <Form-item label="是否开启" class="lable-left">
              <RadioGroup size="large" v-model="tableRowData.open">
                <Radio label="是" :value="tableRowData.open == 0 ? false : true"></Radio>
                <Radio label="否" :value="tableRowData.open == 0 ? true : false"></Radio>
              </RadioGroup>
            </Form-item>
            <Form-item label="开始时间">
              <DatePicker class="sel-date" v-model="tableRowData.startTime" type="datetime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
            </Form-item>
            <Form-item label="结束时间">
              <DatePicker class="sel-date" v-model="tableRowData.endTime" type="datetime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
            </Form-item>
          </Form>
        </div>
      </Modal>
      <!--删除提示  -->
      <Modal v-model="deleteTip" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>此操作将删除这条数据。</p>
          <p>是否继续删除？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long @click="deleteBatch">删除</Button>
        </div>
      </Modal>
    </Row>
  </div>
</template>
<script>
import editTables from './../../smallcpt/editTables'
import elementResizeDetectorMaker from 'element-resize-detector'
import tableTopSearch from './../../smallcpt/tableTopSearch'
var erd = elementResizeDetectorMaker()
export default {
  name: 'timeSpirit',
  components: {
    tableTopSearch,
    editTables
  },
  data() {
    return {
      selData: {}, // 表搜索条件
      searchData: [], // 搜索数据
      modelIdSel: '', // 接收下拉框id
      delUserId: 0, // 当前需要删除的id
      delServerName: '', // 当前需要删除的服务器名字
      deleteTip: false, // 是否弹出删除提示框
      addOrEdit: 0, // 用于区分添加和编辑（添加：1；编辑：2）
      editModal: false, // 编辑弹框是否弹出
      initPages: { // 初始化加载第几页
        currentPage: 1
      },
      loading2: false, // 加载loading
      pageNum: 0, // 表格内容条数
      listDatas: [], // 表格总数据
      listDataShow: [], // 展示数据
      showHeader: true, // 是否显示表头 @:show-header
      tableSize: 'small', // @:size
      isShowPage: true, // 是否显示分页条
      limits: 10, // 多少条每页
      setPageData: 0, // 当前点击页数，应该请求对应的数据
      pageType: 2, // 页面类型（决定表搜索框的样式）
      tableRowData: {}, // 表格当前一行的数据
      resourcesButton: [], // 权限按钮数据
      leftIsShowButton_r: false, // 左侧查询按钮是否显示
      leftIsShowButton_c: false, // 左侧添加按钮是否显示
      leftIsShowButton_d: false, // 左侧删除按钮是否显示
      rightIsShowButton_u: false, // 右侧修改按钮是否显示
      rightIsShowButton_d: false, // 右侧删除按钮是否显示
      rightIsShowButton_o: false, // 右侧开启/关闭按钮是否显示
      leftIsShowButton_o: false, // 左侧重载按钮是否显示
      columnsSet: [ // 表头数据
        {
          type: 'selection', // 开启checkbox
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          sortable: true,
          title: 'id',
          key: 'id'
        },
        {
          sortable: true,
          title: '服务器',
          key: 'serverName'
        },
        {
          sortable: true,
          title: '开始时间',
          key: 'startTime'
        },
        {
          sortable: true,
          title: '结束时间',
          key: 'endTime'
        },
        {
          sortable: true,
          title: '是否开启',
          key: 'open'
        },
        {
          sortable: true,
          title: '英雄id',
          key: 'heroId'
        },
        {
          sortable: true,
          title: '消耗',
          key: 'consume'
        },
        {
          sortable: true,
          title: '10连抽消耗',
          key: 'consume5'
        },
        {
          sortable: true,
          title: '每日免费次数',
          key: 'freeTime'
        },
        {
          sortable: true,
          title: '排名奖励配置',
          key: 'rankRewardStr'
        },
        {
          sortable: true,
          title: '抽奖奖池',
          key: 'jackpot'
        },
        {
          sortable: true,
          title: '保底奖池',
          key: 'extraJackpot'
        },
        {
          sortable: true,
          title: '排行奖励显示',
          key: 'rewardShowStr'
        },
        {
          sortable: true,
          title: '积分盒子奖励',
          key: 'rewardBoxStr'
        },
        {
          title: '操作',
          key: 'action',
          width: 220,
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
                  color: '#5cadff'
                },
                on: {
                  click: () => {
                    this.edit(params)
                  }
                }
              }, '编辑'),
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
                    this.show(params.index)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#5cadff'
                },
                on: {
                  click: () => {
                    this.openClose(params.row)
                  }
                }
              }, '开/关'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#ff3300'
                },
                on: {
                  click: () => {
                    this.remove(params)
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#ff3300'
                },
                on: {
                  click: () => {
                    this.luckReload(params.row)
                  }
                }
              }, '重载')
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
    getAddListData(data) {
      var _this = this
      // 请求数据
      var res = _this.apiList3.api_spiritydeadcontroller_loadall(data)
      if (!res || res.hasOwnProperty('code')) {
        this.$Message.error(res.message)
        this.loading2 = false
        return
      }
      // 时间戳转换
      for (let i = 0; i < res.rows.length; i++) {
        res.rows[i].open = res.rows[i].open === 0 ? '否' : '是'
        res.rows[i].startTime = window.timeChange(res.rows[i].startTime)
        res.rows[i].endTime = window.timeChange(res.rows[i].endTime)
      }
      this.loading2 = false
      this.pageNum = res.total // 总共条数
      this.listDatas = res.rows // 总数据
      this.listDataShow = res.rows.slice(0, 10) // 展示数据
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
     * 页码改变后截取当页数据显示
     */
    pageChange(page) {
      var _this = this
      let getLimitPage = this.listDatas.length // 一次获取的数据量长度
      let countPage = Math.ceil(this.pageNum / this.limits) // 总页数
      let getPageNum = Math.ceil(getLimitPage / this.limits) // 一次请求分多少页显示
      // 一次请求对于当前分页的数量所占比例
      var pageToCount = getPageNum / countPage
      // 当前点击页数，应该请求对应的数据
      this.setPageData = Math.ceil((page / countPage - pageToCount) / pageToCount) + 1
      // 当前点击的页数大于当前页显示的数量（数据展示完了）
      if (page > getPageNum) {
        // 请求数据
        var res = _this.apiList3.api_spiritydeadcontroller_loadall({ currentPage: _this.setPageData })
        if (!res || res.hasOwnProperty('code')) {
          this.$Message.error(res.message)
          this.loading2 = false
          return
        }
        _this.loading2 = false
        // 添加一个属性
        for (let i = 0; i < res.rows.length; i++) {
          res.rows[i].createTime = window.timeChange(res.rows[i].createTime) // 时间戳转换
          res.rows[i].status = res.rows[i].status ? '激活' : '未激活'
          res.rows[i].validate = res.rows[i].validate ? '是' : '否'
          if (res.rows[i].role != null) {
            res.rows[i].roleName = res.rows[i].role.roleName
          }
        }
        _this.listDatas = _this.listDatas.concat(res.rows) // 重新赋值新数据
        _this.pageNum = res.total // 总共条数
      }
      _this.listDataShow = _this.listDatas.slice((page - 1) * _this.limits, (page - 1) * _this.limits + _this.limits)
    },

    /**
     * 点击编辑弹框
     */
    edit(params) {
      this.addOrEdit = 2 // 标示编辑
      this.editModal = true
      this.tableRowData = params.row // 当前行的数据
    },

    /**
     * 点击编辑保存
     */
    tableEditClick(val) {
      let val2 = this.copy(val)
      val2.endTime = window.timeChange(new Date(val2.endTime).getTime())
      val2.startTime = window.timeChange(new Date(val2.startTime).getTime())
      val2.open = val2.open === '是' ? 1 : 0
      // 编辑
      if (this.addOrEdit === 2) {
        console.log(val2)
        var resE = this.apiList3.api_spiritydeadcontroller_addorupdate(val2)
        if (resE && resE.code === 0) {
          this.$Message.info('保存成功')
        } else {
          this.$Message.info('保存失败')
        }
      }
      // 添加
      if (this.addOrEdit === 1) {
        console.log(val2)
        var resA = this.apiList3.api_spiritydeadcontroller_addorupdate(val2)
        if (resA && resA.code === 0) {
          this.$Message.info('添加成功')
        } else {
          this.$Message.info('添加失败')
        }
      }
      this.getAddListData(this.selData)
      this.editModal = false
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
     * 点击添加弹框
     */
    tableAddClick() {
      this.addOrEdit = 1 // 标示添加
      this.editModal = true
      this.tableRowData = {}
    },

    /**
     * 切换每页条数后，重新展示
     */
    PageSizeChange(limit) {
      this.limits = limit
      this.listDataShow = this.listDatas.slice(0, limit)
    },

    /**
     * 点击查询
     */
    onClickSearch(res) {
      this.selData = res
      this.getAddListData(res)
    },

    /**
     * 表格查看
     */
    show(index) {
      this.$Modal.info({
        title: '详情',
        content: `id：${this.listDataShow[index].id}<br>
                    服务器：${this.listDataShow[index].serverName}<br>
                    开始时间：${this.listDataShow[index].startTime}<br>
                    结束时间：${this.listDataShow[index].endTime}<br>
                    是否开启：${this.listDataShow[index].open}<br>
                    英雄id：${this.listDataShow[index].heroId}<br>
                    消耗：${this.listDataShow[index].consume}<br>
                    10连抽消耗：${this.listDataShow[index].consume5}<br>
                    每日免费次数：${this.listDataShow[index].freeTime}<br>
                    排名奖励配置：${this.listDataShow[index].rankRewardStr}<br>
                    抽奖奖池：${this.listDataShow[index].jackpot}<br>
                    保底奖池：${this.listDataShow[index].extraJackpot}<br>
                    排行奖励显示：${this.listDataShow[index].rewardShowStr}<br>
                    积分盒子奖励：${this.listDataShow[index].rewardBoxStr}<br`
      })
    },

    /**
     * 开启或关闭
     */
    openClose(params) {
      let o = {
        name: params.serverName,
        id: params.id,

        open: params.open === '是' ? 1 : 0
      }
      var res = this.apiList3.api_spiritydeadcontroller_openorclose(o)
      if (!res) {
        this.$Message.info('操作失败')
        return
      } else {

        params.open = params.open === '是' ? '否' : '是';

        this.$Message.info('操作成功')
      }
    },
    /**
     * 重载
     */
    luckReload(params) {
      let o = {
        name: params.serverName,
        id: params.id
      }
      var res = this.apiList3.api_spiritydeadcontroller_reload(o)
      if (!res) {
        this.$Message.info('重载失败')
        return
      }
      this.$Message.info('重载成功')
    },

    /**
     * 点击删除弹出
     */
    remove(params) {
      this.deleteTip = true
      this.delUserId = params.row.id
      this.delServerName = params.row.serverName
    },

    /**
     * 删除操作
     */
    deleteBatch() {
      let o = {
        ids: this.delUserId,
        name: this.delServerName
      }
      var res = this.apiList3.api_spiritydeadcontroller_delete(o)
      if (!res) {
        this.$Message.info('删除失败')
      } else {
        this.$Message.info('删除成功')
        this.getAddListData(this.selData)
      }
      this.deleteTip = false
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
        // 左侧查询按钮
        if (e.coordinate === 'left' && e.sn === 'r') {
          _this.leftIsShowButton_r = true
        }
        // 左侧添加按钮
        if (e.coordinate === 'left' && e.sn === 'c') {
          _this.leftIsShowButton_c = true
        }
        // 左侧删除按钮
        if (e.coordinate === 'left' && e.sn === 'd') {
          _this.leftIsShowButton_d = true
        }
        // 左侧重载按钮
        if (e.coordinate === 'left' && e.sn === 'o') {
          _this.leftIsShowButton_o = true
        }
        // 右侧开启/关闭按钮
        if (e.coordinate === 'right' && e.sn === 'o') {
          _this.rightIsShowButton_o = true
        }
        // 右侧修改按钮
        if (e.coordinate === 'right' && e.sn === 'u') {
          _this.rightIsShowButton_u = true
        }
        // 右侧删除按钮
        if (e.coordinate === 'right' && e.sn === 'd') {
          _this.rightIsShowButton_d = true
        }
      })
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
    // 初始化表格数据
    this.getAddListData(this.initPages)
    // 初始化服务器列表
    this.getServerData()
    // 初始化按钮
    this.powerButton()
  },
  mounted() {
    erd.listenTo(window, 'resize', this.handleResize)
  }
}

</script>
<style lang="less">
#page-click {
  margin-top: 20px;
}

.modalOutDiv {
  text-align: center;
  height: 500px;
  overflow: auto;

  .modalInDiv {
    padding: 10px;
  }
}

.ivu-modal-body {
  word-break: break-all;
  word-wrap: break-word;
}

</style>
