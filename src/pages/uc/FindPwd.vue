<template>
    <div class="login_form">
        <div class="login_left">
            <p style="padding-top:150px;">{{$t('uc.forget.hasaccount')}}</p>
            <router-link to="login">
                <Button style="background:#1E2125;width:130px;margin-top:50px;color:#fff;">{{$t('uc.forget.login')}}</Button>
            </router-link>
            <div class="login_right" style="padding:70px 30px;">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <FormItem style="text-align:center;">
                        <ButtonGroup>
                            <Button v-for="(list,index) in buttonLists" :key="list.text" :class="{ active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
                        </ButtonGroup>
                    </FormItem>
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" :placeholder="key">

                        </Input>
                    </FormItem>
                    <FormItem prop="code">
                        <Input style="width:68%" type="text" v-model="formInline.code" :placeholder="code">

                        </Input>
                        <input id="sendCode" @click="sendCode()" type="Button" :value="$t('uc.forget.sendcode')">

                        </input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" :placeholder="$t('uc.forget.newpwd')">

                        </Input>
                    </FormItem>
                    <FormItem prop="repassword">
                        <Input type="password" v-model="formInline.repassword" :placeholder="$t('uc.forget.confirmpwd')">

                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button style="width:100%;" type="info" @click="handleSubmit('formInline')">{{$t('uc.forget.save')}}</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data () {
            const validateRepassword = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error(this.$t('uc.forget.pwdvalidate1')));
                    } else if (value !== this.formInline.password) {
                        callback(new Error(this.$t('uc.forget.pwdvalidate2')));
                    } else {
                        callback();
                    }
            };
            return {
                buttonLists:[
                    {
                        "text":this.$t('uc.forget.resettelpwd')
                    },
                    {
                        "text":this.$t('uc.forget.resetemailpwd')
                    }
                ],
                changeActive:0,
                countdown:60,
                formInline: {
                    user: '',
                    code:'',
                    password: '',
                    repassword:''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: this.$t('uc.forget.newpwdtip'), trigger: 'blur' },
                        { type: 'string', min: 6, message: this.$t('uc.forget.pwdvalidate3'), trigger: 'blur' }
                    ],
                    repassword: [
                        { validator: validateRepassword, trigger: 'blur' },
                        { type: 'string', min: 6, message: this.$t('uc.forget.pwdvalidate3'), trigger: 'blur' }
                    ]
                },
                key:'',
                code:''
            }
        },
        watch:{
            changeActive:function(val){
                this.$refs['formInline'].resetFields();
　　　　　　 }
        },
        created:function(){
            this.init();
            this.actives(this.changeActive);
        },
        methods: {
            init(){
                this.$store.state.HeaderActiveName='1-4';
            },
            actives:function(index){
                this.changeActive=index;
                if(this.changeActive==0){
                    this.key=this.$t('uc.forget.telno');
                    this.code=this.$t('uc.forget.smscode');
                    this.ruleInline.user[0].message=this.$t('uc.forget.teltip');
                    this.ruleInline.code[0].message=this.$t('uc.forget.smscodetip');
                }else{
                    this.key=this.$t('uc.forget.email');
                    this.code=this.$t('uc.forget.emailcode');
                    this.ruleInline.user[0].message=this.$t('uc.forget.emailtip');
                    this.ruleInline.code[0].message=this.$t('uc.forget.emailcodetip');
                }
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success(this.$t('uc.forget.resetpwdsuccess'));
                    } else {

                    }
                })
            },
            settime(){
                var obj=document.getElementById('sendCode');
                if(this.countdown == 0) {
                    obj.removeAttribute("disabled");
                    obj.value = this.$t('uc.forget.sendcode');
                    this.countdown = 60;
                    return;
                } else {
                    obj.setAttribute("disabled", true);
                    obj.value = this.countdown;
                    this.countdown--;
                }
                var that=this;
                setTimeout(function() {
                    that.settime()
                }, 1000)

            },
            sendCode(){
                this.settime();
                var mobilePhone=this.formInline.user;
                if(mobilePhone==""){
                    this.countdown=0;
                    this.$Notice.error({
                        title: this.$t('common.tip'),
                        desc: this.ruleInline.user[0].message
                    });
                    return;
                }
                var that = this;
                this.$http.post(this.host+'/app/uc/mobile/code.do',{mobilePhone:mobilePhone}).then(response => {
                        var resp=response.body;
                        this.$Notice.error({
                            title: that.$t('common.tip'),
                            desc: that.$t('uc.forget.smswarn')
                        });
                        if(resp.code==0){

                        }else{
                            this.countdown=0;
                            this.$Notice.error({
                                title: that.$t('common.tip'),
                                desc: resp.message
                            });
                        }
                })
            }
        }
    }
</script>
