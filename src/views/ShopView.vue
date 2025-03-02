<script setup lang="ts">
import { useCollection } from "vuefire";
import { computed } from "vue";
import { productsRef } from "@/lib/firebase";
import { convertToProductsType } from "@/helpers/productMapper";
import type { Product } from "types/products";
import CardProduct from "@/components/CardProduct.vue";

const rawProducts = useCollection(productsRef);

const products = computed<Product[]>(() => rawProducts.value?.map(convertToProductsType) ?? []);
</script>

<template>
  <main>
    <div>
      <h1 class="text-3xl font-bold capitalize mb-5">hello shop</h1>
      <div v-if="products.length > 0" class="flex w-full gap-x-2">
        <CardProduct v-for="product in products" :key="product.name" :product="product" />
      </div>
      <p v-else>Loading...</p>
    </div>
  </main>
</template>
