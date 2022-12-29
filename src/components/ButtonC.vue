<template>
  <button
    type="button"
    :class="
      clsx(
        'w-32 px-4 py-2 rounded-xl transition-colors ease-in font-bold border-2 border-b-4',
        disabled
          ? 'bg-zinc-200 text-zinc-400 border-transparent'
          : variants[variant]
      )
    "
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { clsx } from '@/utils/class';

const variants = {
  primary: 'bg-cyan-500 enabled:hover:bg-cyan-600 text-white border-cyan-600',
  secondary: 'bg-white text-zinc-400 enabled:hover:bg-zinc-200 border-zinc-300',
  success:
    'bg-green-500 enabled:hover:bg-green-600 text-white border-green-600',
  error: 'bg-red-500 enabled:hover:bg-red-600 text-white border-red-600',
};

defineProps({
  disabled: Boolean,
  variant: {
    type: String,
    default: 'primary',
  },
});
</script>
