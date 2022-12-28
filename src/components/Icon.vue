<template>
  <component :is="icon" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  isImage: {
    type: Boolean,
    required: false,
  },
});

const icon = defineAsyncComponent(() =>
  import(`../assets/${props.isImage ? 'images' : 'icons'}/${props.name}.svg`)
);
</script>
