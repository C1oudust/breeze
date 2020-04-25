import Vue from 'vue';
import Vuex from 'vuex';
// import player from '../player';
Vue.use(Vuex);

const COVER_URL = [
  require('../assets/images/cover.jpg'),
  require('../assets/images/cover2.jpg'),
  require('../assets/images/cover3.jpg'),
];

export default new Vuex.Store({
  state: {
    isPlaying: false,
    coverUrl: '',
    itemList: [],
    current: '',
  },
  getters: {},
  mutations: {
    togglePlay(state, toggle) {
      state.isPlaying = toggle !== undefined ? toggle : !state.isPlaying;
    },
    changeCover(state) {
      // eslint-disable-next-line no-constant-condition
      while (1) {
        const index = Math.floor(Math.random() * 3);
        const coverUrl = COVER_URL[index];
        if (coverUrl !== state.coverUrl) {
          state.coverUrl = coverUrl;
          break;
        }
      }
    },
    updateList(state, e) {
      if (state.itemList.length) {
        let name = [];
        state.itemList.forEach((item) => {
          name.push(item.name);
        });
        Array.from(e).forEach((item) => {
          if (name.indexOf(item.file.name) == -1) {
            name.push(item.file.name);
          }
        });
        state.itemList = [];
        for (let i = 0; i < name.length; i++) {
          state.itemList.push({ name: name[i], index: i });
        }
      } else {
        for (let i = 0; i < e.length; i++) {
          state.itemList.push({
            name: e[i].file.name,
            // .slice(0, e[i].file.name.length - 4)
            index: i,
          });
        }
      }
    },
  },
  actions: {},
});
