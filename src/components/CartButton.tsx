
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { shopping-cart } from 'lucide-react';

const CartButton = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const itemCount = getTotalItems();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate('/cart')}
      className="relative"
    >
      <shopping-cart className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
      <span className="ml-2 hidden md:inline">Cart</span>
    </Button>
  );
};

export default CartButton;
