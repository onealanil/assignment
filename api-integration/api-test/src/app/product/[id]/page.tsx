"use client"

import { useQuery } from "@tanstack/react-query"
import { StoreItem } from "@/app/page"

const ProductDetails = () => {
  const { data: clickedItem } = useQuery<StoreItem>({
    queryKey: ["clickedItem"]
  });

  if (!clickedItem) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="relative aspect-square">
            <img
              src={clickedItem.image}
              alt={clickedItem.description}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-gray-100 text-gray-700 rounded-full mb-2">
                {clickedItem.category}
              </span>
              <h1 className="text-2xl font-bold tracking-tight">{clickedItem.description}</h1>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">
                  ${clickedItem.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`${
                    clickedItem.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {clickedItem.stock > 0 
                      ? `${clickedItem.stock} in stock` 
                      : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                Add to Cart
              </button>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Free Delivery</span>
                  <span className="text-gray-500">2-3 business days</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Free Returns</span>
                  <span className="text-gray-500">Within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;