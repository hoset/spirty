<!--活动 -> 限时运营活动-->
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
          <tableTopSearch v-if="leftIsShowButton_r"
            :id="pageType" :searchData="searchData"
            @on-click-search="onClickSearch"></tableTopSearch>

          <!--table-->
          <Table class="content-table"
                 :row-class-name="rowClassName"
                 :loading="loading2"
                 :show-header="showHeader"
                 :size="tableSize"
                 :data="listDataShow"
                 :columns="columnsSet"/>

          <!--分页-->
          <Page :total="pageNum" show-sizer show-elevator
                v-if="isShowPage"
                @on-change="pageChange"
                @on-page-size-change="PageSizeChange" id="page-click" />
        </Card>
      </Col>

      <!-- 编辑 -->
      <Modal v-model="editModal" @on-ok="tableEditClick(tableRowData)" width="650">
        <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>编辑</span>
        </p>
        <div class="modalOutDiv">
          <Form :label-width="120" class="modalInDiv">
            <!--<Row v-if="addOrEdit==1">
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
            </Row>-->
            <Row>
              <Col span="24">
                <Form-item label="服务器">
                  <Select v-model="tableRowData.serverName" filterable>
                    <Option v-for="item in searchData" :value="item.id" :key="item.id">{{ item.text }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="活动id">
                  <Input placeholder="请输入" v-model="tableRowData.activeId"></Input>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="活动开始时间">
                  <DatePicker class="sel-date" v-model="tableRowData.startTime" type="datetime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="活动结束时间">
                  <DatePicker class="sel-date" v-model="tableRowData.endTime" type="datetime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="激活选取条件">
                  <Select v-model="tableRowData.randomStatus" filterable>
                    <Option v-for="item in randomStatus" :value="item.id" :key="item.id">{{ item.val }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="結束条件">
                  <Input placeholder="请输入" v-model="tableRowData.overStatus"></Input>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="触发间隔时间">
                  <Input placeholder="请输入" v-model="tableRowData.interval"></Input>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="平台过滤">
                  <Input placeholder="请输入" v-model="tableRowData.filters"></Input>
                </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label="新增商品">
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
                <Form-item label="服务器">
                  <Select v-model="dataItemListRow.serverName" filterable>
                    <Option v-for="item in searchData" :value="item.id" :key="item.id">{{ item.text }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="活动id">
                  <Input placeholder="请输入"></Input>
                </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label="商品id">
                  <Input placeholder="请输入" v-model="dataItemListRow.productId"></Input>
                </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="展示的商品id">
                  <Input placeholder="请输入" v-model="dataItemListRow.showId"></Input>
                </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label="活动类型">
                  <Input placeholder="请输入" v-model="dataItemListRow.type"></Input>
                </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="名称">
                  <Input placeholder="请输入" v-model="dataItemListRow.name"></Input>
                </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label="货币类型">
                  <Input placeholder="请输入" v-model="dataItemListRow.cointype"></Input>
                </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="付费档位">
                  <Input placeholder="请输入" v-model="dataItemListRow.price"></Input>
                </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label="描述">
                  <Input placeholder="请输入" v-model="dataItemListRow.desc"></Input>
                </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="渠道过滤">
                  <Input placeholder="请输入" v-model="dataItemListRow.filter"></Input>
                </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label="道具字符串">
                  <Input placeholder="请输入" v-model="dataItemListRow.itemStr"></Input>
                </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="权重">
                  <Input placeholder="请输入" v-model="dataItemListRow.weight"></Input>
                </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label="持续时间">
                  <Input placeholder="请输入" v-model="dataItemListRow.duration"></Input>
                </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="結束条件">
                  <Select v-model="dataItemListRow.overStatus" filterable>
                    <Option v-for="item in overStatus" :value="item.id" :key="item.id">{{ item.val }}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>

      <!--查看-->
      <Modal v-model="isShowSee" width="500">
        <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>查看</span>
        </p>
        <div class="modalOutDiv">
          <Form :label-width="120" class="modalInDiv">
            <Row>
              <Col span="24">
                <Form-item label="服务器">
                  <div>{{seeRowData.serverName}}</div>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="活动id">
                  <div>{{seeRowData.activeId}}</div>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="活动开始时间">
                  <div>{{seeRowData.startTime}}</div>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="活动结束时间">
                  <div>{{seeRowData.endTime}}</div>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="激活选取条件">
                  <div>{{seeRowData.randomStatus}}</div>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="結束条件">
                  <div>{{seeRowData.overStatus}}</div>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="触发间隔时间">
                  <div>{{seeRowData.interval}}</div>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="平台过滤">
                  <div>{{seeRowData.filters}}</div>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="商品">
                  <div v-for="item in seeRowData.itemList">{{item}}</div>
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
    name: 'timeRunActivity',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        seeRowData: {},             // 当前行的数据
        isShowSee: false,           // 查看行弹出框
        selectDataClick: {},        // 表搜索参数
        seeTableRow: false,         // 点击查看表格行
        flagIN: true,               // 内层删除标记，暂时解决删除时候组件不更新问题
        useTempData: {},            // 使用模板参数
        searchData: [],             // 搜索数据
        modelIdSel: '',             // 接收下拉框id
        delUserId: 0,               // 当前需要删除的id
        delServerName: '',          // 当前需要删除的服务器名字
        deleteTip: false,           // 是否弹出删除提示框
        addOrEdit: 0,               // 用于区分添加和编辑（添加：1；编辑：2）
        InAddOrEdit: 0,             // 内层用于区分添加和编辑（添加：1；编辑：2）
        editModal: false,           // 编辑弹框是否弹出
        editModalIn: false,         // 内层活动明细编辑弹框是否弹出
        initPages: {                // 初始化加载第几页
          page: 1,
          rows: 10
        },
        loading2: false,            // 加载loading
        pageNum: 0,                 // 表格内容条数
        listDatas: [],              // 表格总数据
        listDataShow: [],           // 展示数据
        dataItemListRow: {},        // 当前活动明细编辑展示的数据
        dataItemListRow_i: 0,       // 当前活动明细编辑展示的序列
        arrItemList: [],            // 当前活动明细编辑添加的数据
        showHeader: true,           // 是否显示表头 @:show-header
        tableSize: 'small',         // @:size
        isShowPage: true,           // 是否显示分页条
        limits: 10,                 // 多少条每页
        pages: 0,                   // 记录当前的页数
        setPageData: 0,             // 当前点击页数，应该请求对应的数据
        pageType: 5,                // 页面类型（决定表搜索框的样式）
        tableRowData: {},           // 表格当前一行的数据
        resourcesButton: [],        // 权限按钮数据
        leftIsShowButton_r: false,  // 左侧查询按钮是否显示
        leftIsShowButton_c: false,  // 左侧添加按钮是否显示
        leftIsShowButton_d: false,  // 左侧删除按钮是否显示
        rightIsShowButton_u: false, // 右侧修改按钮是否显示
        rightIsShowButton_d: false, // 右侧删除按钮是否显示
        rightIsShowButton_o: false, // 右侧开启/关闭按钮和重载按钮是否显示
        overStatus: [
          {
            id: 1,
            val: '购买结束'
          },
          {
            id: 2,
            val: '到期结束'
          }
        ],
        randomStatus: [             // 激活选取条件
          {
            id: 1,
            val: '随机取一条'
          },
          {
            id: 2,
            val: '按权重取一条'
          }
        ],
        data_showType: [            // 活动界面类型（下拉框数据，暂时写死）
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
        data_activityType: [          // 活动类型（下拉框数据，暂时写死）
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
        data_timeType: [            // 时间类型（下拉框数据，暂时写死）
          {
            id: 1,
            val: '自然时间'
          },
          {
            id: 2,
            val: '开服时间'
          }
        ],
        data_status: [              // 活动状态（下拉框数据，暂时写死）
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
        data_resetType: [            // 重置类型（下拉框数据，暂时写死）
          {
            id: 0,
            val: '不重置'
          },
          {
            id: 2,
            val: '每日重置'
          },
          {
            id: 3,
            val: '每周一重置'
          },
          {
            id: 4,
            val: '表达式重置'
          }
        ],
        columnsSet: [               // 表头数据
          // {
          //   type: 'selection',      // 开启checkbox
          //   width: 60,
          //   align: 'center',
          //   fixed: 'left'
          // },
          {
            sortable: true,
            title: '活动id',
            key: 'activeId'
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
            title: '激活选取条件',
            key: 'randomStatus'
          },
          {
            sortable: true,
            title: '結束条件',
            key: 'overStatus'
          },
          {
            sortable: true,
            title: '触发间隔时间',
            key: 'interval'
          },
          {
            sortable: true,
            title: '渠道过滤',
            key: 'filters'
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
      /**
       * 获取表数据
       */
      getAddListData (data) {
        var _this = this
        this.loading2 = true
        // 请求数据
        this.apiList4._get_(window.apiUrl.api_selectallactivity, data, function (res) {
          console.log('error', res)
        }, function (res) {
          // 时间戳转换
          for (let i = 0; i < res.length; i++) {
            res[i].startTime = window.timeChange(res[i].startTime)
            res[i].endTime = window.timeChange(res[i].endTime)
          }
          _this.loading2 = false
          _this.pageNum = res.length // 总共条数
          _this.listDatas = res // 总数据
          _this.listDataShow = res.slice(0, 10) // 展示数据
        }, false)
      },

      /**
       * 获取服务器列表
       */
      getServerData () {
        var res = this.apiList3.api_spirityluckcontroller_server()
        if (!res) {
          return
        }
        this.searchData = res
      },

      /**
       * 点击编辑弹框
       */
      edit (params) {
        let arr = []
        this.addOrEdit = 2 // 标示编辑
        this.editModal = true
        let val = this.copy(params.row)
        // val.endTime = val.endTime.getTime()
        // val.startTime = val.startTime.getTime()
        // tableRowData里面的itemList需要单独处理
        val.itemList.forEach((e) => {
          arr.push(JSON.stringify(e))
        })
        val.itemList = arr
        this.tableRowData = val // 当前行的数据
      },

      /**
       * 点击编辑保存
       */
      tableEditClick (val) {
        let _this = this
        // console.log(val)
        this.$Spin.show()
        let val2 = this.copy(val)
        val2.endTime = new Date(val2.endTime).getTime()
        val2.startTime = new Date(val2.startTime).getTime()
        val2.itemListtemp = '[' + val2.itemList + ']'
        delete val2.itemList
        // 编辑
        if (_this.addOrEdit === 2) {
          this.apiList4._postj_(window.apiUrl.api_updateactivitybyid, val2, function (res) {
            _this.$Message.info('失败')
          }, function (resE) {
            if (resE) {
              _this.$Message.info('保存成功')
            } else {
              _this.$Message.info('保存失败')
            }
            _this.getAddListData(_this.selectDataClick)
            _this.listDataShow = _this.listDatas.slice((_this.pages - 1) * _this.limits, (_this.pages - 1) * _this.limits + _this.limits)
            _this.editModal = false
            _this.$Spin.hide()
          })
        }
        // 添加
        if (_this.addOrEdit === 1) {
          this.apiList4._postj_(window.apiUrl.api_addactivity, val2, function (res) {
            _this.$Message.info('失败')
          }, function (resE) {
            if (_this.addOrEdit === 1) {
              if (resE) {
                _this.$Message.info('添加成功')
              } else {
                _this.$Message.info('添加失败')
              }
              _this.getAddListData(_this.selectDataClick)
              // _this.listDataShow = _this.listDatas.slice(0, _this.limits)
            }
            _this.editModal = false
            _this.$Spin.hide()
          })
        }
      },

      /**
       * 点击添加弹框
       */
      tableAddClick () {
        this.addOrEdit = 1 // 标示添加
        this.editModal = true
        this.tableRowData = {}
      },

      /**
       * 页码改变后截取当页数据显示
       */
      pageChange (page) {
        this.pages = page
        this.listDataShow = this.listDatas.slice((page - 1) * this.limits, (page - 1) * this.limits + this.limits)
      },

      /**
       * 切换每页条数后，重新展示
       */
      PageSizeChange (limit) {
        this.limits = limit
        this.listDataShow = this.listDatas.slice(0, limit)
      },

      /**
       * 点击查询
       */
      onClickSearch (res) {
        let _this = this
        res = {
          name: res.server
        }
        this.selectDataClick = res
        this.getAddListData(res)
        // 重置分页组件
        this.limits = 10
        this.isShowPage = false
        setTimeout(function () {
          _this.isShowPage = true
        })
      },

      /**
       * 对象合并
       */
      extend (target, source) {
        for (var obj in source) {
          target[obj] = source[obj]
        }
        return target
      },

      /**
       * 对象拷贝
       */
      copy (obj) {
        var newobj = {}
        for (var attr in obj) {
          newobj[attr] = obj[attr]
        }
        return newobj
      },

      /**
       * 内层活动明细弹框
       */
      editItemList (a, item, i) {
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
      deleteItemList (index) {
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
      clickItemList (item) {
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
      show (index) {
        this.seeRowData = this.listDataShow[index]
        this.isShowSee = true
      },

      /**
       * 开启或关闭
       */
      openClose (params) {
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
          type: val.activityType,
          open: val.open === '是' ? 1 : 0
        }
        var res = this.apiList3.api_spiritygenneralcontroller_openorclose(o)
        if (!res) {
          this.$Message.info('操作失败')
          return
        }
        this.$Message.info('操作成功')
      },
      /**
       * 重载
       */
      luckReload (params) {
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
          type: val.activityType
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
      remove (params) {
        console.log(params)
        this.deleteTip = true
        this.delUserId = params.row.activeId
        this.delServerName = params.row.serverName
      },

      /**
       * 删除操作
       */
      deleteBatch () {
        let _this = this
        let o = {
          activeId: this.delUserId,
          name: this.delServerName
        }
        this.apiList4._get_(window.apiUrl.api_delectactivitybyid, o, function (res) {
          _this.$Message.info('删除失败')
        }, function (res) {
          if (res.code === 0) {
            _this.$Message.info('删除成功')
            _this.getAddListData(_this.selectDataClick)
          } else {
            _this.$Message.info('删除失败')
          }
        })
        _this.deleteTip = false
      },

      /**
       * 使用模板
       */
      useTemp (data) {
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
      loading () {
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
      powerButton () {
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
      timeChange (timestamp) {
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
      rowClassName (row, index) {
        return 'tableRowClass'
      }
    },
    created () {
      // 初始化表格数据
      // this.getAddListData(this.initPages)
      // 初始化服务器列表
      this.getServerData()
      // 初始化按钮
      this.powerButton()
    },
    mounted () {
      erd.listenTo(window, 'resize', this.handleResize)
    }
  }
</script>
<style lang="less">
  #page-click{
    margin-top: 20px;
  }
  .modalOutDiv{
    text-align: center;
    height: 500px;
    overflow: auto;
    .modalInDiv{
      padding: 10px;
    }
  }
  .modalOutDiv2{
    text-align: center;
    height: 350px;
    overflow: auto;
    .modalInDiv{
      padding: 10px;
    }
  }
  .tableRowClass .ivu-table-cell span{
    display: inline-block;
    height: 30px;
    overflow: auto;
    line-height: 30px;
  }
  .content-table{
    max-height: 800px;
    overflow: auto;
  }
  .col_update_delete{
    display: flex;
    margin: 7px 0;
    button{
      margin: 0 5px;
    }
  }
  .infoCss{
    height: 200px;
    overflow: auto;
    word-wrap: break-word;
  }
</style>

