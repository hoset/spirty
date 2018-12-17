<template>
  <!--0-->
  <Row v-if="id==0" :gutter="30" class="rows-style">
    <Col span="4">
      <div class="sels-div">
        <span class="sel-fwqtext">服务器id：</span>
        <span class="sel-fwqid">
          <Select v-model="model11" filterable multiple :disabled="arr_three[0]">
            <Option v-for="item in serverIdGroup" :value="item.serverId" :key="item.serverId">{{ item.serverName }}</Option>
          </Select>
        </span>

      </div>
    </Col>
    <Col span="4">
      <div class="sels-div">
        <span>渠道id：</span>
        <Select class="sel-fwqid" v-model="model12" filterable multiple :disabled="arr_three[1]">
          <Option v-for="item in channelIdGroup" :value="item.channelId" :key="item.channelId">{{ item.channelName }}</Option>
        </Select>
      </div>
    </Col>
    <Col span="4">
      <div class="sels-div">
        <span>渠道appid：</span>
        <Select class="sel-fwqid" v-model="model13" filterable multiple :disabled="arr_three[2]">
          <Option v-for="(item, i) in channelAppIdGroup" :value="item.channelAppId" :key="item.channelAppId">{{ item.channelAppName }}</Option>
        </Select>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>开始日期：</span>
        <DatePicker class="sel-date" type="date" v-model="startTimes" @on-change="onChangeTimes(1, startTimes)" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>截止日期：</span>
        <DatePicker class="sel-date" type="date" v-model="endTimes" @on-change="onChangeTimes(2, endTimes)" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </Col>
    <Col span="2">
      <Button type="info" @click="search">查询</Button>
    </Col>
    <Col span="4">
      <CheckboxGroup size="large" v-model="checkBoxLabel">
        <Checkbox label="服务器id"></Checkbox>
        <Checkbox label="渠道id"></Checkbox>
        <Checkbox label="渠道Appid"></Checkbox>
      </CheckboxGroup>
    </Col>
  </Row>

  <!--1-->
  <Row v-else-if="id==1" :gutter="8" class="rows-style">
    <Col span="4">
      <div class="sels-div">
        <span>用户名：</span>
        <Input v-model="valueIpt" placeholder="Enter something..." clearable style="width: 200px"></Input>
      </div>
    </Col>
    <Col span="4">
      <Button type="info" @click="search">查询</Button>
    </Col>
  </Row>

  <!--2-->
  <Row v-else-if="id==2" :gutter="8" class="rows-style">
    <Col span="4">
      <div class="sels-div">
        <span class="sel-fwqtext">选择服务器：</span>
        <span class="sel-fwqid">
          <Select v-model="model11" filterable>
            <Option v-for="item in searchData" :value="item.id" :key="item.id">{{ item.text }}</Option>
          </Select>
        </span>

      </div>
    </Col>

    <Col span="4">
      <div class="sels-div">
        <span>id：</span>
        <Input v-model="valueIpt" placeholder="Enter something..." clearable style="width: 200px"></Input>
      </div>
    </Col>
    <Col span="4">
      <Button type="info" @click="search">查询</Button>
    </Col>
  </Row>

  <!--3-->
  <Row v-else-if="id==3" :gutter="8" class="rows-style">
    <Col span="4">
      <div class="sels-div">
        <span class="sel-fwqtext">选择服务器：</span>
        <span class="sel-fwqid">
          <Select v-model="model11" filterable>
            <Option v-for="item in searchData" :value="item.id" :key="item.id">{{ item.text }}</Option>
          </Select>
        </span>

      </div>
    </Col>

    <Col span="8">
      <div class="sels-div">
        <span>id/账户名：</span>
        <Input v-model="valueIpt2" placeholder="玩家账户或者id 多个需用/分隔" clearable style="width: 400px"></Input>
      </div>
    </Col>
    <Col span="2">
      <Button type="info" @click="search">查询</Button>
    </Col>
  </Row>

  <!--4-->
  <Row v-else-if="id==4" :gutter="8" class="rows-style">
    <Col span="4">
      <div class="sels-div">
        <span class="sel-fwqtext">选择服务器：</span>
        <span class="sel-fwqid">
          <Select v-model="model11" filterable>
            <Option v-for="item in searchData" :value="item.id" :key="item.id">{{ item.text }}</Option>
          </Select>
        </span>

      </div>
    </Col>

    <Col span="4">
      <div class="sels-div">
        <span class="sel-fwqtext2">玩家id：</span>
        <Input v-model="pid" placeholder="" clearable></Input>
      </div>
    </Col>

    <Col span="4">
      <div class="sels-div">
        <span>开始日期：</span>
        <DatePicker class="sel-date" type="date" v-model="startTimes" @on-change="onChangeTimes(1, startTimes)" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </Col>
    <Col span="4">
      <div class="sels-div">
        <span>截止日期：</span>
        <DatePicker class="sel-date" type="date" v-model="endTimes" @on-change="onChangeTimes(2, endTimes)" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </Col>
    <Col span="2">
      <Button type="info" @click="search">查询</Button>
    </Col>
  </Row>

  <!--5-->
  <Row v-else-if="id==5" :gutter="8" class="rows-style">
    <Col span="4">
      <div class="sels-div">
        <span class="sel-fwqtext">选择服务器：</span>
        <span class="sel-fwqid">
          <Select v-model="model11" filterable>
            <Option v-for="item in searchData" :value="item.id" :key="item.id">{{ item.text }}</Option>
          </Select>
        </span>

      </div>
    </Col>
    <Col span="2">
      <Button type="info" @click="search">查询</Button>
    </Col>
  </Row>

  <!--6-->
  <Row v-else-if="id==6" :gutter="15" class="rows-style">
    <Col span="4">
      <div class="sels-div">
        <span class="sel-fwqtext">服务器id：</span>
        <span class="sel-fwqid">
          <Select v-model="model11" filterable multiple :disabled="arr_three[0]">
            <Option v-for="item in serverIdGroup" :value="item.serverId" :key="item.serverId">{{ item.serverName }}</Option>
          </Select>
        </span>

      </div>
    </Col>
    <Col span="4">
      <div class="sels-div">
        <span>渠道id：</span>
        <Select class="sel-fwqid" v-model="model12" filterable multiple :disabled="arr_three[1]">
          <Option v-for="item in channelIdGroup" :value="item.channelId" :key="item.channelId">{{ item.channelName }}</Option>
        </Select>
      </div>
    </Col>
    <Col span="4">
      <div class="sels-div">
        <span>渠道appid：</span>
        <Select class="sel-fwqid" v-model="model13" filterable multiple :disabled="arr_three[2]">
          <Option v-for="(item, i) in channelAppIdGroup" :value="item.channelAppId" :key="item.channelAppId">{{ item.channelAppName }}</Option>
        </Select>
      </div>
    </Col>
    <Col span="4">
      <Button type="info" @click="search">查询</Button>
    </Col>
    <Col span="4">
      <CheckboxGroup size="large" v-model="checkBoxLabel">
        <Checkbox label="服务器id"></Checkbox>
        <Checkbox label="渠道id"></Checkbox>
        <Checkbox label="渠道Appid"></Checkbox>
      </CheckboxGroup>
    </Col>
  </Row>

  <!--7-->
  <Row v-else-if="id==7" :gutter="30" class="rows-style">
    <Col span="4">
      <div class="sels-div">
        <span class="sel-fwqtext">服务器id：</span>
        <span class="sel-fwqid">
          <Select v-model="model14" filterable>
            <Option v-for="item in serverIdGroup" :value="item.serverId" :key="item.serverId">{{ item.serverName }}</Option>
          </Select>
        </span>

      </div>
    </Col>
    <Col span="4">
      <div class="sels-div">
        <span>渠道id：</span>
        <Select class="sel-fwqid" v-model="model15" filterable>
          <Option v-for="item in channelIdGroup" :value="item.channelId" :key="item.channelId">{{ item.channelName }}</Option>
        </Select>
      </div>
    </Col>
    <Col span="4">
      <div class="sels-div">
        <span>渠道appid：</span>
        <Select class="sel-fwqid" v-model="model16" filterable>
          <Option v-for="(item, i) in channelAppIdGroup" :value="item.channelAppId" :key="item.channelAppId">{{ item.channelAppName }}</Option>
        </Select>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>开始日期：</span>
        <DatePicker class="sel-date" type="date" v-model="startTimes" @on-change="onChangeTimes(1, startTimes)" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>截止日期：</span>
        <DatePicker class="sel-date" type="date" v-model="endTimes" @on-change="onChangeTimes(2, endTimes)" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </Col>
    <Col span="2">
      <Button type="info" @click="search">查询</Button>
    </Col>
  </Row>

  <!--8-->
  <Row v-else-if="id==8" :gutter="30" class="rows-style">
    <Col span="3">
      <div class="sels-div">
        <span class="sel-fwqtext">服务器id：</span>
        <span class="sel-fwqid">
          <Select v-model="model14" filterable>
            <Option v-for="item in serverIdGroup" :value="item.serverId" :key="item.serverId">{{ item.serverName }}</Option>
          </Select>
        </span>

      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>渠道id：</span>
        <Select class="sel-fwqid" v-model="model15" filterable>
          <Option v-for="item in channelIdGroup" :value="item.channelId" :key="item.channelId">{{ item.channelName }}</Option>
        </Select>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>渠道appid：</span>
        <Select class="sel-fwqid" v-model="model16" filterable>
          <Option v-for="(item, i) in channelAppIdGroup" :value="item.channelAppId" :key="item.channelAppId">{{ item.channelAppName }}</Option>
        </Select>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>玩家id：</span>
        <Input placeholder="请输入" v-model="model17"></Input>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>角色名：</span>
        <Input placeholder="请输入" v-model="model18"></Input>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>开始日期：</span>
        <DatePicker class="sel-date" type="date" v-model="startTimes" @on-change="onChangeTimes(1, startTimes)" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>截止日期：</span>
        <DatePicker class="sel-date" type="date" v-model="endTimes" @on-change="onChangeTimes(2, endTimes)" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </Col>
    <Col span="2">
      <Button type="info" @click="search">查询</Button>
    </Col>
  </Row>

  <!--8-->
  <Row v-else-if="id==9" :gutter="30" class="rows-style">
    <Col span="3">
      <div class="sels-div">
        <span class="sel-fwqtext">服务器id：</span>
        <span class="sel-fwqid">
          <Select v-model="model14" filterable>
            <Option v-for="item in serverIdGroup" :value="item.serverId" :key="item.serverId">{{ item.serverName }}</Option>
          </Select>
        </span>

      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>渠道id：</span>
        <Select class="sel-fwqid" v-model="model15" filterable>
          <Option v-for="item in channelIdGroup" :value="item.channelId" :key="item.channelId">{{ item.channelName }}</Option>
        </Select>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>渠道appid：</span>
        <Select class="sel-fwqid" v-model="model16" filterable>
          <Option v-for="(item, i) in channelAppIdGroup" :value="item.channelAppId" :key="item.channelAppId">{{ item.channelAppName }}</Option>
        </Select>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>玩家id：</span>
        <Input placeholder="请输入" v-model="model17"></Input>
      </div>
    </Col>
    <Col span="2">
      <div class="sels-div">
        <span>角色名：</span>
        <Input placeholder="请输入" v-model="model18"></Input>
      </div>
    </Col>
    <Col span="2">
      <div class="sels-div">
        <span>道具id：</span>
        <Input placeholder="请输入" v-model="model19"></Input>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>开始日期：</span>
        <DatePicker class="sel-date" type="date" v-model="startTimes" @on-change="onChangeTimes(1, startTimes)" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </Col>
    <Col span="3">
      <div class="sels-div">
        <span>截止日期：</span>
        <DatePicker class="sel-date" type="date" v-model="endTimes" @on-change="onChangeTimes(2, endTimes)" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
      </div>
    </Col>
    <Col span="2">
      <Button type="info" @click="search">查询</Button>
    </Col>
  </Row>
</template>

<script>
  export default {
    // searchData: 父级组件传入的搜索联动数据, id: 不同的表
    props: ['id', 'searchData'],
    name: 'tableTopSearch',
    data () {
      return {
        arr_three: [],
        a: '服务器id',
        b: '渠道id',
        c: '渠道Appid',
        a1: false,
        a2: false,
        a3: false,
        a1_2_3: {},
        pid: '', // 玩家id
        valueIpt2: '', // 账户查询页面使用
        startTimes: '', // 开始时间
        endTimes: '', // 结束时间
        valueIpt: '',
        isDisable: false, // 是否禁用下拉选择
        model11: [],
        model12: [],
        model13: [],
        model14: '',
        model15: '',
        model16: '',
        model17: '',
        model18: '',
        model19: '',
        qdId: [], // 渠道id数据（第二级）
        qdAppId: [], // 渠道AppId（第三级）
        query: {}, // 获取需要传出的搜索数据
        arr: [],
        serverIdGroup: [], // 单独存放服务器id
        channelIdGroup: [], // 单独存放渠道id
        channelAppIdGroup: [], // 单独存放渠道appid
        checkBoxLabel: [], // 选择框的label
        strArrCheckBoxLalel: ''
      }
    },
    mounted () {
      if (this.id === 0 || this.id === 6 || this.id === 7 || this.id === 8 || this.id === 9) {
        this.searchGroup()
      }
    },
    methods: {
      /**
       * 搜索
       */
      search () {
        if (this.id === 0 || this.id === 6) {
          let o = {
            serverIds: this.model11 || '',
            channelIds: this.model12 || '',
            channelAppIds: this.model13 || '',
            startDate: new Date(this.startTimes).getTime() || '',
            endDate: new Date(this.endTimes).getTime() || ''
          }
          this.$emit('on-click-search', o)
        }
        if (this.id === 1) {
          // this.query.currentPage = 1
          this.$emit('on-click-search', this.valueIpt)
        }
        if (this.id === 2) {
          let o = {
            name: this.model11
          }
          if (this.valueIpt !== '') {
            o.id = this.valueIpt
          }
          this.$emit('on-click-search', o)
        }
        if (this.id === 3) {
          let o = {
            name: this.model11,
            id: this.valueIpt2
          }
          this.$emit('on-click-search', o)
        }
        if (this.id === 4) {
          let o = {
            name: this.model11,
            pid: this.pid,
            startTime: this.startTimes,
            endTime: this.endTimes
          }
          this.$emit('on-click-search', o)
        }
        if (this.id === 5) {
          let o = {
            server: this.model11
          }
          this.$emit('on-click-search', o)
        }
        if (this.id === 7) {
          if (this.model14 === '') {
            this.$Message.info('服务器id必填')
            return
          }
          let o = {
            serverId: this.model14 || '',
            channelId: this.model15 || '',
            channelAppId: this.model16 || '',
            startDate: new Date(this.startTimes).getTime() || '',
            endDate: new Date(this.endTimes).getTime() || ''
          }
          this.$emit('on-click-search', o)
        }
        if (this.id === 8) {
          if (this.model14 === '') {
            this.$Message.info('服务器id必填')
            return
          }
          let o = {
            serverId: this.model14 || '',
            channelId: this.model15 || '',
            channelAppId: this.model16 || '',
            pid: this.model17 || '',
            pname: this.model18 || '',
            startDate: new Date(this.startTimes).getTime() || '',
            endDate: new Date(this.endTimes).getTime() || ''
          }
          this.$emit('on-click-search', o)
        }
        if (this.id === 9) {
          if (this.model14 === '') {
            this.$Message.info('服务器id必填')
            return
          }
          if (this.startTimes === '' || this.endTimes === '') {
            this.$Message.info('起止时间必填')
            return
          }
          let o = {
            serverId: this.model14 || '',
            channelId: this.model15 || '',
            channelAppId: this.model16 || '',
            pid: this.model17 || '',
            pname: this.model18 || '',
            itemId: this.model19 || '',
            startDate: new Date(this.startTimes).getTime() || '',
            endDate: new Date(this.endTimes).getTime() || ''
          }
          this.$emit('on-click-search', o)
        }
      },

      /**
       * 搜索数据分类
       */
      searchGroup () {
        this.serverIdGroup = this.searchData
        for (let i = 0; i < this.searchData.length; i++) {
          for (let j = 0; j < this.searchData[i].channelIds.length; j++) {
            this.channelIdGroup.push(this.searchData[i].channelIds[j])
          }
        }
        this.channelIdGroup = this.arrayUnique2(this.channelIdGroup, 'channelId')
        for (let i = 0; i < this.channelIdGroup.length; i++) {
          for (let j = 0; j < this.channelIdGroup[i].channelAppIds.length; j++) {
            this.channelAppIdGroup.push(this.channelIdGroup[i].channelAppIds[j])
          }
        }
        this.channelAppIdGroup = this.arrayUnique2(this.channelAppIdGroup, 'channelAppId')
      },

      /**
       * 选择时间： a:1开始时间 ，a:2:结束时间
       */
      onChangeTimes (a, b) {
        if (a === 1) {
          if (b === '') {
            this.query.startDate = ''
            return
          }
          this.query.startDate = b.getTime()
        }
        if (a === 2) {
          if (b === '') {
            this.query.endDate = ''
            return
          }
          this.query.endDate = b.getTime()
        }
        // 开始时间大于结束时间
        if (typeof (this.query.startDate) === 'number' && typeof (this.query.endDate) === 'number') {
          if (this.query.startDate > this.query.endDate) {
            this.query.startDate = ''
            this.query.endDate = ''
            this.startTimes = ''
            this.endTimes = ''
            this.$Message.info('时间输入有误，重新输入')
          }
        }
      },

      /**
       * 数组里面对象去重
       */
      unique4 (arr) {
        var hash = []
        for (var i = 0; i < arr.length; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
              ++i
            }
          }
          hash.push(arr[i])
        }
        return hash
      },

      /**
       * 根据数组内对象的字段来进行数组去重
       */
      arrayUnique2 (arr, name) {
        var hash = {}
        return arr.reduce(function (item, next) {
          hash[next[name]] ? '' : hash[next[name]] = true && item.push(next)
          return item
        }, [])
      }
    },
    watch: {
      'checkBoxLabel' (a) {
        let map = new Map()
        this.arr_three = [] // important：需清空数组才能使组件继续渲染，坑。。。。
        map.set('服务器id', false)
        map.set('渠道id', false)
        map.set('渠道Appid', false)
        for (let i = 0; i < a.length; i++) {
          map.set(a[i], true)
        }
        for (let val of map.values()) {
          this.arr_three.push(val)
        }
        let o1 = {
          serverId: this.serverIdGroup,
          channelIds: this.channelIdGroup,
          channelAppIds: this.channelAppIdGroup
        }
        console.log(this.arr_three)
        console.log(o1)
        let o
        this.strArrCheckBoxLalel = a.toString()
        if (a.toString().indexOf(this.a) !== -1) {
          let arr = []
          this.a1 = false
          this.a2 = true
          this.a3 = true
          for (let i = 0; i < this.serverIdGroup.length; i++) {
            arr.push(this.serverIdGroup[i].serverId)
          }
          o = {
            serverIds: arr
          }
        }
        if (a.toString().indexOf(this.b) !== -1) {
          let arr = []
          this.a1 = true
          this.a2 = false
          this.a3 = true
          for (let i = 0; i < this.channelIdGroup.length; i++) {
            arr.push(this.channelIdGroup[i].channelId)
          }
          o = {
            channelIds: arr
          }
        }
        if (a.toString().indexOf(this.c) !== -1) {
          let arr = []
          this.a1 = true
          this.a2 = true
          this.a3 = false
          for (let i = 0; i < this.channelAppIdGroup.length; i++) {
            arr.push(this.channelAppIdGroup[i].channelAppId)
          }
          o = {
            channelAppIds: arr
          }
        }
        if (a.toString().indexOf(this.a) !== -1 && a.toString().indexOf(this.b) !== -1) {
          let arr = []
          let arr1 = []
          this.a1 = false
          this.a2 = false
          this.a3 = true
          for (let i = 0; i < this.serverIdGroup.length; i++) {
            arr.push(this.serverIdGroup[i].serverId)
          }
          for (let i = 0; i < this.channelIdGroup.length; i++) {
            arr1.push(this.channelIdGroup[i].channelId)
          }
          o = {
            serverIds: arr,
            channelIds: arr1
          }
        }
        if (a.toString().indexOf(this.b) !== -1 && a.toString().indexOf(this.c) !== -1) {
          let arr = []
          let arr1 = []
          this.a1 = true
          this.a2 = false
          this.a3 = false
          for (let i = 0; i < this.channelIdGroup.length; i++) {
            arr.push(this.channelIdGroup[i].channelId)
          }
          for (let i = 0; i < this.channelAppIdGroup.length; i++) {
            arr1.push(this.channelAppIdGroup[i].channelAppId)
          }
          o = {
            channelIds: arr,
            channelAppIds: arr1
          }
        }
        if (a.toString().indexOf(this.a) !== -1 && a.toString().indexOf(this.c) !== -1) {
          let arr = []
          let arr1 = []
          this.a1 = false
          this.a2 = true
          this.a3 = false
          for (let i = 0; i < this.serverIdGroup.length; i++) {
            arr.push(this.serverIdGroup[i].serverId)
          }
          for (let i = 0; i < this.channelAppIdGroup.length; i++) {
            arr1.push(this.channelAppIdGroup[i].channelAppId)
          }
          o = {
            serverIds: arr,
            channelAppIds: arr1
          }
        }
        if (a.toString().indexOf(this.a) !== -1 && a.toString().indexOf(this.b) !== -1 && a.toString().indexOf(this.c) !== -1) {
          // let arr = []
          // let arr1 = []
          // let arr2 = []
          this.a1 = false
          this.a2 = false
          this.a3 = false
          // for (let i = 0; i < this.serverIdGroup.length; i++) {
          //   arr.push(this.serverIdGroup[i].serverId)
          // }
          // for (let i = 0; i < this.channelIdGroup.length; i++) {
          //   arr1.push(this.channelIdGroup[i].channelId)
          // }
          // for (let i = 0; i < this.channelAppIdGroup.length; i++) {
          //   arr2.push(this.channelAppIdGroup[i].channelAppId)
          // }
          // o = {
          //   serverIds: arr,
          //   channelIds: arr1,
          //   channelAppIds: arr2
          // }
          o = {}
        }
        if (this.strArrCheckBoxLalel === '') {
          this.a1 = false
          this.a2 = false
          this.a3 = false
          o = {}
        }
        // 对外传出
        this.a1_2_3 = {
          a1: this.a1,
          a2: this.a2,
          a3: this.a3
        }
        this.$emit('on-click-watch-show', this.a1_2_3, o)
      }
      // // 搜索选择第一级监听
      // 'model11' (a) {
      //   if (a instanceof Array) {
      //     this.query.serverIds = a
      //   } else {
      //     this.query.serverIds = []
      //     this.query.serverIds.push(a)
      //   }
      //   this.searchData.forEach((e) => {
      //     if (e.serverId === a) {
      //       this.qdId = e.channelIds
      //     }
      //   })
      // },
      // // 搜索选择第二级监听
      // 'model12' (a) {
      //   if (a instanceof Array) {
      //     this.query.channelIds = a
      //   } else {
      //     this.query.channelIds = []
      //     this.query.channelIds.push(a)
      //   }
      //   this.qdAppmodel11Id = []
      //   this.qdAppId = []
      //   this.qdId.forEach((e) => {
      //     for (let i = 0; i < a.length; i++) {
      //       if (e.channelId === a[i]) {
      //         this.qdAppId = this.qdAppId.concat(e.channelAppIds)
      //       }
      //     }
      //   })
      //   this.qdAppId = this.channelAppIds.push(a)
      //   this.qdAppId = this.arrayUnique2(this.qdAppId, 'channelAppId') // 根据channelAppId字段进行去重
      // },
      // // 搜索三级监听
      // 'model13' (a) {
      //   if (a instanceof Array) {
      //     this.query.channelAppIds = a
      //   } else {
      //     this.query.channelAppIds = []
      //     this.query.channelAppIds.push(a)
      //   }
      // }
    }
  }
</script>

<style lang="less" scoped>
  .rows-style{
    align-items: center;
    padding: 5px;
    display: flex;
    margin-bottom: 10px;
  }
  .sels-div{
    display: flex;
    align-items: center;
    .sel-fwqid, .sel-date{
      display: inline-block;
      flex: 1;
    }
    .ivu-input-wrapper{
      flex: 1;
    }
  }
  .sel-fwqtext2 {
    display: inline-block;
    width: 70px;
  }
</style>
