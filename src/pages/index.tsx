import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import axios from "axios";
import { Product } from "../types";

import Intro from "../components/intro";
import Sale from "@component/components/sale";
import BackToTopButton from "@component/components/layout/BackToTop";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Intro></Intro>
      
      <Sale></Sale>
      
      <section className="container mx-auto py-8 flex justify-center items-center flex-col">
        <h1 className="text-4xl font-semibold mb-4 text-black">PRODUCTS</h1>
        <ProductList products={products} />
      </section>

      <BackToTopButton />
    </>
  );
};

export default Home;
