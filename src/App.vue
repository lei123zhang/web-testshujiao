<template>
    <div class="page-view">
        <div class="page-content">
            <div class="layout">
                <div class="topnav">
                       <router-link to="/about-notice">
                        {{topInfo.name}}
                    </router-link>
                </div>
                <div class="layout-ceiling">
                    <router-link to="/">
                        <div class="layout-logo"></div>
                    </router-link>
                    <div class="layout-ceiling-main">
                        <div class="header_nav">
                            <Menu :active-name="activeNav" theme="light" width="auto" :open-names="['1']">
                                <Submenu name="1">
                                    <router-link to="/">
                                        <MenuItem name="nav-index">{{$t("header.index")}}</MenuItem>
                                    </router-link>
                                    <router-link to="/otc/tradetradebuy/usdt">
                                        <MenuItem name="nav-otc">{{$t("header.otc")}}</MenuItem>
                                    </router-link>
                                     <router-link to="/exchange">
                                        <MenuItem name="nav-exchange">{{$t("header.exchange")}}</MenuItem>
                                    </router-link>
                                    <router-link to="/finance">
                                        <MenuItem name="nav-asset">{{$t("header.asset")}}</MenuItem>
                                    </router-link>
                                    <router-link to="/uc/safe">
                                        <MenuItem name="nav-uc">{{$t("header.ucenter")}}</MenuItem>
                                    </router-link>
                                    <router-link to="/help">
                                        <MenuItem name="nav-service">{{$t("header.service")}}</MenuItem>
                                    </router-link>
                                </Submenu>
                            </Menu>
                        </div>
                        <div class="rr">
                            <div class="login_register" v-if="isLogin">
                                <Dropdown>
                                    <a href="javascript:void(0)">
                                        <Icon type="person" style="font-size: 20px;vertical-align: middle;"></Icon>
                                        <span>{{member.name}}</span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <div @click="logout">
                                            <DropdownItem>
                                                <img src="./assets/images/logout.png"> {{$t("common.logout")}}
                                            </DropdownItem>
                                        </div>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div class="login_register" v-else>
                                <Menu active-name="1-1" theme="light" width="auto" :open-names="['2']">
                                    <Submenu name="2">
                                        <router-link to="/login" id="login">
                                            <MenuItem name="1-1">{{$t("common.login")}}</MenuItem>
                                        </router-link>
                                        <router-link to="/register" id="register">
                                            <MenuItem name="1-2">{{$t("common.register")}}</MenuItem>
                                        </router-link>
                                    </Submenu>
                                </Menu>
                            </div>
                            
                            <Dropdown @on-click="changelanguage">
                                <a style="width:90px;height:20px;line-height:20px;border:1px solid;border-radius:20px;padding:0 12px;" href="javascript:void(0)">
                                    {{languageValue}}
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="en">English</DropdownItem>
                                    <DropdownItem name="cn">简体中文</DropdownItem>
                                    <DropdownItem name="hk">繁体中文</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <router-view></router-view>
            <div class="footer">
                <div class="footer_content">
                    <div class="footer_left">
                        <img src="./assets/images/footer_logo.png"></img>
                        <p>{{$t("footer.gsmc")}}</p>
                        <p>Copyright © 2017 - 2018&nbsp;&nbsp;</p>
                    </div>
                    <div class="footer_right">
                         <ul>
                            <li class="footer_title">
                              <router-link to="/newhelp">
                               {{$t("footer.bzzx")}}
                                 </router-link>
                            </li>
                            <li>
                                <a href="#">{{$t("footer.xsrm")}}</a>
                            </li>
                            <li>
                                <a href="#">{{$t("footer.czzn")}}</a>
                            </li>
                            <li>
                                <a href="#">{{$t("footer.jyzn")}}</a>
                            </li>
                        </ul>
                        <ul>
                            <li class="footer_title">
                                <a href="#">{{$t("footer.ptsm")}}</a>
                            </li>
                            <li>
                               <router-link to="/newhelp">
                               {{$t("footer.gywm")}}
                                 </router-link>
                            </li>
                            <li>
                                <a href="#">{{$t("footer.jrwm")}}</a>
                            </li>
                            <li>
                                <a href="#">{{$t("footer.yqlj")}}</a>
                            </li>
                        </ul>
                       
                        <ul>
                            <li class="footer_title">
                                <a href="#">{{$t("footer.contact")}}</a>
                            </li>
                            <div class="footerimgicon">
                                <img src="./assets/images/microblog.png" alt="">
                                <img src="./assets/images/WeChatiocon.png" alt="">
                                <img src="./assets/images/Facebook.png" alt="">
                                <img src="./assets/images/twitter.png" alt="">
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "app",
  data() {
    return {
         topInfo:{name:'Ex数交所上线公告',remark:'aaaa',createTime:'2018-01-10 11:37:27'},
      languageValue: "简体中文",
      showFinance: false,
      showUser: false
    };
  },
  computed: {
    activeNav: function() {
      return this.$store.state.activeNav;
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    member: function() {
      return this.$store.getters.member;
    }
  },
  created: function() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$store.commit("navigate", "nav-index");
      console.log("app initialize");
      this.checkLogin();
      this.loadTopInfo();
    },
    loadTopInfo(){ /*获取首页顶部公告*/
          let param = {};
          param["sysAdvertiseLocation"] = 2;
          this.$http.post(this.host + '/uc/ancillary/system/advertise', param).then(response => {
            var result = response.body;
            if(result.code == 0 && result.data.length > 0){
              this.topInfo = result.data[0];
            }
          });
        },
    logout() {
      this.$http.post(this.host + "/uc/logout", {}).then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          this.$Message.success(resp.message);
          this.$store.commit("setMember", null);
          location.href = "/";
        } else {
          this.$Message.error(resp.message);
        }
      });
    },
    checkLogin() {
      this.$store.commit("recoveryMember");
      this.$http.post(this.host + "/uc/check/login", {}).then(response => {
        if (response.body.code == 0) {
          //使用本地存储的信息
          this.$store.commit("setMember", response.body.data);
        } else {
          this.$store.commit("setMember", null);
        }
      });
    },
    changelanguage: function(name) {
      if (name == "en") {
        this.languageValue = "English";
        this.$i18n.locale = "en";
      }
      if (name == "cn") {
        this.languageValue = "简体中文";
        this.$i18n.locale = "zh";
      }
      if (name == "hk") {
        this.languageValue = "繁体中文";
      }
    }
  }
};
</script>

<style>
/* top */
.ivu-select-selection .ivu-select-selected-value {
  color: #5f5f61;
}
.topnav {
  text-align: center;
  line-height: 25px;
  background: #1b262d;
}

.topnav a {
  color: #fff;
  font-size: 14px;
}

/*  */

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  border-right: none;
}

.header_nav .ivu-menu-vertical.ivu-menu-light:after {
  width: 0;
}

.header_nav .ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  background: none;
  color: #2d8cf0;
}
/*  */

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #263142;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

/*自定义滚动条样式*/

::-webkit-scrollbar {
  width: 10px;
  background: #0b0d1b;
}

::-webkit-scrollbar-thumb {
  background: #1f1b2a;
  border-radius: 25px;
}

.hide {
  display: none;
}

.blue {
  color: #6bf !important;
}

.red {
  color: #ae4e54 !important;
}

/* .ivu-input{
    background:#EAEDEE;
    border:0;
} */

.ivu-btn-info {
  background: #2aabfe;
  border-color: #2aabfe;
}

.ivu-btn-primary {
  /* background:#1855fd;
    border-color:#1855fd; */
}

.ivu-btn.active,
.ivu-btn:active {
  color: #fff;
  background: #2aabfe;
  border-color: #2aabfe;
}

.ivu-btn-text.active,
.ivu-btn-text:active {
  color: #2b85e4;
  background-color: transparent;
  border-color: transparent;
}

.ivu-btn.disabled,
.ivu-btn.disabled.active,
.ivu-btn.disabled:active,
.ivu-btn.disabled:focus,
.ivu-btn.disabled:hover,
.ivu-btn[disabled],
.ivu-btn[disabled].active,
.ivu-btn[disabled]:active,
.ivu-btn[disabled]:focus,
.ivu-btn[disabled]:hover,
fieldset[disabled] .ivu-btn,
fieldset[disabled] .ivu-btn.active,
fieldset[disabled] .ivu-btn:active,
fieldset[disabled] .ivu-btn:focus,
fieldset[disabled] .ivu-btn:hover {
  color: #fff;
  background: #54677f;
}

.ivu-carousel-dots li button {
  width: 30px;
  height: 10px;
  border-radius: 14px;
}

.ivu-menu-dark,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
  background: #18202a;
}

#checkbox {
  width: 10px;
}

#sendCode {
  position: absolute;
  border: 0;
  top: 0;
  right: 0;
  width: 30%;
  color: #d5851d;
  cursor: pointer;
}

.login_form {
  background: url(./assets/images/login_bg.jpg) no-repeat center;
  height: 760px;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.footerimgicon img{
  padding-right: 5px
}
.login_left {
  width: 50%;
  height: 400px;
  margin: 7% auto;
  background: #1e2125;
  position: relative;
  padding: 0 50px;
  color: #979797;
  font-size: 20px;
}

.login_right {
  position: absolute;
  background: #fff;
  width: 350px;
  height:620px;
  top: -55px;
  right: 50px;
}

.login_title {
  color: #000;
  text-align: center;
  height: 80px;
  font-size: 25px;
}

/* .login_right .ivu-select-selection{
        background:#EAEDEE;
} */

.login_right .ivu-select-dropdown {
  background: #fff;
}

.ivu-form-inline .ivu-form-item {
  display: block;
  margin-right: 0;
}

/* .user_center{
    padding:20px 10%;
}
.user_center .ivu-select-selection,.user_center .ivu-input{
    background:#263142;
    border:0;
    color:#fff;
}
.user_center .ivu-select-dropdown{
    background:#263142;
    color:#fff;
}
.user_center .ivu-select-item{
    color:#fff;
}
.user_center .ivu-select{
    color:#fff;
}
.user_center .ivu-select-item:hover,.user_center .ivu-select-item-selected,.user_center .ivu-select-item-selected:hover{
    background:#495060;
}
.user_center .ivu-table th{
        text-align:center;
        background:#28313E;
        color:#979797;
        border:0;
}
.user_center .ivu-table td{
        background:none;
        text-align:center;
        border-bottom:2px dashed #263142;
} */

.modify .ivu-input-wrapper {
  width: 40%;
}

.ivu-btn-ghost {
  /* color:#fff; */
}

.layout {
  position: relative;
}

.layout-logo {
  width: 100px;
  height: 40px;
  background: url(./assets/images/logo.png) no-repeat;
  background-size: 100% 100%;
  float: left;
  position: relative;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.layout-ceiling {
  padding: 20px 6%;
  background: #fff;
  overflow: hidden;
}

.layout-ceiling-main {
  /* float: left; */
  height: 40px;
  line-height: 40px;
  margin-left: 150px;
}

.layout-ceiling-main .rr {
  float: right;
}

.layout-ceiling-main .ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 0;
}

.layout-ceiling-main .ivu-menu-item {
  font-size: 14px;
}

.layout-ceiling-main a {
  color: #000;
  display: inline-block;
  line-height: 40px;
  height: 40px;
  text-align: center;
  margin-left: 30px;
}

.header_nav {
  float: left;
  margin-right: 20px;
}

.header_nav
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu
  .ivu-menu-item-active,
.header_nav
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu
  .ivu-menu-item-active:hover {
  background: url(./assets/images/menu_active.png) !important;
}

.login_register
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu
  .ivu-menu-item-active,
.login_register
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu
  .ivu-menu-item-active:hover {
  background: #1855fd;
  border-radius: 5px;
}

.login_register {
  float: left;
}

#login {
  background: #27abe2;
  border-radius: 5px;
}
#login li {
  color: #fff;
}
#login,
#register {
  color: #fff;
  display: inline-block;
  line-height: 25px;
  width: 75px;
  height: 25px;
  text-align: center;
  margin: 0;
}

.login_register a {
  margin-left: 0;
}

.ivu-dropdown-rel a {
  width: 100%;
}

.ivu-dropdown-menu {
  width: 100px;
}

.layout-ceiling-main .ivu-select-dropdown {
  background: #0b0d1b;
  margin-left: 25px;
}

.ivu-select-dropdown a {
  width: 100%;
  text-align: left;
  margin: 0;
}

.ivu-dropdown-item:hover {
  background: #aaa;
}

.ivu-dropdown-item {
  color: #fff;
}

.ivu-dropdown-item img {
  vertical-align: middle;
}

.ivu-radio-inner:after {
  background: #18202a;
}

/*安全中心*/

.user_center {
  height: 900px;
}

.ivu-menu-submenu-title {
  display: none;
}

.ivu-menu-item {
  text-align: center;
}

.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
  padding-left: 0 !important;
  padding-right: 0;
  color: #000;
  font-size: 16px;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
  background: #1855fd !important;
}

.rr .ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  background: none;
  color: #2d8cf0;
}

.rr .ivu-menu-vertical.ivu-menu-light:after {
  width: 0;
}

.layout_menu_right {
  margin-left: 3%;
  background: #18202a;
  color: #fff;
  padding-bottom: 130px;
}

.menu_right_title {
  font-size: 16px;
  line-height: 45px;
  margin: 0 10px;
  padding-left: 20px;
  border-bottom: 1px solid #263142;
}

/* .ivu-form .ivu-form-item-label{
        color:#fff;
    }
    .ivu-form-item-required .ivu-form-item-label:before{
        display:none;
    } */

.category .ivu-radio-group.ivu-radio-group-button {
  width: 100%;
}

.category .ivu-radio-group label {
  font-size: 14px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper {
  background: #28313e;
  color: #979797;
  border: 0;
  padding: 0 25px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper-checked {
  color: #fff;
  background: #2f3d52;
  box-shadow: none;
}

.category .ivu-radio-wrapper span {
  padding-left: 0;
}

.purse_address_left {
  float: left;
  width: 86%;
}

.purse_address p {
  font-size: 10px;
  line-height: 25px;
  color: #979797;
}

.purse_address_left_icon {
  line-height: 40px;
  height: 40px;
  width: 100%;
}

.purse_address_left_icon img {
  vertical-align: middle;
  margin-right: 10px;
}

.purse_address span {
  font-size: 14px;
  float: left;
  color: #fff;
  padding: 0 20px;
  background: #28313e;
  width: 21%;
}

.purse_address_left_icon label {
  float: left;
  width: 72%;
  height: 40px;
  border: 2px solid #28313e;
  padding-left: 20px;
}

#qrcode canvas {
  width: 120px;
}

#qrcode img {
  width: 100%;
}

.ivu-select-item:hover {
  background: #aaa;
}

.ivu-select-item-selected,
.ivu-select-item-selected:hover {
  background: #aaa;
}

.chart_container #chart_updated_time {
  float: left;
}

.footer {
  float: left;
  width: 100%;
}

.footer_content {
  height: 200px;
  padding: 50px 10%;
  color: #53575c;
  background: #1b262d;
}

.footer_left {
  float: left;
  font-size: 14px;
}

.footer_left img {
  margin: 15px 0;
}

.footer_left p {
  margin: 10px 0;
}

.footer_right {
  float: right;
  margin-top: 15px;
  text-align: left;
  /* margin-right: 20px; */
}

.footer_right ul {
  float: left;
  margin: 0 50px;
}

.footer_right ul li a {
  color: #fff;
  line-height: 25px;
  display: block;
}
.footer_title a {
  color: #9e9e9e !important;
  font-size: 16px;
}
.footer_title {
  font-size: 15px;
  height: 35px;
}

.ivu-select-selected-value {
  color: #bbbec4;
}

/*法币交易*/

.ivu-col {
  text-align: center;
}
</style>