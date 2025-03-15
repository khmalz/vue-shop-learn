<template>
  <input
    v-bind="$attrs"
    v-model="model"
    :class="[
      'block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset',
      'focus:border focus:border-indigo-400 ring-gray-300 placeholder:text-gray-400',
      'sm:text-sm sm:leading-6 focus:outline-none disabled:bg-gray-200/70',
      className,
    ]"
  />
</template>

<script setup lang="ts">
const model = defineModel<string | number | boolean>({ default: "" });

defineProps<{
  className?: string;
}>();
</script>
