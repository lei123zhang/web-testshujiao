<template>
    <div class="agreement">
      <img src="../../assets/images/call.png">
        <div class="content-wrap">
            <div class="ww">
                <div class="container" id="List">
                    <div class="agreen-cont ">
                        <h2>{{title}}</h2>
                        <h4 class="h4">{{createTime}}
                        </h4>
                        <p v-html="content">{{content}}</p>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.agreement {
  background-color: #fff;
  text-align: center;
}
h2{
  border-bottom: 1px solid #ececec;
}
.content-wrap{
   background-color: #fff;
  width: 1200px;
  margin: 0 auto;
}
.agreement .agreen-cont h2 {
  text-align: center;
  font-size: 24px;
  font-weight: 100;
  margin: 10px 0;
}
.agreement .agreen-cont .h4 {
  line-height: 1.6;
}
.agreement .agreen-cont h4 {
  margin: 10px 0;
  font-size: 14px;
  font-weight: 100;
}
.agreement .agreen-cont p {
  line-height: 2;
}
</style>
<script>
export default {
  data() {
    return {
        title:'--',
        content:'',
        createTime:''
    };
  },
  created() {
    this.initData();
    // this.page = page++;
  },
  methods: {
    initData() {
      this.outData();
      },
    outData() {
      let id = this.$route.query.id;
      console.log( this.api.uc.announcementdeails+`${id}`,9999);
     
      this.$http
        .get(this.host + this.api.uc.announcementdeails+`${id}`)
        .then(res => {
            
            this.title = res.data.data.title;
            this.content = res.data.data.content;
            this.createTime = res.data.data.createTime;
        })
        .catch(e => {
          
        });
    }
  }
};
</script>
