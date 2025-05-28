
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Plus, Minus, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GroceryItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  unit: string;
  serves: string;
}

interface GroceryItemCardProps {
  item: GroceryItem;
}

const GroceryItemCard: React.FC<GroceryItemCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        items: [item.serves],
        description: item.description
      });
    }
    console.log(`Added ${quantity} ${item.title}(s) to cart`);
    
    // Show success feedback and redirect to cart
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  const handleDonateNow = () => {
    // Add to cart first
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        items: [item.serves],
        description: item.description
      });
    }
    
    // Navigate directly to donation flow
    navigate(`/donate?kit=${item.id}`);
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
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ₹{item.price.toLocaleString()}
        </div>
        <div className="absolute top-4 left-4 bg-white/90 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
          per {item.unit}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
        
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center text-green-700 text-sm">
            <Users className="w-4 h-4 mr-2" />
            <span className="font-medium">{item.serves}</span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity:
          </label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center h-8"
              min="1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Total: ₹{(item.price * quantity).toLocaleString()}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors duration-300 text-sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add {quantity} to Cart
          </Button>
          
          <Button 
            onClick={handleDonateNow}
            variant="outline"
            className="w-full border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-lg font-semibold transition-colors duration-300 text-sm"
          >
            Donate Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroceryItemCard;
