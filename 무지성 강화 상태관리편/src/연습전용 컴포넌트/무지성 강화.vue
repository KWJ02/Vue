<template>
    <div id="app">
        <h1>무지성 강화하기</h1>
        <p v-if="pre">파산 횟수 : {{pre}}</p>
        <h1>{{ star }}성</h1>
        <p>잔고 : {{ seed }}원</p>
        <p>성공 확률 : {{ success }}%</p>
        <p>강화 비용 : {{ augmentCost }}</p>
        <p>현재 가치 : {{ cost }}원</p>
        <button @click="augment">강화</button>
        <button @click="sale">판매</button>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
    computed: {
        ...mapState(['seed'])
    },
    data() {
        return {
            star: 0,
            success: 100,
            fail: 0,
            augmentCost: 10000,
            cost: 0,
            pre: 0,
        }
    },

    methods: {
        ...mapActions(['setSeed']),

        init() {
            this.star = 0;
            this.success = 100;
            this.augmentCost = 10000;
            this.cost = 0;
        },

        augment() { // 강화버튼 클릭 시 호출되는 함수
            if(this.checkSeed(this.$store.state.seed, this.augmentCost)){
                this.init()
            } else {
            var rand = Math.floor(Math.random() * 100)
            this.augmentProbability(this.star, rand) // 난수로 성공실패 확인
            }
        },

        augmentProbability(star, rand) {
            this.success = 100 - star * 10 // 성공확률 조정

            if(rand < 100 - this.success){ // 실패하면 성공 확률 +10, 실패 확률 -10, 등급 하락 후 하락한 등급만큼 값어치, 강화비용 하락
                    this.success += 10
                    this.fail -= 10
                    this.costBudgetMinus(this.star)
                    this.$store.dispatch('setSeedtoAugment', this.augmentCost)
                    this.augmentCostDown(this.star)
                    this.star -= 1
                    
                    if(this.cost <= 0) {
                        alert('터짐 ㅄ ㅋㅋ')
                        this.init()
                    }
                

            } else { // 성공하면 성공 확률 -10, 실패 확률 +10, 등급 상승 후 상승한 등급만큼 값어치, 강화비용 상승
                this.success -= 10
                this.fail += 10
                this.star += 1
                this.costBudgetPlus(this.star)
                this.$store.dispatch('setSeedtoAugment', this.augmentCost)
                this.augmentCostUp(this.star)
            }
        },

        sale() {
            this.$store.dispatch('setSeedtoSale', this.cost)
            this.init()
        },

        costBudgetPlus(star) { // 등급 상승에 따른 값어치 상승 조정
            if(star < 3){
                this.cost += star * 10000
            } else if(star < 7) {
                this.cost += star * 30000
            } else {
                this.cost += star * 100000
            }
        },

        costBudgetMinus(star) { // 등급 하락에 따른 값어치 하락 조정 + 감가추가해야됨
            if(star < 3){
                this.cost -= star * 10000 + star * 200
            } else if(star < 7) {
                this.cost -= star * 30000 + star * 300
            } else {
                this.cost -= star * 100000 + star * 500
            }
        },

        augmentCostUp(star) {
            if(star < 3){
                this.augmentCost += star * 5000
            } else if(star < 7) {
                this.augmentCost += star * 7000
            } else {
                this.augmentCost += star * 12000
            }
        },

        augmentCostDown(star) {
            if(star < 3){
                this.augmentCost -= star * 5000
            } else if(star < 7) {
                this.augmentCost -= star * 7000
            } else {
                this.augmentCost -= star * 12000
            }
        },

        checkSeed(seed, cost) {
            if(seed < cost) {
                alert('돈없음')
                this.pre += 1
                this.$store.state.seed = 1000000

                return 1
            }
            return 0
        },
    }
}
</script>

<style scoped>

</style>