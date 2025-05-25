import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, User, Mail, Phone, Package } from 'lucide-react';

const DonationFlow = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const kitId = searchParams.get('kit');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    panCard: ''
  });

  const kits = {
    education: { 
      title: 'Education Kit', 
      price: 790, 
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      items: ['3-5 Recycled Notebooks', '2 Blue Pens', 'Pencils & Eraser', 'Geometry Box', 'Pencil Pouch', 'Hygiene Kit'],
      description: 'Complete educational supplies to support a child\'s learning journey for an entire academic year.'
    },
    grocery: { 
      title: 'Grocery Kit', 
      price: 1200, 
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      items: ['Rice 10Kg', 'Desi Ghee 1L', 'Masoor Dal 5Kg', 'Cooking Oil', 'Spices & Essentials'],
      description: 'Essential food items to nourish a family of 4-5 members for 2-3 weeks.'
    },
    center: { 
      title: 'Center Kit', 
      price: 35000, 
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      items: ['Green Board & Stand', 'Charts & Teaching Materials', 'Steel Plates & Glasses', 'Center Board', 'Books & References'],
      description: 'Complete setup for establishing a community learning center to educate 30-40 children.'
    }
  };

  const selectedKit = kitId && kits[kitId as keyof typeof kits];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simulate payment processing
      setTimeout(() => {
        navigate('/donation-success', { 
          state: { 
            kit: selectedKit, 
            amount: formData.amount || selectedKit?.price,
            donorName: `${formData.firstName} ${formData.lastName}`
          }
        });
      }, 2000);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Kit Details & Donation Amount</h2>
      {selectedKit && (
        <div className="space-y-6">
          {/* Kit Overview Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                <img src={selectedKit.image} alt={selectedKit.title} className="w-full md:w-32 h-32 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">{selectedKit.title}</h3>
                  <p className="text-gray-600 mb-3">{selectedKit.description}</p>
                  <div className="flex items-center text-orange-600 font-semibold">
                    <Package className="w-5 h-5 mr-2" />
                    Suggested: ₹{selectedKit.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kit Contents Card */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-orange-800 flex items-center">
                <Package className="w-6 h-6 mr-2" />
                What's Included in This Kit
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-3">
                {selectedKit.items.map((item, index) => (
                  <div key={index} className="flex items-center bg-white p-3 rounded-lg border border-orange-200">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg border border-orange-200">
                <p className="text-sm text-gray-600 italic">
                  💝 Each kit is carefully assembled with quality items and delivered directly to beneficiaries in underserved communities.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="space-y-4">
        <Label htmlFor="amount" className="text-lg font-semibold">Choose Your Donation Amount (₹)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder={selectedKit?.price.toString() || "1000"}
          value={formData.amount}
          onChange={handleInputChange}
          className="text-lg p-4"
        />
        
        <div className="grid grid-cols-3 gap-3">
          {[selectedKit?.price || 1000, 2500, 5000].map(amount => (
            <Button
              key={amount}
              variant="outline"
              onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
              className={`py-3 ${formData.amount === amount.toString() ? 'bg-orange-100 border-orange-500' : ''}`}
            >
              ₹{amount.toLocaleString()}
            </Button>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            💡 You can donate any amount. The suggested amount covers the full cost of one complete kit.
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Your Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Payment Details</h2>
      
      <Card className="p-6 bg-gray-50">
        <h3 className="font-semibold mb-4">Donation Summary</h3>
        <div className="space-y-2">
          {selectedKit && <p><span className="font-medium">Kit:</span> {selectedKit.title}</p>}
          <p><span className="font-medium">Amount:</span> ₹{(formData.amount || selectedKit?.price || 0).toLocaleString()}</p>
          <p><span className="font-medium">Donor:</span> {formData.firstName} {formData.lastName}</p>
          <p><span className="font-medium">Email:</span> {formData.email}</p>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <Label>Payment Method: Credit/Debit Card</Label>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            🔒 Your payment is secured with 256-bit SSL encryption. 
            You'll be redirected to our secure payment gateway.
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
            Your donation is eligible for 80G tax exemption.
          </p>
        </div>
      </div>
    </div>
  );

  if (!selectedKit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Kit Selection</h2>
          <p className="text-gray-600 mb-6">Please select a valid kit to proceed with donation.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 1 ? 'Back to Home' : 'Previous Step'}
          </Button>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  stepNum <= step ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && <div className={`w-12 h-0.5 ${
                  stepNum < step ? 'bg-orange-600' : 'bg-gray-200'
                }`} />}
              </div>
            ))}
          </div>
        </div>

        <Card className="p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handleContinue}
              className="bg-orange-600 hover:bg-orange-700 px-8 py-3 text-lg"
              disabled={
                (step === 1 && !formData.amount) ||
                (step === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone))
              }
            >
              {step === 3 ? 'Complete Donation' : 'Continue'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DonationFlow;
