<template>
  <div class="w-full">
    <h1 class="font-bold text-3xl text-slate-600 mb-4 text-center md:text-left">
      {{ title }}
    </h1>

    <div class="flex mt-8 m-auto max-w-screen-md justify-center items-center">
      <div
        v-for="(item, colIndex) in words"
        :key="item.language"
        ref="wordsRef"
        class="mr-2"
      >
        <button
          v-for="(word, index) in item.values"
          :key="colIndex + word.value"
          type="button"
          class="border-2 border-b-4 border-zinc-300 rounded-xl w-60 bg-white h-14 flex items-center p-4 mb-2 transition-all duration-300 ease-in"
          @click="
            handleSelectWord(colIndex, index, {
              ...word,
              language: item.language,
            })
          "
        >
          <span
            class="border-2 flex items-center justify-center rounded-lg w-8 h-8"
          >{{ index + 1 }}</span>
          <p class="flex-1 font-bold">
            {{ word.value }}
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

import { asyncTimeOut } from '@/utils/asyncTimeOut';
import { handleTriggerVoice } from '@/utils/triggerSpeech';

const wordsRef = ref(null);
const selectedWords = ref([]);
const selectedWord = ref([]);

const store = useStore();

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  words: {
    type: Array,
    default: () => [],
  },
});

const handleSelectWord = async (column, row, values) => {
  const isFirstColumn = column === 0;
  const nextCol = isFirstColumn ? column + 1 : column - 1;
  const matchWordValues = selectedWord.value[nextCol];
  const hasOldValue = selectedWord.value[column];

  const word = wordsRef.value[column].children[row];
  const [c, r] = matchWordValues?.coords || [];
  const matchWord = matchWordValues?.coords && wordsRef.value[c].children[r];

  const handleRemoveClassFromOldWord = () => {
    const [col, row] = selectedWord.value[column].coords;
    const oldWord = wordsRef.value[col].children[row].className;
    wordsRef.value[col].children[row].className = oldWord.replace(
      /bg-cyan-300/g,
      ''
    );
  };

  if (hasOldValue) handleRemoveClassFromOldWord();

  const handleSelectCurrentWord = () => {
    selectedWord.value[column] = { ...values, coords: [column, row] };
    word.className = word.className + ' bg-cyan-300';
  };
  handleSelectCurrentWord();

  handleTriggerVoice(values);

  const handleSetClass = (oldClass, newClass) => {
    word.className = word.className.replace(oldClass, newClass);
    matchWord.className = matchWord.className.replace(oldClass, newClass);
  };

  const handleDisabledWords = () => {
    word.disabled = true;
    matchWord.disabled = true;
    handleSetClass('bg-green-300', 'bg-zinc-300');
  };

  if (matchWord) {
    const values = { ...selectedWord.value };
    selectedWord.value = [];

    await asyncTimeOut(300);

    const word = values[column];
    const hasMatch = word.value === matchWordValues.ref;

    if (!hasMatch) {
      handleSetClass('bg-cyan-300', 'bg-red-300');

      await asyncTimeOut(300);

      handleSetClass('bg-red-300', '');
    } else {
      handleSetClass('bg-cyan-300', 'bg-green-300');

      await asyncTimeOut(300);

      handleDisabledWords();
      selectedWords.value = [
        ...selectedWords.value,
        word.value,
        matchWordValues.ref,
      ];
    }
  }
};

const handleCheckAnswer = () => {
  const wordsAmount = props.words.reduce((acc, item) => {
    return acc + item.values.length;
  }, 0);

  if (selectedWords.value.length === wordsAmount) {
    store.commit('updateCurrentAnswer', 'matchWords');
    store.commit('checkAnswer');
  }
};

onMounted(() => {
  const setCurrentAnswer = () => {
    store.commit('updateCorrectAnswer', 'matchWords');
  };
  setCurrentAnswer();
});

watch(() => selectedWords.value.length, handleCheckAnswer);
</script>
