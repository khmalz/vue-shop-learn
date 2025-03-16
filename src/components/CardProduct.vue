<template>
  <div>
    <div className="flex hover:scale-103 transition-all ease-in-out">
      <div
        className="w-full bg-white flex flex-col justify-between shadow-lg p-3 rounded-lg border border-slate-200"
      >
        <div className="w-auto">
          <img
            :width="500"
            :height="500"
            loading="lazy"
            className="rounded-t-lg mx-auto h-80 w-full object-cover shadow-md"
            :src="product.image"
            :alt="product.name"
          />
        </div>
        <div className="pb-5 mt-2 flex flex-col gap-y-0.5">
          <div>
            <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm">{{
              product.category
            }}</span>
          </div>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">{{ product.name }}</h5>
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">{{
              convertIDR(product.price)
            }}</span>
          </div>
          <div class="flex mt-3">
            <router-link :to="{ name: 'update_product', params: { id: product.id } }">
              <Button
                class="!bg-cyan-600 hover:!bg-cyan-700 focus-visible:!outline-cyan-700 disabled:!bg-cyan-800"
                >Edit</Button
              >
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertIDR } from "@/helpers/convertIDR";
import type { Product } from "types/products";
import Button from "./Button.vue";

const { product } = defineProps<{
  path?: string;
  product: Product;
}>();
</script>
