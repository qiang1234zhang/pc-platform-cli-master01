<template>
    <div class='container'>
        <div class="box1">30px字体</div>
        <div class="box2">30px字体</div>
        <div class="box3">30px字体</div>
        <div class="box4">800px</div>
        <div class="box5">1000px</div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
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
