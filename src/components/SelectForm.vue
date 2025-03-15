<template>
  <select
    v-bind="$attrs"
    v-model="model"
    :class="[
      'bg-gray-50 focus:ring focus:ring-gray-300 border !border-gray-300',
      'text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5',
      className,
    ]"
  >
    <option
      v-for="option in options"
      :key="option.label"
      :value="option.value"
      :selected="option.selected"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
defineProps<{
  options: { label: string; value: string; selected?: boolean }[];
  className?: string;
}>();

const model = defineModel<string>();
</script>
