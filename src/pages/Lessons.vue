<template>
  <div class="flex flex-col h-screen pt-12">
    <div class="flex items-center w-full justify-center">
      <Icon
        name="close"
        class="mr-2"
        role="button"
        @click="handleRedirectToHome"
      />
      <div
        class="relative w-10/12 h-4 flex items-center justify-center sm:w-7/12 bg-gray-300 rounded-md"
      >
        <div
          class="absolute bg-green-500 h-full w-full rounded-md left-0 transition-all ease-in-out duration-300"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>

    <div class="flex m-auto mt-44 w-full max-w-screen-sm flex-1">
      <component :is="currentComponent" v-bind="currentLesson" />
    </div>

    <FooterC :handle-next-step="handleNextStep" />
  </div>
</template>

<script setup>
import { ref, shallowRef, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Listening from '@/components/Listening.vue';
import ImageC from '@/components/ImageC.vue';
import Sentence from '@/components/Sentence.vue';
import MatchWords from '@/components/MatchWords.vue';
import Icon from '@/components/Icon.vue';
import FooterC from '@/components/FooterC.vue';

import { lessons } from '@/mock';
import { PATHS } from '@/constants/path';

const components = {
  listening: Listening,
  image: ImageC,
  sentence: Sentence,
  matchWords: MatchWords,
};

const step = ref(0);
const progress = ref(0);
const currentComponent = shallowRef(null);
const currentLesson = shallowRef(null);
const newSteps = shallowRef([]);

const route = useRoute();
const router = useRouter();
const store = useStore();

const [lang, level] = ['lang', 'level'].map((query) =>
  new URLSearchParams(route.query).get(query)
);
const lessonsSteps = lessons[lang][level].steps;

const handleRedirectToHome = () => {
  router.push(PATHS.HOME);
};

const handleSetNextStep = () => {
  currentLesson.value = newSteps.value[step.value];
  currentComponent.value = components[currentLesson.value.type];
};

const handleNextStep = () => {
  step.value = step.value + 1;
  progress.value = (step.value / lessonsSteps.length) * 100;
  store.commit('resetCurrentPayload');
};

onMounted(() => {
  const randomNumbers = () => {
    const numbers = new Set();
    const maxNumber = lessonsSteps.length - 1;
    const minNumber = 0;

    while (numbers.size !== lessonsSteps.length) {
      numbers.add(
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
      );
    }

    return [...numbers];
  };
  const numbers = randomNumbers();

  const randomSteps = () => {
    const randomSteps = [...lessonsSteps];
    numbers.forEach((number, index) => {
      randomSteps[number] = lessonsSteps[index];
    });

    newSteps.value = randomSteps;
    handleSetNextStep();
  };
  randomSteps();

  watch(() => step.value, handleSetNextStep);
});
</script>
