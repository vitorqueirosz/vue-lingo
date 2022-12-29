<template>
  <div>
    <h1 class="font-bold text-3xl text-slate-600 mb-4 text-center md:text-left">
      {{ title }}
    </h1>

    <div class="flex items-center justify-center mt-12">
      <button
        v-for="(item, index) in images"
        :key="index + 'image-card'"
        :class="
          clsx(
            'flex flex-col py-2 border-2 border-b-4 rounded-xl items-center justify-center w-44 h-52 border-zinc-300 mr-2 hover:bg-slate-200 ease-in-out',
            selectedCard === item.title && 'bg-slate-200'
          )
        "
        @click="handleSelectCard(item.title)"
      >
        <component
          :is="item.image"
          v-bind="{
            name: item.name,
            class: 'text-white h-full w-32',
            isImage: item.isImage,
          }"
        />
        <span>{{ item.title }}</span>
      </button>

      <div />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import { clsx } from '@/utils/class';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  images: {
    type: Array,
    default: () => [],
  },
  answer: {
    type: String,
    default: '',
  },
});

const selectedCard = ref('');
const store = useStore();

const handleSelectCard = (value) => {
  selectedCard.value = value;
  store.commit('updateCurrentAnswer', selectedCard.value);
};

onMounted(() => {
  const setCurrentAnswer = () => {
    store.commit('updateCorrectAnswer', props.answer);
  };
  setCurrentAnswer();
});
</script>
