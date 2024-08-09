<template>
  <div id="app">
    <h2>이해했습니다. 라고 따라 쳐라</h2>
    <input type="text" v-model="letter" @input="event">
    <input type="button" class="btn" value="확인" :disabled="flag" @click="btnClicked">
    <!-- input에서 입력 이벤트는 keydown x, input으로 type이 button인 곳에다가 @input을 넣어두니까 안되지 ㅅㅂ-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      letter: '',
      goal: '이해했습니다.',
      flag: true,
    }
  },
  methods: {
    event() {
      if(this.letter === this.goal){
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    btnClicked() {
      alert('나가')
    }
  }
}

</script>

<style>

</style>