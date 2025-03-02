import type { Product } from "types/products";
import type { DocumentData } from "firebase/firestore";

export function convertToProductsType(doc: DocumentData): Product {
  return {
    category: doc.category || "",
    description: doc.description || "",
    image: doc.image || "",
    name: doc.name || "",
    price: doc.price || "0",
    status: doc.status || "false",
    stock: Array.isArray(doc.stock) ? doc.stock : [],
    created_at: doc.created_at || "",
    updated_at: doc.updated_at || "",
  };
}
