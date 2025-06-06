import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        color: selectedColor,
        size: product.sizes?.[0]
      }
    });
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      multicolor: 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div 
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
          />
        </Link>
        
        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            SALE
          </div>
        )}

        {/* Action Buttons */}
        <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Eye className="w-5 h-5 text-gray-600" />
          </Link>
        </div>

        {/* Quick Add to Cart */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button 
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-pink-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Age Range */}
        <p className="text-sm text-gray-500 mb-3">{product.ageRange}</p>

        {/* Colors */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-600">Colors:</span>
          <div className="flex space-x-1">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                } ${getColorClass(color)}`}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-pink-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          {!product.inStock && (
            <span className="text-red-500 font-semibold">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;