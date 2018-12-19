<template>
  <div class="app-wrapper" :class="{hideSidebar:!state.sidebar.opened,hoverSideBar:state.sidebar.minOpen}">
    <!-- 左侧 -->
    <div class="side-wrapper" :class="{hover:!state.sidebar.minOpened,light:theme=='light'}">
      <!-- logo -->
      <div style="height:50px;" class="logo-box">
        <img :src="require('@/assets/img/logo.png')" alt="" height="50" style="background: #fff" v-show="state.sidebar.opened">
        <img src="https://file.iviewui.com/dist/76ecb6e76d2c438065f90cd7f8fa7371.png" alt="" height="40" width="40"
             style="position: absolute;top: 5px;left: 0" v-show="!state.sidebar.opened">
      </div>
        <!-- 左侧导航 -->
        <nav-bar style="padding-bottom: 80px">
          <!--    <Menu width="220" :theme="theme" :accordion="true" @on-select="selectFn" :active-name="$route.path">
          <div v-for="(item,index) in menu " :key="index">
            嵌套部分
            <Submenu :name="index" v-if="item.childMenu && item.childMenu.length>0 && !item.hidden">
              图标文字
              <template slot="title">
                <i class="icon iconfont " :class="item.icon ? item.icon :'icon-collection'"></i>
                {{item.menuName}}
              </template>
              嵌套结构
              <div v-for="(sub,i) in item.childMenu" :key="i">
                <Menu-item :name="sub.path" v-if="!sub.hidden && sub.childMenu.length==0" s="noShow">
                  <div>
                    <i class="icon iconfont " :class="sub.icon ? sub.icon : 'icon-collection'"></i>
                    {{sub.menuName}}
                  </div>
                </Menu-item>
                <Submenu :name="i" v-if="sub.childMenu && sub.childMenu.length>0 && !sub.hidden">
                  图标文字
                  <template slot="title">
                    <i class="icon iconfont " :class="sub.icon ? sub.icon :'icon-collection'"></i>
                    {{sub.menuName}}
                  </template>
                  <Menu-item :name="subs.path" v-for="(subs,k) in sub.childMenu" :key="k" v-if="!subs.hidden">
                    <div>
                      <i class="icon iconfont " :class="subs.icon ? subs.icon : 'icon-collection'"></i>
                      {{subs.menuName}}
                    </div>
                  </Menu-item>
                </Submenu>
              </div>
            </Submenu>
            外层index
            <div>
              <Menu-item :name="item.path" :key="index"
                         v-if="item.childMenu.length==0 && !item.hidden ">
                <i class="icon iconfont " :class="item.icon ? item.icon :'icon-collection'"></i>
                {{item.menuName}}
              </Menu-item>
            </div>
          </div>
        </Menu> -->
          <Menu width="220" :theme="theme" :accordion="true" @on-select="selectFn" :active-name="$route.path">
            <Submenu v-for="(item,index) in menu" :name="item.id" :key="index">
              <template slot="title">
                <Icon type="ios-analytics" />
                {{item.menuName}}
              </template>
              <span v-for="(subItem,index) in item.childMenu" :key='index'>
                <MenuItem v-if="subItem.childMenu.length <=0" :name="subItem.path">
                  {{subItem.menuName}}
                </MenuItem>
                <Submenu v-else :name="subItem.id">
                  <template slot="title">
                      <Icon type="ios-analytics" />
                      {{subItem.menuName}}
                  </template>
                  <MenuItem v-for="(sonItem,index) in subItem.childMenu" :key="index" :name="sonItem.path">
                  {{sonItem.menuName}}
                </MenuItem>
                </Submenu>
              </span>
            </Submenu>
          </Menu>
        </nav-bar>
        <div class="theme-switch" :class="{hidden:!state.sidebar.opened}">
          Switch Theme
          <i-switch size="large" @on-change="themeChange" v-model="themeBool">
            <span slot="open">Dark</span>
            <span slot="close">Light</span>
          </i-switch>
        </div>
        <!-- 左侧导航 /-->
      </div>
      <!-- 左侧 /-->
      <!-- 主体 -->
      <div class="main-wrapper">
        <!-- 头部 -->
        <t-header>
          <!-- 用户信息 -->
          <Dropdown class="userBox" style="display: none" slot='right'>
            <a href="javascript:void(0)">
            Artiely
            <Icon type="arrow-down-b"></Icon>
          </a>
            <Dropdown-menu slot="list">
              <Dropdown-item @click.native="modalUser=true">个人信息</Dropdown-item>
              <Dropdown-item @click.native="logout">退出登录</Dropdown-item>
              <Dropdown-item @click.native="lock">锁定屏幕</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
          <!-- 用户信息 /-->
          <div class="messageBox" style="display: none" slot='msg-icon'>
            <Row>
              <Col :xs='{span:0}' :sm='{span:24}'>
              <Select v-model="lang" size="small" @on-change="changeLang" style="width:80px;position:relative;margin-top: -8px">
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <div class="iconBox">
                <Badge count="3">
                  <Tooltip placement="bottom" content="通知">
                    <Icon type="ios-bell">
                    </Icon>
                  </Tooltip>
                </Badge>
              </div>
              </Col>
            </Row>
          </div>
        </t-header>
        <!-- 头部 /-->
        <!-- 内容部分 -->
        <div class="main-container">
          <container>
            <!-- 面包屑 -->
            <Breadcrumb style="display: none;">
              <Breadcrumb-item href="/">
                <Icon type="ios-home-outline"></Icon>
                Home
              </Breadcrumb-item>
              <Breadcrumb-item>
                <Icon type="pound"></Icon>
                {{state.router.currentPageName}}
              </Breadcrumb-item>
            </Breadcrumb>
            <!-- 面包屑 /-->
            <!-- 路由 -->
            <transition :name="transSet" mode="out-in">
              <router-view></router-view>
            </transition>
            <!-- 路由/ -->
          </container>
        </div>
        <!-- 内容部分 /-->
      </div>
      <!-- 主体 /-->
      <Modal v-model="modalUser" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>此操作需要输入登录密码!</span>
        </p>
        <div style="text-align:center">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <Form-item prop="check_password">
              <Input v-model="formValidate.check_password" type="password" icon="ios-locked-outline" placeholder="请输入..." style="width: 300px"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="info" size="large" long :loading="modal_loading" @click="checkUser('formValidate')">确定</Button>
        </div>
      </Modal>
    </div>
</template>
<script>
import THeader from '@/components/layout/header/THeader'
import NavBar from '@/components/layout/navbar/NavBar'
import Container from '@/components/layout/container/Container'
// import menu from '@/router/menu'
import Cookies from 'js-cookie'

export default {
  name: 'full',
  components: {
    THeader,
    NavBar,
    Container
  },
  data() {
    const validatePass = (rule, value, callback) => {
      let password = Cookies.get('token')
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== password) {
        callback(new Error('密码错误'))
      } else {
        callback()
      }
    }
    return {
      theme: 'dark', // 主题
      themeBool: true,
      modalUser: false,
      modal_loading: false,
      transSet: 'fade',
      lang: 'CN',
      formValidate: {
        check_password: ''
      },
      menu:'', // 导航菜单
      ruleValidate: {
        check_password: [{
          validator: validatePass,
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    '$route'() {
      this.transSet = 'fade'
    }
  },
  created() {
    // if (Cookies.getJSON('menu')) {
    //   this.menu = Cookies.getJSON('menu')
    // }
    this.getLeftMenu()
    this.lang = this.$store.state.app.lang
  },
  computed: {
    state() {
      return this.$store.state.app
    },
    langList() {
      return this.$store.state.app.langList
    }
  },
  mounted() {},
  methods: {
    /**
     * 获取左侧动态菜单
     */
    getLeftMenu() {
      window.MEMU = []
      var res = this.apiList3.api_powermenu()
      if (!res) {
        this.$router.push('/login')
        return
      }
      this.menu = res
      window.MEMU = res
      console.log(this.menu)
    },
    // 查看个人信息密码验证
    checkUser(name) {
      this.modal_loading = true
      this.$refs[name].validate((valid) => {
        setTimeout(() => {
          if (valid) {
            this.$Message.success('验证成功')
            this.$router.push('/userInfo')
            this.modalUser = false
          } else {
            this.$Notice.warning({
              title: '提示',
              desc: '请求被拒绝'
            })
            this.$Message.error('表单验证失败!')
          }
          this.modal_loading = false
        }, 1000)
      })
    },
    /* 改变语言 */
    changeLang() {
      this.$store.commit('SET_LANG', this.lang)
      window.location.reload()
    },
    /**
     * 选择菜单
     */
    selectFn(routeUrl) {
      // alert(routeUrl)
      // console.log(this.$route.path)
      this.$router.push({
        path: routeUrl
      })
    },
    /**
     *退出
     */
    logout() {
      Cookies.remove('token')
      this.$router.push('/login')
      this.$Message.success('退出成功')
    },
    themeChange(state) {
      if (state) {
        this.theme = 'dark'
      } else {
        this.theme = 'light'
      }
    },
    lock() {
      // 设置为锁定
      this.$store.commit('SET_LOCK', '1')
      // 获取当前的页面path
      console.log(this.$route.path)
      this.$store.commit('SET_LOCK_PAGE', this.$route.path)
      this.$router.push('/lock')
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
