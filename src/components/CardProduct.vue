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
          <div class="flex mt-3 gap-x-1">
            <router-link :to="{ name: 'update_product', params: { id: product.id } }">
              <Button
                class="!bg-cyan-600 hover:!bg-cyan-700 focus-visible:!outline-cyan-700 disabled:!bg-cyan-800"
                >Edit</Button
              >
            </router-link>
            <Button
              @click="() => confirmDelete(product.id)"
              class="!bg-rose-600 hover:!bg-rose-700 focus-visible:!outline-rose-700 disabled:!bg-rose-800"
              >Delete</Button
            >
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
import { deleteDoc, doc } from "firebase/firestore";
import { productsRef } from "@/lib/firebase";
import { deleteObject, getStorage, ref as storageRef } from "firebase/storage";

const { product } = defineProps<{
  path?: string;
  product: Product;
}>();

const confirmDelete = (productId: string) => {
  if (confirm("Are you sure?")) {
    deleteProduct(productId);
  }
};

const deleteImage = async (imagePath: string) => {
  const storage = getStorage();

  try {
    const imageRef = storageRef(storage, imagePath);
    await deleteObject(imageRef);
    console.log("Gambar berhasil dihapus dari Storage");
  } catch (error) {
    console.error("Gagal menghapus gambar:", error);
  }
};

const deleteProduct = async (productId: string) => {
  try {
    await deleteImage(`images/products/${productId}/main.jpg`);
    await deleteDoc(doc(productsRef, productId));
    console.log(`Produk dengan ID ${productId} berhasil dihapus dari Firestore`);
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
  }
};
</script>
