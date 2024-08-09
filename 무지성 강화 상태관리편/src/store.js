import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        seed: 1000000,
    },
    mutations: {
        SET_SEED(state, seed) {
            state.seed = seed;
        },
    },
    actions: {
        setSeedtoAugment({ commit, state }, augmentCost) {
            commit('SET_SEED', state.seed - augmentCost);
        },

        setSeedtoSale({commit, state}, cost) {
            commit('SET_SEED', state.seed + cost);
        }

    },
    getters: {
        seed: state => state.seed,
    },
})