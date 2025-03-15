<template>
  <div class="max-w-2xl mx-auto mt-5 pb-20">
    <form class="space-y-3" @submit.prevent="handleSubmit">
      <!-- Name -->
      <div>
        <LabelForm for="name" text="Name" />
        <div class="mt-2">
          <InputForm
            v-model="formData.name"
            type="text"
            id="name"
            name="nameInp"
            class="bg-white"
          />
        </div>
      </div>
      <!-- Price -->
      <div>
        <LabelForm for="price" text="Price" />
        <div class="mt-2">
          <InputForm
            v-model="formData.price"
            type="number"
            id="price"
            name="price"
            class="bg-white"
          />
        </div>
      </div>
      <!-- Description -->
      <div>
        <LabelForm for="description" text="Description" />
        <TextareaForm
          v-model="formData.description"
          id="description"
          rows="4"
          placeholder="description"
        />
      </div>
      <!-- Category -->
      <div>
        <LabelForm for="category" text="Category" />
        <div class="mt-2">
          <SelectForm v-model="formData.category" :options="categoryOptions" name="category" />
        </div>
      </div>
      <!-- Status -->
      <div>
        <LabelForm for="status" text="Status" />
        <div class="mt-2">
          <SelectForm v-model="formData.status" :options="statusOptions" name="status" />
        </div>
      </div>
      <!-- Upload Image -->
      <div>
        <LabelForm for="uploadImage" text="Image" />
        <div class="flex gap-y-3 flex-col">
          <img
            v-if="uploadedImage"
            :src="uploadedImageUrl"
            alt="image"
            class="w-48 h-48 object-cover rounded-md shadow-md"
          />
          <label
            for="uploadImage"
            class="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 text-center"
          >
            <p v-if="uploadedImageName">{{ uploadedImageName }}</p>
            <div v-else>
              <p>Upload a new image</p>
              <p>Maximum upload size is <span class="font-semibold">1 MB</span></p>
            </div>
          </label>
        </div>
        <InputForm type="file" hidden name="image" id="uploadImage" @change="handleImageUpload" />
      </div>
      <!-- Stock -->
      <div class="flex flex-col gap-y-2">
        <div>
          <LabelForm for="stock" text="Stock" />
          <div v-for="(item, index) in formData.stock" :key="index" class="w-full flex gap-x-2">
            <div class="w-full">
              <LabelForm for="size" text="Size" />
              <InputForm v-model="item.size" type="number" id="size" name="size" class="bg-white" />
            </div>
            <div class="w-full">
              <LabelForm for="quantity" text="Quantity" />
              <InputForm v-model="item.qty" type="number" id="qty" name="qty" class="bg-white" />
            </div>
          </div>
        </div>
        <div>
          <Button
            type="button"
            class="!bg-green-600 hover:!bg-green-700 focus-visible:!outline-green-700 disabled:!bg-green-800 !text-xs !rounded-lg"
            @click="addStock"
          >
            Add New Stock
          </Button>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          :loading="loading"
          class="!bg-blue-600 hover:!bg-blue-700 focus-visible:!outline-blue-700 disabled:!bg-blue-800 w-full"
        >
          Submit
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import InputForm from "@/components/InputForm.vue";
import LabelForm from "@/components/LabelForm.vue";
import SelectForm from "@/components/SelectForm.vue";
import TextareaForm from "@/components/TextareaForm.vue";
import { ref, computed } from "vue";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFirebaseStorage } from "vuefire";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db, productsRef } from "@/lib/firebase";

const formData = ref({
  name: "",
  price: 0,
  description: "",
  category: "Man",
  status: "true",
  stock: [
    {
      size: "",
      qty: 0,
    },
  ],
  image: "",
});

const categoryOptions = [
  { label: "Man", value: "Man" },
  { label: "Woman", value: "Woman" },
];

const statusOptions = [
  { label: "Released", value: "true" },
  { label: "Not Released", value: "false" },
];

const uploadedImage = ref<File | null>(null);

const uploadedImageUrl = computed(() =>
  uploadedImage.value ? URL.createObjectURL(uploadedImage.value) : ""
);
const uploadedImageName = computed(() => uploadedImage.value?.name || "");

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    uploadedImage.value = target.files[0];
  }
};

const addStock = () => {
  formData.value.stock.push({ size: "", qty: 0 });
};

const loading = ref(false);

const uploadFile = async (id: string) => {
  if (!uploadedImage.value) return;

  const storage = useFirebaseStorage();
  const fileRef = storageRef(storage, `images/products/${id}/main.jpg`);

  try {
    const snapshot = await uploadBytes(fileRef, uploadedImage.value);
    console.log("File uploaded successfully!");

    formData.value.image = await getDownloadURL(snapshot.ref);
    console.log("File available at:", formData.value.image);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

const handleSubmit = async () => {
  loading.value = true;

  try {
    const docRef = await addDoc(productsRef, formData.value);

    const newDocId = docRef.id;

    if (uploadedImage.value) {
      await uploadFile(newDocId);
    }

    const newProductRef = doc(db, "products", newDocId);
    await updateDoc(newProductRef, { image: formData.value.image });

    console.log("Produk berhasil ditambahkan!");

    formData.value = {
      name: "",
      price: 0,
      description: "",
      category: "Man",
      status: "true",
      stock: [
        {
          size: "",
          qty: 0,
        },
      ],
      image: "",
    };
    uploadedImage.value = null;
  } catch (error) {
    console.error("Gagal menambahkan produk:", error);
  } finally {
    loading.value = false;
  }
};
</script>
