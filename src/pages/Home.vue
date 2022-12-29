<template>
  <div class="flex flex-col items-center h-full mt-32">
    <h1 class="text-5xl font-bold inline-flex mb-6">
      Vue
      <h1 class="text-stone-800">lingo</h1>
    </h1>

    <div class="relative flex justify-center">
      <Card title="Choose your language">
        <ButtonC @click="onSelectLanguage('en')">English</ButtonC>
        <ButtonC @click="onSelectLanguage('es')">Spanish</ButtonC>
      </Card>

      <Card
        title="Select your level"
        :style="{
          transform: `translateX(${language ? '0' : '100%'})`,
          opacity: language ? 1 : 0,
        }"
        class="absolute top-0 transition-all ease-in-out duration-300"
      >
        <ButtonC @click="onSelectLevel('beginner')">Beginner</ButtonC>
        <ButtonC @click="onSelectLevel('medium')">Medium</ButtonC>
        <ButtonC @click="onSelectLevel('advanced')">Advanced</ButtonC>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import ButtonC from '@/components/ButtonC.vue';
import Card from '@/components/Card.vue';

import { PATHS } from '@/constants/path';

const language = ref('');
const router = useRouter();

const onSelectLanguage = (value) => {
  language.value = value;
};

const onSelectLevel = (value) => {
  const urlParams = new URLSearchParams({
    lang: language.value,
    level: value,
  });
  const route = `${PATHS.LESSONS}?` + urlParams;
  router.push(route);
};
</script>

<style></style>
