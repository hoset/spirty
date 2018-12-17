<!--活动 -> 运营活动-->
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
          <Button type="error" >
            批量删除
          </Button>
        </div>
        <!--表格头部搜索功能-->
        <tableTopSearch v-if="leftIsShowButton_r" :id="pageType" :searchData="searchData" @on-click-search="onClickSearch">
        </tableTopSearch>
        <!--table-->
        <Table class="content-table" :row-class-name="rowClassName" :loading="loading2" :show-header="showHeader" :size="tableSize" :data="listDataShow" :columns="columnsSet" :height="700" />
        <!--分页-->
        <Page :total="pageNum" show-sizer show-elevator v-if="isShowPage" @on-change="pageChange" @on-page-size-change="PageSizeChange" id="page-click" />
      </Card>
      </Col>
      <!-- 编辑 -->
      <Modal v-model="editModal" @on-ok="tableEditClick(tableRowData)" width="650">
        <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>编辑</span>
        </p>
        <div class="modalOutDiv">
          <Form :label-width="80" class="modalInDiv">
            <Row v-if="addOrEdit==1">
              <Col span="8">
              <Form-item label="服务器">
                <Input placeholder="请输入" v-model="useTempData.useTempServer"></Input>
              </Form-item>
              </Col>
              <Col span="8">
              <Form-item label="模板名">
                <Input placeholder="请输入" v-model="useTempData.useTempName"></Input>
              </Form-item>
              </Col>
              <Col span="8">
              <Button type="success" @click="useTemp(useTempData)">
                应用模板
              </Button>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="开始时间">
                <DatePicker class="sel-date" v-model="tableRowData.startTime" type="datetime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="结束时间">
                <DatePicker class="sel-date" v-model="tableRowData.endTime" type="datetime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="服务器">
                <Input placeholder="请输入" v-model="tableRowData.serverName"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="活动名称">
                <Input placeholder="请输入" v-model="tableRowData.name"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="活动备注">
                <Input placeholder="请输入" v-model="tableRowData.remark"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="权重">
                <Input placeholder="请输入" v-model="tableRowData.weight"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="权重表达式">
                <Input placeholder="请输入" v-model="tableRowData.resetExpression"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="开服时间">
                <Input placeholder="请输入" v-model="tableRowData.openingTime"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="图片">
                <Input placeholder="请输入" v-model="tableRowData.icon"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="重置类型">
                <Select filterable v-model="tableRowData.resetType">
                  <Option v-for="item in data_resetType" :value="item.id" :key="item.id">{{item.val}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="活动界面类型">
                <Select filterable v-model="tableRowData.showType">
                  <Option v-for="item in data_showType" :value="item.id" :key="item.id">{{item.val}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="活动类型">
                <Select filterable v-model="tableRowData.activityType">
                  <Option v-for="item in data_activityType" :value="item.id" :key="item.id">{{item.val}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="时间类型">
                <Select filterable v-model="tableRowData.timeType">
                  <Option v-for="item in data_timeType" :value="item.id" :key="item.id">{{item.val}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="活动状态">
                <Select filterable v-model="tableRowData.status">
                  <Option v-for="item in data_status" :value="item.id" :key="item.id">{{item.val}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="活动说明">
                <Input type="textarea" :autosize="true" v-model="tableRowData.info"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="活动参数">
                <Input type="textarea" :autosize="true" v-model="tableRowData.params"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="是否开启">
                <RadioGroup v-model="tableRowData.open">
                  <Radio label="是" :value="tableRowData.open === '是' ? true : false"></Radio>
                  <Radio label="否" :value="tableRowData.open  === '否' ? true : false"></Radio>
                </RadioGroup>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="活动明细">
                <Button type="success" @click="editItemList(1)">
                  添加
                </Button>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="24" v-if="flagIN">
              <div class="col_update_delete" v-for="(item, i) in tableRowData.itemList">
                <Input type="textarea" :value="item" :autosize="false" :rows="1"></Input>
                <Button type="success" @click="editItemList(2, item, i)">编辑</Button>
                <Button type="error" @click="deleteItemList(i)">删除</Button>
              </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      <!--内层活动明细弹框-->
      <Modal v-model="editModalIn" @on-ok="clickItemList(dataItemListRow)" width="450">
        <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>编辑</span>
        </p>
        <div class="modalOutDiv2">
          <Form :label-width="80" class="modalInDiv">
            <Row>
              <Col span="12">
              <Form-item label="明细配置id">
                <Input placeholder="请输入" v-model="dataItemListRow.id"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="索引">
                <Input placeholder="请输入" v-model="dataItemListRow.index"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="基本活动类型">
                <Input placeholder="请输入" v-model="dataItemListRow.type"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="所属活动的id">
                <Input placeholder="请输入" v-model="dataItemListRow.activityId"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="完成条件类型">
                <Input placeholder="请输入" v-model="dataItemListRow.finishType"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="完成条件参数">
                <Input placeholder="请输入" v-model="dataItemListRow.finishParam"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="奖励">
                <Input placeholder="请输入" v-model="dataItemListRow.reward"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="额外奖励">
                <Input placeholder="请输入" v-model="dataItemListRow.extraReward"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="兑换列表">
                <Input placeholder="请输入" v-model="dataItemListRow.exchangeList"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="任务目标">
                <Input placeholder="请输入" v-model="dataItemListRow.targetStr"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="替换字符串">
                <Input placeholder="请输入" v-model="dataItemListRow.replaceStr"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="可获取次数">
                <Input placeholder="请输入" v-model="dataItemListRow.receiveTimes"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="跳转id">
                <Input placeholder="请输入" v-model="dataItemListRow.jumpId"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="最大兑换次数">
                <Input placeholder="请输入" v-model="dataItemListRow.maxChangeNum"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="月卡每日获取金额">
                <Input placeholder="请输入" v-model="dataItemListRow.getNum"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="高级月卡每日获取金额">
                <Input placeholder="请输入" v-model="dataItemListRow.extraGetNum"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="额外掉落">
                <Input placeholder="请输入" v-model="dataItemListRow.extraDrop"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="折扣">
                <Input placeholder="请输入" v-model="dataItemListRow.discount"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="所需vip等级">
                <Input placeholder="请输入" v-model="dataItemListRow.vip"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="自定义商品">
                <Input placeholder="请输入" v-model="dataItemListRow.customPackage"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Form-item label="购买价格">
                <Input placeholder="请输入" v-model="dataItemListRow.buyPrice"></Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="购买VIP">
                <Input placeholder="请输入" v-model="dataItemListRow.buyVip"></Input>
              </Form-item>
              </Col>
            </Row>
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
  name: 'runActivity',
  components: {
    tableTopSearch,
    editTables
  },
  data() {
    return {
      reload_table: undefined,
      selectDataClick: {}, // 表搜索参数
      seeTableRow: false, // 点击查看表格行
      flagIN: true, // 内层删除标记，暂时解决删除时候组件不更新问题
      useTempData: {}, // 使用模板参数
      searchData: [], // 搜索数据
      modelIdSel: '', // 接收下拉框id
      delUserId: 0, // 当前需要删除的id
      delServerName: '', // 当前需要删除的服务器名字
      deleteTip: false, // 是否弹出删除提示框
      addOrEdit: 0, // 用于区分添加和编辑（添加：1；编辑：2）
      InAddOrEdit: 0, // 内层用于区分添加和编辑（添加：1；编辑：2）
      editModal: false, // 编辑弹框是否弹出
      editModalIn: false, // 内层活动明细编辑弹框是否弹出
      initPages: { // 初始化加载第几页
        page: 1,
        rows: 10
      },
      loading2: false, // 加载loading
      pageNum: 0, // 表格内容条数
      listDatas: [], // 表格总数据
      listDataShow: [], // 展示数据
      dataItemListRow: {}, // 当前活动明细编辑展示的数据
      dataItemListRow_i: 0, // 当前活动明细编辑展示的序列
      arrItemList: [], // 当前活动明细编辑添加的数据
      showHeader: true, // 是否显示表头 @:show-header
      tableSize: 'small', // @:size
      isShowPage: true, // 是否显示分页条
      limits: 10, // 多少条每页
      pages: 1, // 记录当前的页数
      setPageData: 0, // 当前点击页数，应该请求对应的数据
      pageType: 2, // 页面类型（决定表搜索框的样式）
      tableRowData: {}, // 表格当前一行的数据
      resourcesButton: [], // 权限按钮数据
      leftIsShowButton_r: false, // 左侧查询按钮是否显示
      leftIsShowButton_c: false, // 左侧添加按钮是否显示
      leftIsShowButton_d: false, // 左侧删除按钮是否显示
      rightIsShowButton_u: false, // 右侧修改按钮是否显示
      rightIsShowButton_d: false, // 右侧删除按钮是否显示
      rightIsShowButton_o: false, // 右侧开启/关闭按钮和重载按钮是否显示
      data_showType: [ // 活动界面类型（下拉框数据，暂时写死）
        {
          id: 1,
          val: '普通界面'
        },
        {
          id: 2,
          val: '每日充值界面'
        },
        {
          id: 3,
          val: '额外掉落界面'
        },
        {
          id: 4,
          val: '月卡福利界面'
        },
        {
          id: 5,
          val: '打折商品界面'
        },
        {
          id: 6,
          val: '限时礼包界面'
        }
      ],
      data_activityType: [ // 活动类型（下拉框数据，暂时写死）
        {
          id: 1,
          val: '累计充值'
        },
        {
          id: 2,
          val: '每日单笔充值'
        },
        {
          id: 3,
          val: '连续每日充值'
        },
        {
          id: 4,
          val: '累积消费'
        },
        {
          id: 5,
          val: '物品兑换'
        },
        {
          id: 6,
          val: '开服好礼'
        },
        {
          id: 7,
          val: '额外掉落'
        },
        {
          id: 8,
          val: '累积抽卡'
        },
        {
          id: 9,
          val: '等级礼包'
        },
        {
          id: 10,
          val: '成长计划'
        },
        {
          id: 11,
          val: '月卡福利'
        },
        {
          id: 12,
          val: '体力翻倍'
        },
        {
          id: 13,
          val: '精力翻倍'
        },
        {
          id: 14,
          val: '限时打折'
        },
        {
          id: 15,
          val: '超值返利'
        }
      ],
      data_timeType: [ // 时间类型（下拉框数据，暂时写死）
        {
          id: 1,
          val: '自然时间'
        },
        {
          id: 2,
          val: '开服时间'
        }
      ],
      data_status: [ // 活动状态（下拉框数据，暂时写死）
        {
          id: 1,
          val: '自动检测'
        },
        {
          id: 2,
          val: '长期显示'
        },
        {
          id: 3,
          val: '强制无'
        }
      ],
      data_resetType: [ // 重置类型（下拉框数据，暂时写死）
        {
          id: 0,
          val: '不重置'
        },
        {
          id: 1,
          val: '每日重置'
        },
        {
          id: 2,
          val: '每周一重置'
        },
        {
          id: 3,
          val: '表达式重置'
        }
      ],
      columnsSet: [ // 表头数据
        // {
        //   type: 'selection',      // 开启checkbox
        //   width: 60,
        //   align: 'center',
        //   fixed: 'left'
        // },
        {
          sortable: true,
          title: 'id',
          key: 'id',
          width: 100
        },
        {
          sortable: true,
          title: '服务器',
          key: 'serverName',
          width: 100
        },
        {
          sortable: true,
          title: '开始时间',
          key: 'startTime',
          width: 150
        },
        {
          sortable: true,
          title: '结束时间',
          key: 'endTime',
          width: 150
        },
        {
          sortable: true,
          title: '活动名称',
          key: 'name',
          width: 100
        },
        {
          sortable: true,
          title: '活动备注',
          key: 'remark',
          width: 100
        },
        {
          sortable: true,
          title: '界面类型',
          key: 'showType',
          width: 100
        },
        {
          sortable: true,
          title: '活动类型',
          key: 'activityType',
          width: 100
        },
        {
          sortable: true,
          title: '时间类型',
          key: 'timeType',
          width: 100
        },
        {
          sortable: true,
          title: '权重',
          key: 'weight',
          width: 100
        },
        {
          sortable: true,
          title: '活动状态',
          key: 'status',
          width: 100
        },
        {
          sortable: true,
          title: '重置类型',
          key: 'resetType',
          width: 100
        },
        {
          sortable: true,
          title: '重置表达式',
          key: 'resetExpression',
          width: 100
        },
        {
          sortable: true,
          title: '开服时间',
          key: 'openingTime',
          width: 100
        },
        {
          sortable: true,
          title: '图片',
          key: 'icon',
          width: 100
        },
        {
          sortable: true,
          title: '活动说明',
          key: 'info',
          width: 100
        },
        {
          sortable: true,
          title: '活动参数',
          key: 'params',
          width: 100
        },
        {
          sortable: true,
          title: '活动明细列表',
          key: 'itemList',
          width: 120,
          height: 50
        },
        {
          sortable: true,
          title: '是否开启',
          key: 'open',
          width: 100
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
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
                  color: '#5cadff',
                  display: this.rightIsShowButton_u ? 'inline-block' : 'none' // 权限操作
                },
                on: {
                  click: () => {
                    this.rightIsShowButton_u ? this.edit(params) : this.$Message.info('没有权限') // 权限操作
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
                    // this.seeTableRow = true
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
                  color: '#5cadff',
                  display: this.rightIsShowButton_o ? 'inline-block' : 'none' // 权限操作
                },
                on: {
                  click: () => {
                    this.rightIsShowButton_o ? this.openClose(params) : this.$Message.info('没有权限') // 权限操作
                  }
                }
              }, '开/关'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#5cadff',
                  display: this.rightIsShowButton_o ? 'inline-block' : 'none' // 权限操作
                },
                on: {
                  click: () => {
                    this.rightIsShowButton_o ? this.luckReload(params) : this.$Message.info('没有权限') // 权限操作
                  }
                }
              }, '重载'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#ff3300',
                  display: this.rightIsShowButton_d ? 'inline-block' : 'none' // 权限操作
                },
                on: {
                  click: () => {
                    this.rightIsShowButton_d ? this.remove(params) : this.$Message.info('没有权限') // 权限操作
                  }
                }
              }, '删除')
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
    // 'editModal' (val) {
    //   if (!val) {
    //     this.listDataShow = this.listDatas.slice(0, this.limits)
    //   }
    // }
  },
  methods: {
    reloadAll() {
      console.log(this.searchData)
      this.apiList4._get_(window.apiUrl.api_reloadAll, (res) => this.$Message.error("失败"), (res) => this.$Message.info('重载成功'));
    },
    /**
     * 获取表数据
     */
    getAddListData(data) {
      var _this = this
      this.loading2 = true
      // 请求数据
      var res = _this.apiList3.api_spiritygenneralcontroller_loadall(data)
      if (!res || res.hasOwnProperty('code')) {
        this.$Message.error(res.message)
        this.loading2 = false
        return
      }
      // 时间戳转换
      for (let i = 0; i < res.rows.length; i++) {
        if (res.rows[i].resetType === 0) {
          res.rows[i].resetType = '不重置'
        } else if (res.rows[i].resetType === 1) {
          res.rows[i].resetType = '每日重置'
        } else if (res.rows[i].resetType === 2) {
          res.rows[i].resetType = '每周一重置'
        } else if (res.rows[i].resetType === 3) {
          res.rows[i].resetType = '表达式重置'
        }
        if (res.rows[i].showType === 1) {
          res.rows[i].showType = '普通界面'
        } else if (res.rows[i].showType === 2) {
          res.rows[i].showType = '每日充值界面'
        } else if (res.rows[i].showType === 3) {
          res.rows[i].showType = '额外掉落界面'
        } else if (res.rows[i].showType === 4) {
          res.rows[i].showType = '月卡福利界面'
        } else if (res.rows[i].showType === 5) {
          res.rows[i].showType = '打折商品界面'
        } else if (res.rows[i].showType === 6) {
          res.rows[i].showType = '限时礼包界面'
        }
        if (res.rows[i].activityType === 1) {
          res.rows[i].activityType = '普通界面'
        } else if (res.rows[i].activityType === 2) {
          res.rows[i].activityType = '每日单笔充值'
        } else if (res.rows[i].activityType === 3) {
          res.rows[i].activityType = '连续每日充值'
        } else if (res.rows[i].activityType === 4) {
          res.rows[i].activityType = '累积消费'
        } else if (res.rows[i].activityType === 5) {
          res.rows[i].activityType = '物品兑换'
        } else if (res.rows[i].activityType === 6) {
          res.rows[i].activityType = '开服好礼'
        } else if (res.rows[i].activityType === 7) {
          res.rows[i].activityType = '额外掉落'
        } else if (res.rows[i].activityType === 8) {
          res.rows[i].activityType = '累积抽卡'
        } else if (res.rows[i].activityType === 9) {
          res.rows[i].activityType = '等级礼包'
        } else if (res.rows[i].activityType === 10) {
          res.rows[i].activityType = '成长计划'
        } else if (res.rows[i].activityType === 11) {
          res.rows[i].activityType = '月卡福利'
        } else if (res.rows[i].activityType === 12) {
          res.rows[i].activityType = '体力翻倍'
        } else if (res.rows[i].activityType === 13) {
          res.rows[i].activityType = '精力翻倍'
        } else if (res.rows[i].activityType === 14) {
          res.rows[i].activityType = '限时打折'
        } else if (res.rows[i].activityType === 15) {
          res.rows[i].activityType = '超值返利'
        }
        if (res.rows[i].timeType === 1) {
          res.rows[i].timeType = '自然时间'
        } else if (res.rows[i].timeType === 2) {
          res.rows[i].timeType = '开服时间'
        }
        if (res.rows[i].status === 1) {
          res.rows[i].status = '自动检测'
        } else if (res.rows[i].status === 2) {
          res.rows[i].status = '长期检测'
        } else if (res.rows[i].status === 3) {
          res.rows[i].status = '强制无'
        }
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
     * 点击编辑弹框
     */
    edit(params) {
      let arr = []
      this.addOrEdit = 2 // 标示编辑
      this.editModal = true
      let val = JSON.parse(JSON.stringify(params.row));
      console.log(val, "val");
      // alert(val.open)
      // val.open = val.open === '是' ? 1 : 0
      // alert(val.open)
      if (val.resetType === '不重置') {
        val.resetType = 0
      } else if (val.resetType === '每日重置') {
        val.resetType = 1
      } else if (val.resetType === '每周一重置') {
        val.resetType = 2
      } else if (val.resetType === '表达式重置') {
        val.resetType = 3
      }
      if (val.showType === '普通界面') {
        val.showType = 1
      } else if (val.showType === '每日充值界面') {
        val.showType = 2
      } else if (val.showType === '额外掉落界面') {
        val.showType = 3
      } else if (val.showType === '月卡福利界面') {
        val.showType = 4
      } else if (val.showType === '打折商品界面') {
        val.showType = 5
      } else if (val.showType === '限时礼包界面') {
        val.showType = 6
      }
      if (val.activityType === '普通界面') {
        val.activityType = 1
      } else if (val.activityType === '每日单笔充值') {
        val.activityType = 2
      } else if (val.activityType === '连续每日充值') {
        val.activityType = 3
      } else if (val.activityType === '累积消费') {
        val.activityType = 4
      } else if (val.activityType === '物品兑换') {
        val.activityType = 5
      } else if (val.activityType === '开服好礼') {
        val.activityType = 6
      } else if (val.activityType === '额外掉落') {
        val.activityType = 7
      } else if (val.activityType === '累积抽卡') {
        val.activityType = 8
      } else if (val.activityType === '等级礼包') {
        val.activityType = 9
      } else if (val.activityType === '成长计划') {
        val.activityType = 10
      } else if (val.activityType === '月卡福利') {
        val.activityType = 11
      } else if (val.activityType === '体力翻倍') {
        val.activityType = 12
      } else if (val.activityType === '精力翻倍') {
        val.activityType = 13
      } else if (val.activityType === '限时打折') {
        val.activityType = 14
      } else if (val.activityType === '超值返利') {
        val.activityType = 15
      }
      if (val.timeType === '自然时间') {
        val.timeType = 1
      } else if (val.timeType === '开服时间') {
        val.timeType = 2
      }
      if (val.status === '自动检测') {
        val.status = 1
      } else if (val.status === '长期检测') {
        val.status = 2
      } else if (val.status === '强制无') {
        val.status = 3
      }
      this.tableRowData = val // 当前行的数据
      // tableRowData里面的itemList需要单独处理
      this.tableRowData.itemList = JSON.parse(this.tableRowData.itemList)
      this.tableRowData.itemList.forEach((e) => {
        arr.push(JSON.stringify(e))
      })
      this.tableRowData.itemList = arr
    },

    /**
     * 点击编辑保存
     */
    tableEditClick(val) {
      // alert(1)
      this.$Spin.show()
      let val2 = this.copy(val)
      val2.endTime = new Date(val2.endTime).getTime()
      val2.startTime = new Date(val2.startTime).getTime()
      // alert(val2.open)
      val2.open = val2.open === '是' ? 1 : 0
      val2.itemList = '[' + val2.itemList + ']'
      var resE = this.apiList3.api_spiritygenneralcontroller_addorupdate(val2)
      // 编辑
      if (this.addOrEdit === 2) {
        if (resE) {
          this.$Message.info('保存成功')
        } else {
          this.$Message.info('保存失败')
        }
        console.log(this.selectDataClick, "this.selectDataClick")
        this.getAddListData(this.selectDataClick)
        console.log(this.listDatas, "this.listDatas")
        console.log(this.pages, "this.pages")
        console.log(this.limits, "this.limits");
        this.listDataShow = this.listDatas.slice((this.pages - 1) * this.limits, (this.pages - 1) * this.limits + this.limits)
        console.log(this.listDataShow, "this.listDataShow");
      }
      // 添加
      if (this.addOrEdit === 1) {
        if (resE) {
          this.$Message.info('添加成功')
        } else {
          this.$Message.info('添加失败')
        }
        console.log(this.selectDataClick, "this.selectDataClick")
        this.getAddListData(this.selectDataClick)
        this.listDataShow = this.listDatas.slice(0, this.limits)
      }
      this.editModal = false
      this.$Spin.hide()
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
     * 页码改变后截取当页数据显示
     */
    pageChange(page) {
      this.pages = page
      this.listDataShow = this.listDatas.slice((page - 1) * this.limits, (page - 1) * this.limits + this.limits)
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
      this.reload_table = res;
      let _this = this
      this.selectDataClick = res
      this.getAddListData(res)
      // 重置分页组件
      this.limits = 10
      this.isShowPage = false
      setTimeout(function() {
        _this.isShowPage = true
      })
    },

    /**
     * 对象合并
     */
    extend(target, source) {
      for (var obj in source) {
        target[obj] = source[obj]
      }
      return target
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
     * 内层活动明细弹框
     */
    editItemList(a, item, i) {
      // 编辑
      if (a === 2) {
        this.InAddOrEdit = 2 // 区分编辑和添加
        this.editModalIn = true
        this.dataItemListRow_i = i
        this.dataItemListRow = JSON.parse(item)
      }
      // 添加
      if (a === 1) {
        this.InAddOrEdit = 1
        this.editModalIn = true
        this.dataItemListRow = {}
      }
    },

    /**
     * 内层活动明细删除
     */
    deleteItemList(index) {
      // 外层添加
      if (this.addOrEdit === 1) {
        this.flagIN = false
        this.tableRowData.itemList.splice(index, 1)
        this.flagIN = true
      }
      if (this.addOrEdit === 2) {
        this.tableRowData.itemList.splice(index, 1)
      }
    },

    /**
     * 内层活动明细弹框修改
     */
    clickItemList(item) {
      // alert(1)
      // 外层编辑，内层编辑
      if (this.InAddOrEdit === 2 && this.addOrEdit === 2) {
        this.tableRowData.itemList[this.dataItemListRow_i] = JSON.stringify(item)
      }
      // 外层编辑，内层添加
      if (this.InAddOrEdit === 1 && this.addOrEdit === 2) {
        if ((JSON.stringify(item) === '{}')) {
          return
        }
        this.tableRowData.itemList.push(JSON.stringify(item))
      }
      // 外层添加，内层添加
      if (this.InAddOrEdit === 1 && this.addOrEdit === 1) {
        if ((JSON.stringify(item) === '{}')) {
          return
        }
        this.tableRowData.itemList = this.arrItemList
        this.tableRowData.itemList.push(JSON.stringify(item))
      }
      // 外层添加，内层编辑
      if (this.InAddOrEdit === 2 && this.addOrEdit === 1) {
        this.tableRowData.itemList[this.dataItemListRow_i] = JSON.stringify(item)
      }
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
                    活动名称：${this.listDataShow[index].name}<br>
                    活动备注：${this.listDataShow[index].remark}<br>
                    界面类型：${this.listDataShow[index].showType}<br>
                    活动类型：${this.listDataShow[index].activityType}<br>
                    时间类型：${this.listDataShow[index].timeType}<br>
                    权重：${this.listDataShow[index].weight}<br>
                    活动状态：${this.listDataShow[index].status}<br>
                    重置类型：${this.listDataShow[index].resetType}<br>
                    重置表达式：${this.listDataShow[index].resetExpression}<br>
                    开服时间：${this.listDataShow[index].openingTime}<br>
                    图片：${this.listDataShow[index].icon}<br>
                    活动说明：${this.listDataShow[index].info}<br>
                    活动参数：${this.listDataShow[index].params}<br>
                    活动明细列表：<div class="infoCss"><span>${this.listDataShow[index].itemList}</span></div><br>`
      })
    },

    /**
     * 开启或关闭
     */
    openClose(params) {
      let val = this.copy(params.row)
      if (val.activityType === '普通界面') {
        val.activityType = 1
      } else if (val.activityType === '每日单笔充值') {
        val.activityType = 2
      } else if (val.activityType === '连续每日充值') {
        val.activityType = 3
      } else if (val.activityType === '累积消费') {
        val.activityType = 4
      } else if (val.activityType === '物品兑换') {
        val.activityType = 5
      } else if (val.activityType === '开服好礼') {
        val.activityType = 6
      } else if (val.activityType === '额外掉落') {
        val.activityType = 7
      } else if (val.activityType === '累积抽卡') {
        val.activityType = 8
      } else if (val.activityType === '等级礼包') {
        val.activityType = 9
      } else if (val.activityType === '成长计划') {
        val.activityType = 10
      } else if (val.activityType === '月卡福利') {
        val.activityType = 11
      } else if (val.activityType === '体力翻倍') {
        val.activityType = 12
      } else if (val.activityType === '精力翻倍') {
        val.activityType = 13
      } else if (val.activityType === '限时打折') {
        val.activityType = 14
      } else if (val.activityType === '超值返利') {
        val.activityType = 15
      }
      let o = {
        name: val.serverName,
        id: val.id,
        type: 1,
        open: val.open === '是' ? 0 : 1
      }
      // alert(val.open)
      var res = this.apiList3.api_spiritygenneralcontroller_openorclose(o)
      console.log(res, "res");
      if (res.code == 0 || res.success == true || res.success == 'true') {
        this.$Message.info('操作成功')
        // this.getAddListData(this.reload_table);
        params.row.open = o.open == 1 ? "是" : "否";
        return
      }
      this.$Message.info('操作失败')
    },
    /**
     * 重载
     */
    luckReload(params) {
      let val = this.copy(params.row)
      if (val.activityType === '普通界面') {
        val.activityType = 1
      } else if (val.activityType === '每日单笔充值') {
        val.activityType = 2
      } else if (val.activityType === '连续每日充值') {
        val.activityType = 3
      } else if (val.activityType === '累积消费') {
        val.activityType = 4
      } else if (val.activityType === '物品兑换') {
        val.activityType = 5
      } else if (val.activityType === '开服好礼') {
        val.activityType = 6
      } else if (val.activityType === '额外掉落') {
        val.activityType = 7
      } else if (val.activityType === '累积抽卡') {
        val.activityType = 8
      } else if (val.activityType === '等级礼包') {
        val.activityType = 9
      } else if (val.activityType === '成长计划') {
        val.activityType = 10
      } else if (val.activityType === '月卡福利') {
        val.activityType = 11
      } else if (val.activityType === '体力翻倍') {
        val.activityType = 12
      } else if (val.activityType === '精力翻倍') {
        val.activityType = 13
      } else if (val.activityType === '限时打折') {
        val.activityType = 14
      } else if (val.activityType === '超值返利') {
        val.activityType = 15
      }
      let o = {
        name: val.serverName,
        id: val.id,
        type: 1
      }
      var res = this.apiList3.api_spiritygenneralcontroller_reload(o)
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
      var res = this.apiList3.api_spiritygenneralcontroller_delete(o)
      if (!res) {
        this.$Message.info('删除失败')
      } else {
        this.$Message.info('删除成功')
        this.getAddListData(this.selectDataClick)
      }
      this.deleteTip = false
    },

    /**
     * 使用模板
     */
    useTemp(data) {
      console.log(this.tableRowData)
      var o = {
        serverName: data.useTempServer,
        activityType: data.useTempName
      }
      var val = this.apiList3.api_spiritygenneralcontroller_template(o)
      if (!val) {
        return
      }
      val.open = val.open === '是' ? 1 : 0
      if (val.resetType === '不重置') {
        val.resetType = 0
      } else if (val.resetType === '每日重置') {
        val.resetType = 1
      } else if (val.resetType === '每周一重置') {
        val.resetType = 2
      } else if (val.resetType === '表达式重置') {
        val.resetType = 3
      }
      if (val.showType === '普通界面') {
        val.showType = 1
      } else if (val.showType === '每日充值界面') {
        val.showType = 2
      } else if (val.showType === '额外掉落界面') {
        val.showType = 3
      } else if (val.showType === '月卡福利界面') {
        val.showType = 4
      } else if (val.showType === '打折商品界面') {
        val.showType = 5
      } else if (val.showType === '限时礼包界面') {
        val.showType = 6
      }
      if (val.activityType === '普通界面') {
        val.activityType = 1
      } else if (val.activityType === '每日单笔充值') {
        val.activityType = 2
      } else if (val.activityType === '连续每日充值') {
        val.activityType = 3
      } else if (val.activityType === '累积消费') {
        val.activityType = 4
      } else if (val.activityType === '物品兑换') {
        val.activityType = 5
      } else if (val.activityType === '开服好礼') {
        val.activityType = 6
      } else if (val.activityType === '额外掉落') {
        val.activityType = 7
      } else if (val.activityType === '累积抽卡') {
        val.activityType = 8
      } else if (val.activityType === '等级礼包') {
        val.activityType = 9
      } else if (val.activityType === '成长计划') {
        val.activityType = 10
      } else if (val.activityType === '月卡福利') {
        val.activityType = 11
      } else if (val.activityType === '体力翻倍') {
        val.activityType = 12
      } else if (val.activityType === '精力翻倍') {
        val.activityType = 13
      } else if (val.activityType === '限时打折') {
        val.activityType = 14
      } else if (val.activityType === '超值返利') {
        val.activityType = 15
      }
      if (val.timeType === '自然时间') {
        val.timeType = 1
      } else if (val.timeType === '开服时间') {
        val.timeType = 2
      }
      if (val.status === '自动检测') {
        val.status = 1
      } else if (val.status === '长期检测') {
        val.status = 2
      } else if (val.status === '强制无') {
        val.status = 3
      }
      let arr = []
      val.itemList = val.items
      val.itemList.forEach((e) => {
        arr.push(JSON.stringify(e))
      })
      val.itemList = arr
      this.tableRowData = val
    },

    /**
     * loading
     */
    loading() {
      const msg = this.$Message.loading({
        content: 'Loading...',
        duration: 0
      })
      setTimeout(msg, 3000)
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
        // 右侧开启/关闭按钮和重载按钮
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
    },

    /**
     * 设置表格行样式
     */
    rowClassName(row, index) {
      return 'tableRowClass'
    }
  },
  created() {
    // 初始化表格数据
    // this.getAddListData(this.initPages)
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

.modalOutDiv2 {
  text-align: center;
  height: 350px;
  overflow: auto;

  .modalInDiv {
    padding: 10px;
  }
}

.tableRowClass .ivu-table-cell span {
  display: inline-block;
  height: 30px;
  overflow: auto;
  line-height: 30px;
}

.content-table {
  max-height: 800px;
  overflow: auto;
}

.col_update_delete {
  display: flex;
  margin: 7px 0;

  button {
    margin: 0 5px;
  }
}

.infoCss {
  height: 200px;
  overflow: auto;
  word-wrap: break-word;
}

</style>
