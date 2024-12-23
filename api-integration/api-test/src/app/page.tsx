"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export interface StoreItem {
  id: number;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const itemsPerPage = 10;

  const {
    data: ecommerce,
    isLoading,
    error,
  } = useQuery<StoreItem[]>({
    queryKey: ["storeItems"],
    queryFn: () =>
      fetch("https://my.api.mockaroo.com/assignedstore.json?key=1fe5f660").then(
        (res) => res.json()
      ),
  });

  const totalItems = ecommerce?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = ecommerce?.slice(0, endIndex) || [];

  const handleViewDetails = (item: StoreItem) => {
    queryClient.setQueryData(["clickedItem"], item);
    router.push(`/product/${item.id}`);
  };

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <div className="mb-12 text-center flex flex-col gap-y-2">
        <span className="text-4xl font-bold text-gray-900 mb-4">Products</span>
        <span className="text-gray-600 text-lg">
          Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
          {totalItems} items
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.description}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-black/75 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {item.stock} in stock
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-3">
                  {item.category}
                </span>
                <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {item.description}
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </div>
                <button
                  // onClick={() => router.push(`/product/${item.id}`)}
                  onClick={() => handleViewDetails(item)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    hoveredId === item.id
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentPage < totalPages && (
        <div className="mt-12 text-center">
          <button
            onClick={loadMore}
            className="inline-flex items-center px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}
