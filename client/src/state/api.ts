import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "./types";

// Create the main API slice for Redux Toolkit Query
export const api = createApi({
  reducerPath: "main", // Unique key for this slice in the store
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL, // Load backend URL from .env
  }),
  tagTypes: ["Kpis", "Products", "Transactions"], // Used for cache invalidation
  endpoints: (build) => ({
    // GET /kpi/kpis/
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),

    // GET /product/products/
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),

    // GET /transaction/transactions/
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
  }),
});

// Export auto-generated hooks for usage in functional components
export const {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} = api;
