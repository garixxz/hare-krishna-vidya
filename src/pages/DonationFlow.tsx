
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, User, Mail, Phone } from 'lucide-react';

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
    education: { title: 'Education Kit', price: 790, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    grocery: { title: 'Grocery Kit', price: 1200, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    center: { title: 'Center Kit', price: 35000, image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }
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
      <h2 className="text-2xl font-bold text-center">Choose Your Donation Amount</h2>
      {selectedKit && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <img src={selectedKit.image} alt={selectedKit.title} className="w-20 h-20 object-cover rounded-lg" />
              <div>
                <h3 className="text-xl font-semibold">{selectedKit.title}</h3>
                <p className="text-gray-600">Suggested: ₹{selectedKit.price.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        <Label htmlFor="amount">Donation Amount (₹)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder={selectedKit?.price.toString() || "1000"}
          value={formData.amount}
          onChange={handleInputChange}
          className="text-lg"
        />
        
        <div className="grid grid-cols-3 gap-2">
          {[1000, 2500, 5000].map(amount => (
            <Button
              key={amount}
              variant="outline"
              onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
              className="py-3"
            >
              ₹{amount.toLocaleString()}
            </Button>
          ))}
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
      <div className="container mx-auto px-6 max-w-2xl">
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
