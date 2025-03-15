<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    v-bind="$attrs"
    :disabled="disabled || loading"
    :class="[
      'flex justify-center mb-3 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6',
      'text-white shadow-sm hover:bg-indigo-500 focus-visible:outline',
      'focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-800 disabled:cursor-not-allowed',
      className,
    ]"
  >
    <slot v-if="!loading"></slot>
    <span v-else>Loading...</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}>();
</script>
