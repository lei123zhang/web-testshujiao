<template>
     <div  class="agreements">
         <h2>{{title}}</h2>
         <p>{{createTime}}</p>
       <div v-html="content" class="content">
              {{content}}
       </div>
      </div>
</template>
<script>
export default {
  name: "Details",
  data() {
    return {
      title: "",
      img: "",
      createTime: "",
      currentActiveId: "",
      content: ""
    };
  },

  created() {
    this.outData();
  },
  beforeUpdate() {
    let id = this.$route.query.id;
    if (this.currentActiveId !== id) {
      this.outData();
    }
  },
  methods: {
    outData() {
      console.log("=--=");
      let id = this.$route.query.id;
           console.log(id,999);
      this.$http
        .get(this.host + this.api.uc.help + `${id}`)
        .then(res => {
          var resp = res.body;
          console.log(resp, 5656);
          this.currentActiveId = id;
          this.title = resp.data.title;
          this.createTime = resp.data.createTime;
          this.content = resp.data.content;
          // this.img = res.data.data.imgUrl;
        })
        .catch(e => {});
    }
  }
};
</script>

<style>
.agreements {
  background-color: #fff;
  text-align: center;
      height: 500px;
}
.agreements .content {
      height: 500px;
 width:100%;
 margin:0 auto;
}
</style>
