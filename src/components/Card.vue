<template>
  <div
    class="bg-slate-300 px-4 flex flex-col justify-center items-center min-w-96 h-40 rounded-lg"
    v-bind="$attrs"
  >
    <h3 class="text-3xl font-semibold text-slate-500">
      {{ title }}
    </h3>
    <div class="flex items-center gap-2 my-2">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
