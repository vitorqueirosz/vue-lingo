<template>
  <div
    ref="wordsListRef"
    class="border-t-2 border-b-2 border-neutral-200 h-20"
  />
  <div class="flex items-center justify-center mt-6">
    <button
      v-for="(item, index) in words"
      :key="index + 'word-image'"
      ref="wordsRef"
      class="relative border-2 z-10 bg-white border-b-4 border-zinc-300 rounded-xl transition-transform ease-in-out duration-300 h-16 p-4 mr-1 opacity-0 cards"
      :disabled="$store.state.hasResult"
      @click="handleSelectWord(index, item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

import { handleTriggerVoice } from '@/utils/triggerSpeech';

const spacePlus = 4;

const store = useStore();
const props = defineProps({
  words: {
    type: Array,
    default: () => [],
  },
  sentence: {
    type: Object,
    default: () => {},
  },
});
const wordsRef = ref(
  Array.from({ length: props.words.length }).map(() => null)
);
const wordsListRef = ref(null);
const selectedWords = ref([]);

const handleCurrentAnswer = () => {
  store.commit('updateCurrentAnswer', selectedWords.value.join(' '));
};

let leftSpace = 0;
const handleNewPosition = (index) => {
  const wordsValues = wordsRef.value.filter(Boolean);
  const word = wordsValues[index];

  const listValues = wordsListRef.value.getBoundingClientRect();
  const wordValues = word.getBoundingClientRect();
  const translate = {
    x: wordValues.left - listValues.left,
    y: wordValues.bottom - listValues.bottom + spacePlus,
  };
  const wordValue = word.textContent;
  const valueX = translate.x - leftSpace;

  const isPositive = Math.sign(valueX) === 1;
  const formatedValueX = isPositive ? Math.abs(valueX) * -1 : Math.abs(valueX);

  if (selectedWords.value.includes(wordValue)) {
    const filteredValues = selectedWords.value.filter((w) => w !== wordValue);
    const itemIndex = selectedWords.value.findIndex((w) => w === wordValue);

    selectedWords.value = filteredValues;
    word.style.transform = 'translate(0, 0)';

    leftSpace = leftSpace - wordValues.width - spacePlus;

    filteredValues.slice(itemIndex, 10).forEach((word) => {
      const item = wordsValues.find((v) => v.textContent === word);
      // eslint-disable-next-line no-undef
      const { m41: translateX, m42: translateY } = new WebKitCSSMatrix(
        item.style.transform
      );
      const newTranslateX = Math.abs(translateX) + wordValues.width + spacePlus;

      item.style.transform = `translate(-${newTranslateX}px, ${translateY}px)`;
    });
  } else {
    selectedWords.value = [...selectedWords.value, wordValue];
    word.style.transform = `translate(${formatedValueX}px, -${translate.y}px)`;
    leftSpace = leftSpace + wordValues.width + spacePlus;
  }

  handleCurrentAnswer();
};

const handleSelectWord = (index, item) => {
  handleTriggerVoice({ value: item });
  handleNewPosition(index);
};
</script>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0.5;
    pointer-events: none;
  }
  66% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
    pointer-events: all;
  }
}
.cards {
  animation-fill-mode: forwards;
  animation-name: fadeIn;
  animation-duration: 0.3s;
}

.cards:nth-child(1) {
  animation-delay: 0.2s;
}

.cards:nth-child(2) {
  animation-delay: 0.35s;
}

.cards:nth-child(3) {
  animation-delay: 0.5s;
}

.cards:nth-child(4) {
  animation-delay: 0.65s;
}

.cards:nth-child(5) {
  animation-delay: 0.8s;
}

.cards:nth-child(6) {
  animation-delay: 0.95s;
}

.cards:nth-child(7) {
  animation-delay: 1.1s;
}
</style>
