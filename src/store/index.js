import { createStore } from 'vuex';

export default createStore({
  state: {
    currentStep: '',
    currentAnswer: '',
    correctAnswer: '',
    isCorrectAnswer: null,
    hasResult: false,
    answersAmount: {
      correct: 0,
      wrong: 0,
    },
  },
  getters: {},
  mutations: {
    updateCorrectAnswer(state, value) {
      state.correctAnswer = value;
    },
    updateCurrentAnswer(state, value) {
      state.currentAnswer = value;
    },
    checkAnswer(state) {
      state.isCorrectAnswer = state.correctAnswer === state.currentAnswer;
      state.hasResult = true;
    },
    resetCurrentPayload(state) {
      state.isCorrectAnswer = null;
      state.hasResult = false;
      state.currentAnswer = '';
    },
  },
  actions: {},
  modules: {},
});
