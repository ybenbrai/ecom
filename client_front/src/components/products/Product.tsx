"use client"; // Ensure it's a Client Component

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProducts } from "../../services/product.service";
import type { Product } from "@src/types/product";

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching products");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-[90%] mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product, i) => (
          <div
            key={product.id || i}
            className="w-full border border-gray-300 rounded-xl shadow-lg overflow-hidden bg-white"
          >
            <div className="p-4 border-b border-gray-200">
              <Image
                src={product.image || "https://picsum.photos/128/128"}
                alt={product.name}
                width={128}
                height={128}
                className="object-cover border-2 border-gray-200 rounded-lg mx-auto"
              />
            </div>

            <div className="p-4 text-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h1>
              <p className="text-sm font-light text-gray-800">
                {product.description}
              </p>
              <p className="text-sm font-light text-red-800">
                {product.price} {product.currency}
              </p>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Buy Now
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
