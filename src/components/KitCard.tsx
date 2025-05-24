
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  const navigate = useNavigate();

  const handleDonate = () => {
    console.log(`Navigating to donation flow for ${kit.title}`);
    navigate(`/donate?kit=${kit.id}`);
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
          <h4 className="font-semibold text-gray-700 mb-2">What's included:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {kit.items.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                {item}
              </li>
            ))}
            {kit.items.length > 3 && (
              <li className="text-orange-600 font-medium">+ {kit.items.length - 3} more items</li>
            )}
          </ul>
        </div>
        
        <Button 
          onClick={handleDonate}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Donate Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default KitCard;
