<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>我是helloworld</h1>
    <hello-world v-if="msg / 3 === 0">
      ???
    </hello-world>
  </div>
</template>

<script>
export default {
  name: 'hello-world',
  data () {
    return {
      msg: 1
    }
  },
  created () {
    let that = this;
    setInterval(function () {
      that.msg++
    },1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
