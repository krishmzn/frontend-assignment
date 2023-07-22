import React, { useState, useEffect } from "react";
import ProductList from '../components/ProductList'
import axios from "axios";
import { Product } from "../types";

const Search: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <section className="container mx-auto py-8 flex justify-center items-center flex-col text-slate-700">
        <h1 className="text-xl font-extrabold sm:text-5xl mb-4 text-black indent-2">SEARCH PRODUCTS</h1>
        <ProductList products={products} />
      </section>
  );
};

export default Search;
