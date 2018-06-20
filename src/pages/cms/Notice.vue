<template>
    <div class="help">
        
        <div class="help_container">
            <div style="line-height: 40px;">{{$t("service.CallNoticeCenter")}}</div>
            
            <Col span="24" style="padding:0 2%;color:#000;font-size:18px;background:#fff">
                
                <div v-for="item in FAQList" class="faqlist">  
                    <div @click="noticedeail(item)">{{item.title}}
                        <span style="float:right">{{item.createTime}}</span>
                    </div>
                </div>
               
            </Col>
          
        </div>
          <Col span="24" style="padding:100px 0;">

           <Page :total="totalPages" :pageSize="pageSize" :current="pageNo" @on-change="loadDataPage"></Page>

         </Col>
    </div>
</template>
<style>
.faqlist div:hover{
cursor:pointer
}
.help {
  background: #F8F9FB;
  /* background:url(/assets/images/help_bg.png) no-repeat center; */
  height: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.help_container {
  padding: 0 12%;
  height: 100%;
}
.ivu-col-span-7 {
  text-align: center;
  background: #fff;
  border: 1px solid #323232;
  border-radius: 15px;
  margin: 50px 2% 10px 2%;
  color: #000;
  overflow: hidden;
}
.ivu-col-span-7 div {
  background: #323232;
}
.ivu-col-span-7 h2 {
  padding-top: 15px;
  line-height: 35px;
  font-size: 22px;
  font-weight: 500;
}
.ivu-col-span-7 p {
  font-size: 15px;
  line-height: 35px;
  padding-bottom: 15px;
}
.ivu-col-span-7 img {
  margin: 15px 0;
      height: 42px;
}
.ivu-col-span-7 button {
  width: 50%;
  margin: 10px 0;
  color: #fff;
  background: #464647;
  font-size: 15px;
}
.ivu-col-span-7 button:hover {
  background: #464650;
}
.help_container .ivu-table th {
  text-align: center;
  background: #a3a3a3;
  color: #28313e;
  border: 0;
}
.help_container .ivu-table td {
  background: none;
  text-align: center;
  background: #7c7c7c;
  opacity: 0.5;
}
.help_container .ivu-table tr:last-child td {
  border: 0;
}
.faqlist{
text-align: left;

}
.faqlist p{
    background: whitesmoke;
    line-height: 51px;
    padding:0 15px;
}
.faqlist div{
    color:#777;
    font-size: 14px;
    line-height:26px;
    padding:15px 15px;
    word-wrap: break-word;
    border-bottom: 1px solid #ececec;
}
</style>
<script>
export default {
  data() {
    return {
       pageNo:1,
      pageSize:10,
      totalPages:0,
      FAQList: [
      ],
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.$store.state.HeaderActiveName = "1-7";
      this.loadDataPage(this.pageNo);
    },
    loadDataPage(pageIndex){
        var param = {};
        param["pageNo"] = pageIndex,
        param["pageSize"] = this.pageSize,
        this.$http.post(this.host + this.api.uc.announcement, param).then(response => {
          var resp = response.body;
          if(resp.code==0){
            console.log(resp)
            this.FAQList = resp.data.list;
            this.totalPages = resp.data.totalNumber;
          }else{
            
            this.$Notice.error({
              title: this.$t('common.tip'),
              desc: resp.message
            });
          }
        });
    },
    noticedeail(item){
      console.log(item,6666)
      this.$router.push({ path: "/Noticedeails", query: { id: item.id } });
   
    }
  }
};
</script>
