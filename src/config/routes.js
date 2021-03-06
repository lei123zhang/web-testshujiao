import Vue from 'vue'
import Layout from '../public/layout'
import tradingcenter from '../pages/otc/TradingCenter'
import ordermanagement from '../pages/uc/OrderManagement'
import finance from '../pages/uc/Finance'
import membercenter from '../pages/uc/MemberCenter'
import tradeInfo from '../pages/otc/TradeInfo'
import homenotice from '../pages/cms/HomeNotice' /*首页公告*/
import checkuser from '../pages/otc/CheckUser'
import chat from '../pages/otc/Chat'
import notice from '../pages/cms/Notice'
import Noticedeails from '../pages/cms/Noticedeails'

import question from '../pages/cms/Question'
import agreement from '../pages/cms/Agreement'
import rate from '../pages/cms/Rate'
import moneyindex from '../components/uc/MoneyIndex'
import record from '../components/uc/Record'
import recharge from '../components/uc/Recharge'
import withdraw from '../components/uc/Withdraw'
import safe from '../components/uc/Safe'
import account from '../components/uc/Account'
import withdrawAddr from '../components/uc/WithdrawAddress'
import chatline from '../components/otc/Chatline'
import Index from '../pages/index/index'
import Login from '../pages/uc/login'
import identbusiness from '../pages/uc/IdentBusiness'
import newhelp from '../pages/cms/NewHelp'
import Register from '../pages/uc/register'
import FindPwd from '../pages/uc/findpwd'
import Exchange from '../pages/exchange/exchange'
import Help from '../pages/cms/help'
import Message from '../pages/cms/message'
import OTCMain from '../pages/otc/Main'
import OtcTradebuy from '../pages/otc/Tradebuy'
import OtcTradesale from '../pages/otc/Tradesale'
import OtcOrder from '../components/uc/myorder'
import OtcAd from '../components/otc/MyAd'
import adPublish from '../pages/otc/AdPublish'
import noticeindex from '../components/cms/NoticeDeails'
import UserProtocol from '../pages/cms/UserProtocol'

export default [
    { path: '/', component: Index },
    { path: '/index', component: Index },
    { path: '/login', component: Login },
    {path:'/UserProtocol',component:UserProtocol},
    { path: '/login/returnUrl/:returnUrl', component: Login },
    { path: '/register', component: Register },
    { path: '/findPwd', component: FindPwd },
    { path: '/exchange', component: Exchange },
    { path: '/exchange/*', component: Exchange },
    { path: '/help', component: Help },
    { path: '/notice', component: notice },
    {path:'/Noticedeails',component:Noticedeails},//jiu
    { path: '/message', component: Message },
    { path: '*', component: Index },
    {
        path: '/about-notice',
        component: homenotice
    },
    {  path: '/identbusiness',   component: identbusiness },
    {
        path: '/otc',
        component: OTCMain,
        children: [{
                path: 'tradetradesale/*',
                component: OtcTradesale
            },
            {
                path: 'tradetradebuy/*',
                component: OtcTradebuy
            },
            {
                path: 'ad',
                component: OtcAd
            },
            {
                path: 'ad/create',
                component: adPublish
            },
            {
                path: 'ad/update',
                component: adPublish
            },
            {
                path: 'order',
                component: OtcOrder
            },
           
        ]
    },
    {
        path: '/finance',
        component: finance,
        children: [{
                path: '',
                component: moneyindex
            },
            {
                path: 'index',
                component: moneyindex
            },
            {
                path: 'record',
                component: record
            },
            {
                path: 'recharge',
                component: recharge
            },
            {
                path: 'withdraw',
                component: withdraw
            },
            {
                path: 'withdraw/address',
                component: withdrawAddr
            },
        ]
    },
    {
        path: '/uc',
        component: membercenter,
        children: [{
                path: '',
                component: safe
            },
            {
                path: 'safe',
                component: safe
            },
            {
                path: 'account',
                component: account
            },
        ]
    },
    {
        name: 'tradeInfo',
        path: '/otc/tradeInfo',
        component: tradeInfo
    },
    {
        path: '/checkuser',
        component: checkuser
    },
    {
        path: '/chat',
        component: chat
    },
    {
        path: '/newhelp',
        component: newhelp,
        children: [{
                path: '',
                component: noticeindex
            },
            {
                path: 'index',
                component: noticeindex
            },
            {
                path: 'account',
                component: account
            },
        ]
    },
    {
        path: '/question',
        component: question
    },
    {
        path: '/agreement',
        component: agreement
    },
    {
        path: '/rate',
        component: rate
    }
];