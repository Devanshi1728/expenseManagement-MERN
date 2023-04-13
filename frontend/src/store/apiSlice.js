import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories",
      providesTags: ["categories"],
    }),
    getLabels: builder.query({
      query: () => "labels",
      providesTags: ["transaction"],
    }),
    addTransaction: builder.mutation({
      query: (data) => ({
        url: "transaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transaction"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export default apiSlice;
