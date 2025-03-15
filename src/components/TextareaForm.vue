<template>
  <textarea
    v-bind="$attrs"
    v-model="model"
    :class="[
      'bg-gray-50 focus:border focus:border-blue-500 border border-gray-300 text-gray-900',
      'text-sm rounded-lg focus:outline-none block w-full p-2.5',
      className,
    ]"
  ></textarea>
</template>

<script setup lang="ts">
const model = defineModel<string>({ default: "" });

defineProps<{
  className?: string;
}>();
</script>
