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

    <Words :words="words" :sentence="sentence" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import { handleTriggerVoice } from '@/utils/triggerSpeech';

import Words from '@/components/Words.vue';

const store = useStore();
const props = defineProps({
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
});

onMounted(() => {
  handleTriggerVoice(props.sentence);

  const setCurrentAnswer = () => {
    store.commit('updateCorrectAnswer', props.answer);
  };
  setCurrentAnswer();
});
</script>
