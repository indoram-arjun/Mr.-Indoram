import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              KiddyShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${isActive('/') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`font-medium transition-colors ${isActive('/shop') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
            >
              Shop
            </Link>
            <Link 
              to="/categories" 
              className={`font-medium transition-colors ${isActive('/categories') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${isActive('/about') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${isActive('/contact') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* User Account */}
            <Link to="/account" className="p-2 text-gray-600 hover:text-pink-500 transition-colors">
              <User className="w-6 h-6" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for toys, games, and more..."
                className="w-full px-4 py-3 pl-12 border-2 border-pink-200 rounded-full focus:border-pink-400 focus:outline-none"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-pink-500 font-medium">Home</Link>
              <Link to="/shop" className="text-gray-700 hover:text-pink-500 font-medium">Shop</Link>
              <Link to="/categories" className="text-gray-700 hover:text-pink-500 font-medium">Categories</Link>
              <Link to="/about" className="text-gray-700 hover:text-pink-500 font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-pink-500 font-medium">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;