import { createStore } from 'vuex';

const answersAmountDefaultValue = {
  correct: 0,
  wrong: 0,
  skipped: 0,
};

export default createStore({
  state: {
    currentStep: '',
    currentAnswer: '',
    correctAnswer: '',
    isCorrectAnswer: null,
    hasResult: false,
    answersAmount: answersAmountDefaultValue,
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
      const isRightAnswer =
        state.correctAnswer.toLowerCase() === state.currentAnswer.toLowerCase();
      state.isCorrectAnswer = isRightAnswer;
      state.hasResult = true;

      const key = isRightAnswer ? 'correct' : 'wrong';
      this.commit('updateAnswersAmount', key);
    },
    resetCurrentPayload(state) {
      state.isCorrectAnswer = null;
      state.hasResult = false;
      state.currentAnswer = '';
    },
    updateAnswersAmount(state, key) {
      state.answersAmount = {
        ...state.answersAmount,
        [key]: state.answersAmount[key] + 1,
      };
    },
    resetAnswersAmount(state) {
      state.answersAmount = answersAmountDefaultValue;
    },
  },
  actions: {},
  modules: {},
});
