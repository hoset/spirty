<!--活动 -> 虚拟充值-->
<template>
  <div class="list-lb">
    <Row>
      <Button type="success" @click="showModal()">
        点击虚拟充值
      </Button>
      <!--gm开关弹框-->
      <Modal v-model="priceEditModal" @on-ok="okTableEditClick(serverId, playerId, productId, instat)">
        <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>虚拟充值</span>
        </p>
        <div style="text-align:center">
          <Form :label-width="80">

            <Form-item label="服务器">
              <Select filterable v-model="serverId">
                <Option v-for="item in searchData" :value="item.id" :key="item.id">{{item.text}}</Option>
              </Select>
            </Form-item>
            <Form-item label="玩家id">
              <Input placeholder="请输入" v-model="playerId"></Input>
            </Form-item>
            <Form-item label="充值档位">
              <Input placeholder="请输入" v-model="productId"></Input>
            </Form-item>
            <Form-item label="是否记录">
              <Select filterable v-model="instat">
                <Option v-for="item in instatO" :value="item.id" :key="item.id">{{item.val}}</Option>
              </Select>
            </Form-item>
          </Form>
        </div>
      </Modal>
    </Row>
    <Row id="classRow" :gutter="8" >
      <Col span="12">
        <div class="sels-div">
          <span class="sel-fwqtext">服务器id：</span>
          <span class="sel-fwqid">
            <Select v-model="model11" filterable multiple>
              <Option v-for="item in searchData" :value="item.id" :key="item.id">{{item.text}}</Option>
            </Select>
          </span>
          <Button type="success" class="buttonCz" @click="clickCz">
            点击重置
          </Button>
        </div>
      </Col>
    </Row>
    <Row id="classRow" :gutter="8" >
      <Col span="12">
        <div class="sels-div">
          <span class="sel-fwqtext">服务器id：</span>
          <span class="sel-fwqid">
            <Select v-model="model12" filterable>
              <Option v-for="item in searchData" :value="item.id" :key="item.id">{{item.text}}</Option>
            </Select>
          </span>
          <Button type="success" class="buttonCz" @click="clickTime">
            查看时间
          </Button>
          <span>{{timeStr}}</span>
        </div>
      </Col>
    </Row>

    <!--更新失败提示  -->
    <Modal v-model="updateModalIsShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>更新失败</span>
      </p>
      <div style="text-align:center">
        {{updateByError}}
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="updateModalIsShow = !updateModalIsShow">确定</Button>
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
    name: 'fictitiousPrice',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        timeStr: '',
        model12: '',
        updateByError: '', // 错误内容
        updateModalIsShow: false, // 更新服务器失败的弹框
        model11: [],
        serverId: 0, // 服务器id
        searchData: [], // 获取服务器列表
        priceEditModal: true, // 弹框默认弹出
        playerId: '', // 玩家id
        productId: '', // 商品id
        instat: '', // 是否记录
        instatO: [
          {
            id: 0,
            val: '不记录'
          },
          {
            id: 1,
            val: '记录'
          }
        ] // 是否记录
      }
    },
    /**
     * watch
     */
    watch: {
    },
    methods: {
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
       * 确认充值
       */
      okTableEditClick (val1, val2, val3, val4) {
        let o = {
          serverName: val1,
          playerId: val2,
          productId: val3,
          instat: val4
        }
        var res = this.apiList3.api_spirityrechargecontroller_addrecharge(o)
        if (!res || res.code !== 0) {
          this.$Message.info('充值失败')
          return
        }
        this.$Message.info('充值成功')
      },

      /**
       * 点击重置
       */
      clickCz () {
        let _this = this
        let a = this.model11
        this.apiList4._postj_(window.apiUrl.api_resetdoublediamond, a, function (res) {
          _this.$Message.info('重置失败')
        }, function (res) {
          if (res.code !== 0) {
            _this.updateModalIsShow = true
            _this.updateByError = res.message
            _this.$Message.info('重置失败')
          } else {
            _this.$Message.info('重置成功')
          }
        }, false)
      },

      /**
       * 点击查看时间
       */
      clickTime () {
        let _this = this
        let o = {
          serverName: this.model12
        }
        this.apiList4._get_(window.apiUrl.api_getlastresetdoublediamondtime, o, function (res) {
          _this.$Message.info('出错')
        }, function (res) {
          _this.$Message.info('success')
          let a = _this.timeChange(res.time)
          _this.timeStr = a
        }, false)
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
       * 点击弹框
       */
      showModal () {
        this.priceEditModal = !this.priceEditModal
      }
    },
    created () {
      this.getServerData()
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
  #classRow {
    margin-top: 20px;
  }
  .sels-div {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .buttonCz {
    margin-right: 10px;
    margin-left: 10px;
  }
</style>

