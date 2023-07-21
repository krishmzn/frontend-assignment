import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Product } from "../types";

const Search: React.FC = () => {
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
    } catch {
      console.error("Error fetching products");
    }
  }, []);

  useEffect(() => {
    setFilteredProducts(allProducts);
    console.log(filteredProducts);
  }, [allProducts]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    // Filter products
    const filteredResults = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filteredResults);
  };

  const truncateTitle = (title: string, maxWords: number) => {
    const words = title.split(" ");
    if (words.length <= maxWords) {
      return title;
    } else {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
  };

  return (
    <div className="container mx-auto py-8">        
      <form onSubmit={handleSearch} className="px-4 lg:px-10">
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
            required
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {filteredProducts.length === 0 ? (
        <div>No search results found.</div>
      ) : (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <Link
                href={`/product/${product.id}`}
                passHref
                className="bg-white cursor-pointer text-black rounded-xl border border-gray-100 shadow hover:shadow-2xl transition-transform hover:scale-105"
              >
                <div className="body-font p-4 text-grey">
                  <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                      <div className="lg:w-1/4 md:w-1/2 min-w-full flex items-start justify-center flex-col border-slate-950">
                        <a className="relative max-h-44 rounded overflow-hidden flex justify-center items-center min-w-full">
                          <img
                            alt="ecommerce"
                            className="object-contain object-center w-full h-full block"
                            src={product.image}
                          ></img>
                        </a>

                        <div className="mt-4 flex flex-col gap-1">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            {product.category}
                          </h3>

                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            {truncateTitle(product.title, 6)}
                          </h2>

                          <div className="flex flex-row">
                            <button className="flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded-xl">
                              ${product.price}
                            </button>
                            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                              <svg
                                fill="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;
