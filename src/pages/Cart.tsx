
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, ShoppingCart, ArrowLeft, Package, CreditCard } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/donate', { state: { cartItems } });
  };

  const handleQuickDonate = (kitId: string) => {
    navigate(`/donate?kit=${kitId}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some kits to your cart to make a difference!</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Donation Cart</h1>
          <p className="text-gray-600">
            {getTotalItems()} {getTotalItems() === 1 ? 'kit' : 'kits'} selected for donation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    {/* Kit Contents Preview */}
                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <Package className="w-4 h-4 mr-2 text-orange-600" />
                        <span className="font-medium text-sm text-gray-700">Kit Contents:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                        {item.items.slice(0, 4).map((kitItem, index) => (
                          <span key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                            {kitItem}
                          </span>
                        ))}
                        {item.items.length > 4 && (
                          <span className="text-orange-600 font-medium">
                            +{item.items.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-orange-600 font-semibold">₹{item.price.toLocaleString()} each</p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-4">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickDonate(item.id)}
                        className="text-orange-600 border-orange-600 hover:bg-orange-50"
                      >
                        Quick Donate
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                    
                    <p className="font-semibold text-lg">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-orange-600" />
                  Donation Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.title} × {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Donation</span>
                    <span className="text-orange-600">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p className="flex items-center mb-1">
                    <span className="text-green-600 mr-2">✅</span>
                    80G Tax Exemption Available
                  </p>
                  <p className="flex items-center mb-1">
                    <span className="text-blue-600 mr-2">🔒</span>
                    Secure Payment Gateway
                  </p>
                  <p className="flex items-center">
                    <span className="text-purple-600 mr-2">📧</span>
                    Instant Receipt & Updates
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-orange-600 hover:bg-orange-700 py-3 text-lg font-semibold"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                  
                  <Button 
                    onClick={clearCart}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
