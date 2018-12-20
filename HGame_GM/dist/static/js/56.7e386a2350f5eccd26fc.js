webpackJsonp([56],{1070:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"login",data:function(){return{loginModal:!0,modal_loading:!1,formValidate:{name:"",password:""},ruleValidate:{name:[{required:!0,message:"用户名不能为空",trigger:"blur"}],password:[{required:!0,message:"密码错误",trigger:"blur"}]}}},methods:{handleSubmit:function(e){var a=this,t=this;this.$refs.formValidate.validate(function(e){var o={userName:a.formValidate.name,password:a.formValidate.password};a.modal_loading=!0;var r=a.apiList3.api_login(o);if(!r||0!==r.code)return t.modal_loading=!1,void t.$Message.error("表单验证失败!");t.modal_loading=!1,e?(t.$Message.success("登录成功!"),t.$router.push("/addList")):t.$Message.error("表单验证失败!")})},toRegister:function(){this.$router.push("/register")}}}},1184:function(e,a,t){(e.exports=t(783)(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"Login.vue",sourceRoot:""}])},1498:function(e,a,t){var o=t(1184);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);t(784)("6b42703b",o,!0,{})},1573:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"login"},[t("div",{staticClass:"bg"}),e._v(" "),t("Modal",{staticClass:"login-modal",attrs:{width:"360",closable:!1,"mask-closable":!1},model:{value:e.loginModal,callback:function(a){e.loginModal=a},expression:"loginModal"}},[t("div",[t("h2",{staticStyle:{margin:"10px",color:"#abcdef","text-align":"center"}},[t("div",{staticClass:"h2Div"},[t("span",{staticClass:"h2Span2"},[e._v("游戏后台管理系统")])])]),e._v(" "),t("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate}},[t("Form-item",{attrs:{prop:"name"}},[t("Input",{attrs:{placeholder:"请输入用户名"},model:{value:e.formValidate.name,callback:function(a){e.$set(e.formValidate,"name",a)},expression:"formValidate.name"}})],1),e._v(" "),t("Form-item",{attrs:{prop:"password"}},[t("Input",{attrs:{type:"password",placeholder:"请输入密码"},nativeOn:{keyup:function(a){if(!("button"in a)&&e._k(a.keyCode,"enter",13,a.key,"Enter"))return null;e.handleSubmit("formValidate")}},model:{value:e.formValidate.password,callback:function(a){e.$set(e.formValidate,"password",a)},expression:"formValidate.password"}})],1),e._v(" "),t("Row",[t("Col",{attrs:{span:"12"}},[t("Checkbox-group",{model:{value:e.formValidate.remember,callback:function(a){e.$set(e.formValidate,"remember",a)},expression:"formValidate.remember"}},[t("Checkbox",{attrs:{label:"记住我"}})],1)],1),e._v(" "),t("Col",{attrs:{span:"12"}},[t("a",{staticStyle:{float:"right"},on:{click:e.toRegister}})])],1)],1)],1),e._v(" "),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("Button",{attrs:{type:"primary",size:"large",long:"",loading:e.modal_loading},on:{click:function(a){e.handleSubmit("formValidate")}}},[e._v("登录")])],1)])],1)},staticRenderFns:[]}},790:function(e,a,t){var o=t(54)(t(1070),t(1573),function(e){t(1498)},null,null);e.exports=o.exports}});