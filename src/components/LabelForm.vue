<template>
  <label :class="['block text-sm font-medium leading-6 text-gray-900', className]">
    {{ text }}
  </label>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  className?: string;
}>();
</script>
