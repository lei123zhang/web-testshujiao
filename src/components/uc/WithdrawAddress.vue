<template>
    <div class="contbox">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear record">
                <section class="trade-group merchant-top">
                    <i class="merchant-icon tips"></i>
                    <h1 class="tips-word">{{$t('asset.withdraw.addressmanager')}}</h1>
                </section>
                <section>
                    <div class="table-inner action-box open">
                        <div class="action-inner">
                            <div class="inner-left">
                                <p class="describe">{{$t('asset.withdraw.symbol')}}</p>
                                <Select v-model="coinType" style="width:100px;margin-top: 10px;" size="large">
                                    <Option v-for="item in coinList" :value="item" :key="item">{{ item }}</Option>
                                </Select>
                            </div>
                            <div class="inner-box deposit-address mt25">
                                <p class="describe">{{$t('asset.withdraw.address')}}</p>
                                <div class="title">
                                    <Input v-model="withdrawAddr" style="width: 90%;margin-top:10px;" size="large"></Input>
                                </div>
                            </div>
                            <div class="mt25">
                                <p class="describe">{{$t('asset.withdraw.remark')}}</p>
                                <div class="title">
                                    <Input v-model="remark" style="width:100%;margin-top:10px;" size="large"></Input>
                                </div>
                            </div>
                        </div>
                        <div class="btnbox">
                            <Button id="addrSubmit" @click='addAddr' size="large" type="primary" style="height:40px;width:20%">{{$t('asset.withdraw.add')}}</Button>
                        </div>
                        <div class="action-content">
                            <div class="action-body">
                                <p class="acb-p1 describe">{{$t('asset.withdraw.addresslist')}}</p>
                                <div class="order-table">
                                    <Table stripe :columns="tableColumnsRecharge" :data="dataRecharge"></Table>
                                    <div style="margin: 10px;overflow: hidden">
                                        <div style="float: right;">
                                            <Page :total="dataCount" :current="1" @on-change="changePage" :loading="loading"></Page>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <!-- model -->
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="email"></Icon>
                <span>{{$t('asset.withdraw.safevalidate')}}</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidateAddr" :model="formValidateAddr" :rules="ruleValidate" :label-width="85">
                    <!-- 手机号 -->
                    <FormItem :label="$t('asset.withdraw.telno')" prop="mobileNo" v-show="validPhone">
                        <Input disabled size="large" v-model="formValidateAddr.mobileNo"></Input>
                    </FormItem>
                    <!-- 手机验证码 -->
                    <FormItem :label="$t('asset.withdraw.smscode')" prop="vailCode2" v-show="validPhone">
                        <Input v-model="formValidateAddr.vailCode2" size="large">
                        <!-- <Button slot="append">点击获取</Button> -->
                        <div class="timebox" slot="append">
                            <Button @click="send(2)" :disabled="disbtn">
                                <span v-if="sendMsgDisabled2">{{time2+$t('asset.withdraw.second')}}</span>
                                <span v-if="!sendMsgDisabled2">{{$t('asset.withdraw.clickget')}}</span>
                            </Button>
                        </div>
                        </Input>
                    </FormItem>
                    <!-- 邮箱 -->
                    <FormItem :label="$t('asset.withdraw.email')" prop="email" v-show="validEmail">
                        <Input disabled v-model="formValidateAddr.email" size="large"></Input>
                    </FormItem>
                    <!-- 邮箱验证码 -->
                    <FormItem :label="$t('asset.withdraw.emailcode')" prop="vailCode1" v-show="validEmail">
                        <Input v-model="formValidateAddr.vailCode1" size="large">
                        <!-- <Button slot="append">点击获取</Button> -->
                        <div class="timebox" slot="append">
                            <Button @click="send(1)" :disabled="disbtn">
                                <span v-if="sendMsgDisabled1">{{time1+$t('asset.withdraw.second')}}</span>
                                <span v-if="!sendMsgDisabled1">{{$t('asset.withdraw.clickget')}}</span>
                            </Button>
                        </div>
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="handleSubmit('formValidateAddr')">{{$t('asset.withdraw.save')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>

export default {
    components: {
    },

    data() {
      var that = this;
        return {
            disbtn: false,
            dataCount: 10,
            loading: true,
            //else
            sendMsgDisabled1: false,
            sendMsgDisabled2: false,
            time1: 60, // 发送验证码倒计时
            time2: 60, // 发送验证码倒计时
            modal2: false,
            modal_loading: false,
            withdrawAddr: '',
            remark: '',
            coinType: '',
            validEmail: false,
            validPhone: false,
            coinList: [
            ],
            tableColumnsRecharge: [
                {
                    title: this.$t('asset.withdraw.symbol'),
                    key: 'unit',
                },
                {
                    title: this.$t('asset.withdraw.address'),
                    key: 'address'
                },
                {
                    title: this.$t('asset.withdraw.remark'),
                    key: 'remark'
                },
                {
                    title: this.$t('asset.withdraw.operate'),
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.del(params.row.id)
                                        this.getList(0, 10)
                                    }
                                }
                            }, that.$t('asset.withdraw.delete'),)
                        ]);
                    }
                }
            ],
            dataRecharge: [
            ],
            formValidateAddr: {
                mobileNo: '',
                vailCode2: '',
                email: '',
                vailCode1: '',
            },
            ruleValidate: {
                mobileNo: [
                    { required: this.validPhone, message: this.$t('asset.withdraw.telerr'), trigger: 'blur' }
                ],
                vailCode2: [
                    { required: this.validPhone, message: this.$t('asset.withdraw.codeerr'), trigger: 'change' }
                ],
                email: [
                    { required: this.validEmail, type: 'email', message: this.$t('asset.withdraw.emailerr'), trigger: 'blur' },
                ],
                vailCode1: [
                    { required: this.validEmail, message: this.$t('asset.withdraw.codeerr'), trigger: 'change' }
                ],

            },
        }
    },
    created() {
        this.getMember()
        this.getList(0, 10)
        this.coinType = this.$route.query.name
        this.getCoin()
    },
    methods: {
        getMember() {
            //获取个人安全信息
            this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    if (resp.data.mobilePhone) {
                        this.formValidateAddr.mobileNo = resp.data.mobilePhone
                        this.validPhone = true;
                        this.validEmail = false;
                    } else {
                        this.formValidateAddr.email = resp.data.email
                        this.validPhone = false;
                        this.validEmail = true;
                    }
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getCoin() {
            //币种
            this.$http.post(this.host + '/uc/withdraw/support/coin').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    for (let i = 0; i < resp.data.length; i++) {
                        this.coinList.push(resp.data[i]);
                    }
                }else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getList(pageNo, pageSize) {
            //获取地址
            let params = {}
            params['pageNo'] = pageNo
            params['pageSize'] = pageSize
            this.$http.post(this.host + '/uc/withdraw/address/page', params).then(response => {
                var resp = response.body;
                if (resp.code == 0 && resp.data.content) {
                    this.dataRecharge = resp.data.content;
                    this.dataCount = resp.data.totalElement
                }else {
                    this.$Message.error(resp.message);
                }
                this.loading = false
            })
        },
        remove(index) {
            this.dataRecharge.splice(index, 1);
        },
        send(index) {
            let me = this;
            this.disbtn = true
            if (index == 1) {
                if (this.formValidateAddr.email) {
                    //获取邮箱code
                    this.$http.post(this.host + '/uc/add/address/code').then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            this.$Message.success(resp.message);
                            me.sendMsgDisabled1 = true;
                            let interval = window.setInterval(function() {
                                if ((me.time1--) <= 0) {
                                    me.time1 = 60;
                                    me.sendMsgDisabled1 = false;
                                    window.clearInterval(interval);
                                    this.disbtn=false
                                }
                            }, 1000);
                        } else {
                            this.$Message.error(resp.message);
                            this.disbtn=false
                        }
                    })
                } else {
                    this.$refs.formValidateAddr.validateField('email');
                    this.disbtn=false
                }
            } else if (index == 2) {
                if (this.formValidateAddr.mobileNo) {
                    //获取手机code
                    this.$http.post(this.host + '/uc/mobile/add/address/code').then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            this.$Message.success(resp.message);
                            me.sendMsgDisabled2 = true;
                            let interval = window.setInterval(function() {
                                if ((me.time2--) <= 0) {
                                    me.time2 = 60;
                                    me.sendMsgDisabled2 = false;
                                    window.clearInterval(interval);
                                    this.disbtn=false
                                }
                            }, 1000);
                        } else {
                            this.$Message.error(resp.message);
                            this.disbtn=false
                        }
                    })

                } else {
                    this.$refs.formValidateAddr.validateField('mobileNo');
                    this.disbtn=false
                }

            }
        },
        addAddr() {
            if (!this.coinType) {
                this.$Message.warning(this.$t('asset.withdraw.symboltip'));
            } else if (!this.withdrawAddr) {
                this.$Message.warning(this.$t('asset.withdraw.addresstip'));
            } else if (!this.remark) {
                this.$Message.warning(this.$t('asset.withdraw.remarktip'));
            }
            else if (this.coinType && this.remark && this.withdrawAddr) {
                this.modal2 = true;
            }
        },
        changePage(index) {
            this.getList(index, 10, this.coinType)
        },
        del(id) {
          const title = this.$t('common.tip');
          const content = '<p>'+this.$t('common.delete')+'</p>';
          this.$Modal.confirm({
            title: title,
            content: content,
            onOk: () => {
              let params = {}
              params['id'] = id
              this.$http.post(this.host + '/uc/withdraw/address/delete', params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Message.success(resp.message);
                } else {
                  this.$Message.error(resp.message);
                }
                this.loading = false
              });
            },
            onCancel: () =>{

            }
          });
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.submit(name)
                } else {
                    this.$Message.error(this.$t('asset.withdraw.savemsg1'));
                }
            })
        },
        submit(name) {
            let param = {}
            param['address'] = this.withdrawAddr
            param['unit'] = this.coinType
            if (this.validPhone) {
                param['aims'] = this.formValidateAddr.mobileNo
                param['code'] = this.formValidateAddr.vailCode2
            } else {
                param['aims'] = this.formValidateAddr.email
                param['code'] = this.formValidateAddr.vailCode1
            }
            param['remark'] = this.remark

            this.$http.post(this.host + '/uc/withdraw/address/add', param).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(this.$t('asset.withdraw.savemsg2'));
                    this.getList(0, 10)
                    this.modal2 = false;
                } else {
                    this.$Message.error(resp.message);
                }

            })

        },

    },
    computed: {

    },
}
</script>

<style scoped>
.btnbox {
    text-align: right;
    padding: 25px 30px;
}

.tips-word {
    text-align: center;
    line-height: 100px;
    font-weight: normal;
}

.action-inner {
    display: table;
    padding: 0 30px;
    width: 100%;
}

.inner-left {
    display: table-cell;
    width: 15%;
}

.deposit-address {
    width: 45% !important;
}

.mt25 {
    display: table-cell;
    width: 43%;
}

p.describe {
    font-size: 16px;
    font-weight: 600;
}

.action-content {
    padding: 0 30px;
}








































/* common */

.contbox {
    padding-bottom: 30px;
}

.leftmenu a.router-link-active {
    background: #ebeff5;
    color: #00b5f6 !important;
}

.order-table {
    margin-top: 20px;
}

.content-wrap {
    background: #eee;
    min-height: 750px;
}

.container {

    padding-top: 30px;
    margin: 0 auto;
}

.contbox {
    background: #fff;
}







































/* cont */
</style>


