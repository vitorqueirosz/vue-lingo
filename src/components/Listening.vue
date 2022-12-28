<template>
  <div>
    <h1 class="font-bold text-3xl text-slate-600 mb-4 text-center md:text-left">
      {{ title }}
    </h1>

    <div class="flex items-center justify-center mt-2 mb-8">
      <button
        v-for="(item, index) in images"
        :key="index + 'icon'"
        class="border-1 border-b-4 border-b-sky-600 rounded-3xl bg-sky-400 p-1 w-20 h-20 flex justify-center items-center mr-6 first:h-24 first:w-24 enabled:hover:bg-sky-500"
        :disabled="$store.state.hasResult"
        @click="handleTriggerVoice({ ...sentence, speed: item.speed })"
      >
        <component
          :is="item.image"
          v-bind="{
            name: item.name,
            class: 'text-white h-10 w-28',
          }"
        />
      </button>
    </div>

    <div class="relative">
      <div
        class="absolute flex flex-wrap items-center h-20 w-full border-y-2 border-neutral-200"
      />
      <div
        ref="wordsList"
        class="flex flex-wrap w-full gap-y-1 h-40 pt-2 md:h-20"
      />
      <div
        class="flex items-center justify-center w-full mt-8 flex-wrap gap-y-2"
      >
        <div
          v-for="(item, index) in words"
          :key="index + 'word'"
          class="bg-gray-200 rounded-xl z-0 mr-1 relative"
        >
          <div
            ref="wordsRef"
            class="relative border-2 z-10 bg-white border-b-4 border-neutral-200 rounded-xl transition-transform ease-in-out duration-300 height: 60px"
            @click="handleTriggerVoice({ value: item })"
          >
            <button
              class="p-4"
              type="button"
              :disabled="$store.state.hasResult"
              @click="handleNewPosition(index)"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import Icon from '@/components/Icon.vue';
import { useStore } from 'vuex';

const spacePlus = 4;
const langs = {
  en: 'en-US',
  es: 'es-ES',
};

export default {
  name: 'Listening',
  components: {
    Icon,
  },
  props: {
    words: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default: () => [],
    },
    sentence: {
      type: Object,
      default: () => {},
    },
    answer: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const words = ref(
      Array.from({ length: props.words.length }).map(() => null)
    );
    const selectedWords = ref([]);
    const wordsListRef = ref(null);
    const store = useStore();

    const handleCurrentAnswer = () => {
      store.commit('updateCurrentAnswer', selectedWords.value.join(' '));
    };

    let leftSpace = 0;
    const handleNewPosition = (index) => {
      const wordsValues = words.value.filter(Boolean);
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
      const formatedValueX = isPositive
        ? Math.abs(valueX) * -1
        : Math.abs(valueX);

      if (selectedWords.value.includes(wordValue)) {
        const filteredValues = selectedWords.value.filter(
          (w) => w !== wordValue
        );
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
          const newTranslateX =
            Math.abs(translateX) + wordValues.width + spacePlus;

          item.style.transform = `translate(-${newTranslateX}px, ${translateY}px)`;
        });
      } else {
        selectedWords.value = [...selectedWords.value, wordValue];
        word.style.transform = `translate(${formatedValueX}px, -${translate.y}px)`;
        leftSpace = leftSpace + wordValues.width + spacePlus;
      }

      handleCurrentAnswer();
    };

    const setCurrentAnswer = () => {
      store.commit('updateCorrectAnswer', props.answer);
    };
    setCurrentAnswer();

    const handleTriggerVoice = (sentence) => {
      const lang = sentence?.language || 'en';

      const utterance = new SpeechSynthesisUtterance(sentence.value);
      const voices = speechSynthesis.getVoices();
      const voice = voices.find((voice) => voice.lang === langs[lang]);
      utterance.voice = voice;
      if (sentence?.speed) utterance.rate = sentence.speed;
      speechSynthesis.speak(utterance);
    };
    handleTriggerVoice(props.sentence);

    return {
      wordsRef: words,
      wordsList: wordsListRef,
      handleNewPosition,
      handleTriggerVoice,
    };
  },
};
</script>
