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

    <div class="flex flex-col m-auto mt-44 w-full max-w-screen-sm flex-1">
      <component :is="Lesson" v-bind="lesson" />
    </div>

    <FooterC :handle-next-step="handleNextStep" />
  </div>
</template>

<script>
import { ref, shallowRef, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Listening from '@/components/Listening.vue';
import ImageC from '@/components/ImageC.vue';
import Sentence from '@/components/Sentence.vue';
import Icon from '@/components/Icon.vue';
import FooterC from '@/components/FooterC.vue';

import { lessons } from '@/mock';
import { PATHS } from '@/constants/path';

const components = {
  listening: Listening,
  image: ImageC,
  sentence: Sentence,
  matchWords: Listening,
};

export default {
  name: 'Lessons',
  components: {
    Listening,
    ImageC,
    Sentence,
    Icon,
    FooterC,
  },
  setup() {
    const step = ref(0);
    const progress = ref(0);
    const currentComponent = shallowRef(null);
    const currentStep = shallowRef(null);

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
      const newSteps = [...lessonsSteps];
      numbers.forEach((number, index) => {
        newSteps[number] = lessonsSteps[index];
      });

      return newSteps;
    };
    const newSteps = randomSteps();

    const handleSetNextStep = () => {
      currentStep.value = newSteps[step.value];
      currentComponent.value = components[currentStep.value.type];
    };
    handleSetNextStep();

    watch(() => step.value, handleSetNextStep);

    const handleNextStep = () => {
      step.value = step.value + 1;
      progress.value = (step.value / lessonsSteps.length) * 100;
      store.commit('resetCurrentPayload');
    };

    return {
      lesson: currentStep,
      Lesson: currentComponent,
      progress,
      handleRedirectToHome,
      handleNextStep,
    };
  },
};
</script>
