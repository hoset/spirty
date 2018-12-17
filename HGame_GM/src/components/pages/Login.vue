<template>
  <div class="login">
    <div class="bg">
    </div>
    <Modal class="login-modal" v-model="loginModal" width="360" :closable="false" :mask-closable="false">
      <div>
        <h2 style="margin:10px;color:#abcdef;text-align:center">
          <div class="h2Div">
            <!--<span class="h2Span1">-->
              <!--<img :src="require('@/assets/img/logo.png')" alt="" height="50">-->
            <!--</span>-->
            <span class="h2Span2">游戏后台管理系统</span>
          </div>
        </h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <Form-item prop="name">
            <Input v-model="formValidate.name" placeholder="请输入用户名" />
          </Form-item>
          <Form-item prop="password">
            <Input v-model="formValidate.password" @keyup.native.enter="handleSubmit('formValidate')" type="password" placeholder="请输入密码" />
          </Form-item>

          <Row>
            <Col span="12">
            <Checkbox-group v-model="formValidate.remember">
              <Checkbox label="记住我"></Checkbox>
            </Checkbox-group>
            </Col>
            <Col span="12">
              <a style="float:right" @click="toRegister"></a>
            </Col>
          </Row>

        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading" @click="handleSubmit('formValidate')">登录</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  // import Cookies from 'js-cookie'
  export default {
    name: 'login',
    data () {
      return {
        loginModal: true, // 是否显示登陆框
        modal_loading: false, // 点击loading
        // 存放用户名和密码
        formValidate: {
          name: '',
          password: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码错误', trigger: 'blur'}
          ]

        }
      }
    },
    methods: {
      // 点击登陆
      handleSubmit (name) { // login
        // 表单验证插件
        var _this = this
        this.$refs.formValidate.validate((valid) => {
          console.log(this.formValidate)
          var loginData = {
            userName: this.formValidate.name,
            password: this.formValidate.password
          }
          this.modal_loading = true
          var res = this.apiList3.api_login(loginData)
          if (!res || res.code !== 0) {
            _this.modal_loading = false
            _this.$Message.error('表单验证失败!')
            return
          }
          _this.modal_loading = false
          if (valid) {
            _this.$Message.success('登录成功!')
            // alert(_this.formValidate.name)
            // Cookies.set('userName', _this.formValidate.password)
            _this.$router.push('/addList')
          } else {
            _this.$Message.error('表单验证失败!')
          }
        })
      },
      toRegister () {
        this.$router.push('/register')
      }
    }
  }
</script>
<style lang="less">
</style>


