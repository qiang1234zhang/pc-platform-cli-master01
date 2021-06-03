<template>
    <div class='container'>
        <div class="box1">30px字体</div>
        <div class="box2">30px字体</div>
        <div class="box3">30px字体</div>
        <div class="box4">800px</div>
        <div class="box5">1000px</div>


<div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker style="width:400px"
      v-model="date.value"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
        </div>
</template>

<script>
export default {
  data() {
    return {
        date:{value:[]}
    }
  },
  created() {
      this.getTime();
  },
  methods:{
      getTime(){
          const that=this;
          const start= new Date();
          const end=new Date();
          start.setTime(start.getTime());
          end.setTime(end.getTime()+3600*1000*24*6);
          that.date={value:[that.formatDate(start),that.formatDate(end)]}
          },
        formatDate(date){
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate();
            if(month<10){
                month="0"+month;
            }
            if(day<10){
                day="0"+day;
            }
            return year+"-"+month+"-"+day;
        }

  }
};
</script>

<style scoped lang="scss">
.container {
    div {
        height: 100px;
        font-size: 30px;
        line-height: 100px;
    }
    .box1 {
        width: 192px;
        background: coral;
    }
    .box2 {
        width: 400px;
        background: skyblue;
    }
    .box3 {
        width: 600px;
        background: palegreen;
    }
    .box4 {
        width: 800px;
        background: wheat;
    }
    .box5 {
        width: 1920px;
        background: darkred;
    }
}
</style>
