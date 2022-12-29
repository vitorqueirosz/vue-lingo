<template>
  <div>
    <h1 class="font-bold text-3xl text-slate-600 mb-4 text-center md:text-left">
      {{ title }}
    </h1>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>
