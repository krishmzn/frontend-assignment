import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import axios from "axios";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);

  useEffect(() => {
    try {
      axios
        .get<Product[]>("https://fakestoreapi.com/products")
        .then((response) => {
          setAllProducts(response.data);
        });
        console.log('allProducts', allProducts)
    } catch {
      console.error("Error fetching products");
    }
  }, []);

  useEffect(() => {
    setFilteredProducts(allProducts);
    console.log(filteredProducts);
  }, [allProducts]);

  const truncateTitle = (title: string, maxWords: number) => {
    const words = title.split(" ");
    if (words.length <= maxWords) {
      return title;
    } else {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
  };

  const clearSearch = (event: React.FormEvent) => {
    setSearchTerm("")
    event.preventDefault();
    // Filter products
    const filteredResults = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filteredResults);
  }
  
  useEffect(() => {
    console.log('rendered')
    console.log('filteredProducts', filteredProducts)
  },[])

  useEffect(() => {
    // Initialize filteredProducts with all products
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    // Filter products based on the search term
    const filteredResults = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredResults);
  }, [searchTerm, products]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto py-8">
      <form className="px-4 lg:px-10 min-w-full">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); handleSearch(e);}}
          />
          <button
            onClick={clearSearch}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-3">
      {filteredProducts.length === 0 ? (
        <div>No search results found.</div>
      ) : (
        <>
        {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white cursor-pointer text-black rounded-xl border border-gray-100 shadow hover:shadow-2xl transition-transform hover:scale-105"
            >
              <AnimatedProductCard product={product} />
            </div>
          ))}
          </>
      )}
      </div>
    </div>
  );
};

interface AnimatedProductCardProps {
  product: Product;
}

const AnimatedProductCard: React.FC<AnimatedProductCardProps> = ({ product }) => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Animate every time when it comes to view
    threshold: 0.1, // Trigger animation when 10% of the element is visible
  });

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      exit="exit"
      variants={cardVariants}
      transition={{ duration: 0.5 }}
    >
      <ProductCard product={product} />
    </motion.div>
  );
};

export default ProductList;
