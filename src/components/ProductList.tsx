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
        <div className='bg-white cursor-pointer text-black rounded-xl border border-gray-100 shadow hover:shadow-2xl transition-transform hover:scale-105'>
          <AnimatedProductCard key={product.id} product={product} />
        </div>
      ))}
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
