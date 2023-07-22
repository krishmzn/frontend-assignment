import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-50 text-black p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/"  className="text-xl text-orange-600 font-bold">
           OnlineStore
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="px-2 py-1 rounded hover:bg-gray-200">
              Home
            </Link>
            <Link href="/search" className="px-2 py-1 rounded hover:bg-gray-200">
              Search
            </Link>              
            </div>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
