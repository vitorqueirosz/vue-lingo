<template>
  <div class="flex flex-col items-center w-full">
    <h1 class="font-bold text-3xl text-slate-600 mb-4 text-center md:text-left">
      Result
    </h1>

    <div
      class="bg-slate-300 px-4 flex flex-col justify-center items-center w-72 h-48 rounded-lg"
    >
      <div
        v-for="step in steps"
        :key="step.title"
        class="flex items-center justify-between w-full"
      >
        <h3 class="font-bold text-xl text-slate-600 text-center md:text-left">
          {{ step.title }}
        </h3>

        <p class="flex items-center">
          {{ step.amount }}
          <Icon :name="step.icon" class="w-6 ml-1" />
        </p>
      </div>
    </div>

    <ButtonC class="mt-6" @click="handleRedirectToHome">Play again</ButtonC>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { PATHS } from '@/constants/path';

import ButtonC from '@/components/ButtonC.vue';
import Icon from '@/components/Icon.vue';

const router = useRouter();
const store = useStore();

const steps = [
  {
    title: 'Corrects:',
    icon: 'check',
    amount: store.state.answersAmount.correct,
  },
  {
    title: 'Wrongs:',
    icon: 'closeBorder',
    amount: store.state.answersAmount.wrong,
  },
  {
    title: 'Skipped:',
    icon: 'closeBorder',
    amount: store.state.answersAmount.skipped,
  },
];

const handleRedirectToHome = () => {
  router.push(PATHS.HOME);
  store.commit('resetAnswersAmount');
};
</script>
