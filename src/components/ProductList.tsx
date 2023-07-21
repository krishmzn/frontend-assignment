import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {products.map((product) => (
        <AnimatedProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

interface AnimatedProductCardProps {
  product: Product;
}

const AnimatedProductCard: React.FC<AnimatedProductCardProps> = ({ product }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animate only once when it comes into view
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
      className="bg-white rounded-lg shadow-lg p-4"
      initial="initial"
      animate={inView ? "animate" : "initial"}
      exit="exit"
      variants={cardVariants}
      transition={{ duration: 0.5 }}
    >
      <ProductCard product={product} />
    </motion.div>
  );
};

export default ProductList;
