
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Plus, Minus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Kit {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  items: string[];
}

interface KitCardProps {
  kit: Kit;
}

const KitCard: React.FC<KitCardProps> = ({ kit }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: kit.id,
        title: kit.title,
        price: kit.price,
        image: kit.image,
        items: kit.items,
        description: kit.description
      });
    }
    console.log(`Added ${quantity} ${kit.title}(s) to cart`);
    
    // Show success feedback and redirect to cart
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  const handleViewDetails = () => {
    navigate(`/donate?kit=${kit.id}`);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={kit.image} 
          alt={kit.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ₹{kit.price.toLocaleString()}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{kit.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{kit.description}</p>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-700">What's included:</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-orange-600 hover:text-orange-700 p-0"
            >
              <Eye className="w-4 h-4 mr-1" />
              {showDetails ? 'Hide' : 'View All'}
            </Button>
          </div>
          
          <ul className="text-sm text-gray-600 space-y-1">
            {(showDetails ? kit.items : kit.items.slice(0, 3)).map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                {item}
              </li>
            ))}
            {!showDetails && kit.items.length > 3 && (
              <li className="text-orange-600 font-medium">+ {kit.items.length - 3} more items</li>
            )}
          </ul>
        </div>

        {/* Quantity Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of kits:
          </label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementQuantity}
              className="h-10 w-10 p-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center"
              min="1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
              className="h-10 w-10 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Total: ₹{(kit.price * quantity).toLocaleString()}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add {quantity} to Cart
          </Button>
          
          <Button 
            onClick={handleViewDetails}
            variant="outline"
            className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details & Donate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KitCard;
