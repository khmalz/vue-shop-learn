import "vue-router";
import type { RouteRecordInfo } from "vue-router";

export interface RouteNamedMap {
  home: RouteRecordInfo<"home", "/", Record<never, never>, Record<never, never>>;
  shop: RouteRecordInfo<"shop", "/shop", Record<never, never>, Record<never, never>>;
  add_product: RouteRecordInfo<
    "add-product",
    "/shop/create",
    Record<never, never>,
    Record<never, never>
  >;
  "not-found": RouteRecordInfo<"not-found", "/:path(.*)", { path: string }, { path: string }>;
}

declare module "vue-router" {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap;
  }

  interface RouteMeta {
    isAdmin?: boolean;
    order?: number;
    requiresAuth: boolean;
  }

  interface RouterList {
    name: keyof RouteNamedMap;
    path: string;
  }
}
