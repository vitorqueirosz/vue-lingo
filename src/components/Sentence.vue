<template>
  <div>
    <h1 class="font-bold text-3xl text-slate-600 mb-4 text-center md:text-left">
      {{ title }}
    </h1>
    <div class="flex items-center mt-6 h-44 max-w-xl">
      <Icon :name="image.name" is-image class="h-44 max-w-xs" />
      <div
        class="flex items-center border-2 border-neutral-200 rounded-md ml-4 p-4"
      >
        <button type="button" @click="handleTriggerVoice(sentence)">
          <Icon name="sound" class="text-cyan-500" />
        </button>
        <span class="ml-2">Um homem</span>
      </div>
    </div>
    <Words :words="words" :sentence="sentence" />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import { handleTriggerVoice } from '@/utils/triggerSpeech';

import Icon from '@/components/Icon.vue';
import Words from '@/components/Words.vue';

export default {
  name: 'Sentence',
  components: {
    Icon,
    Words,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    image: {
      type: Object,
      default: () => {},
    },
    words: {
      type: Array,
      default: () => [],
    },
    answer: {
      type: String,
      default: '',
    },
    sentence: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore();

    onMounted(() => {
      handleTriggerVoice(props.sentence);

      const setCurrentAnswer = () => {
        store.commit('updateCorrectAnswer', props.answer);
      };
      setCurrentAnswer();
    });

    return {
      handleTriggerVoice,
    };
  },
};
</script>
