<script setup lang="ts">
import { useCollection } from "vuefire";
import { onMounted, ref, watchEffect } from "vue";
import { productsRef } from "@/lib/firebase";
import { convertToProductsType } from "@/helpers/productMapper";
import type { Product } from "types/products";
import CardProduct from "@/components/CardProduct.vue";

const products = ref<Product[]>([]);

onMounted(() => {
  const rawProducts = useCollection(productsRef, { once: true });

  watchEffect(() => {
    if (rawProducts.value) {
      products.value = rawProducts.value.map(convertToProductsType);
    }
  });
});
</script>

<template>
  <main>
    <div>
      <div class="flex justify-between w-full">
        <h1 class="text-3xl font-bold capitalize mb-5">hello shop</h1>
        <div>
          <router-link
            :to="{ name: 'add_product' }"
            type="button"
            class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Add Product
          </router-link>
        </div>
      </div>
      <div
        v-if="products.length > 0"
        class="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <CardProduct v-for="product in products" :key="product.name" :product="product" />
      </div>
      <p v-else>Loading...</p>
    </div>
  </main>
</template>
