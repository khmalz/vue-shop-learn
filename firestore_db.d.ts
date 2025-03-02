declare module "types/products" {
  export interface ProductStock {
    size: string;
    qty: number;
  }

  export interface Product {
    category: string;
    description: string;
    image: string;
    name: string;
    price: number;
    status: string;
    stock: ProductStock[];
    created_at: string;
    updated_at: string;
  }
}
