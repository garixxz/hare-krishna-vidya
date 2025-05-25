
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Download, Share2, Heart, Mail, Home, ArrowLeft } from 'lucide-react';

const DonationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { kit, amount, donorName } = location.state || {};

  useEffect(() => {
    if (!kit) {
      navigate('/');
    }
  }, [kit, navigate]);

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    console.log('Downloading receipt...');
    alert('Receipt download started! Check your downloads folder.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I just donated to Hare Krishna Vidya!',
        text: `I donated ₹${amount?.toLocaleString()} for a ${kit?.title} to help underprivileged communities. Join me in making a difference!`,
        url: window.location.origin
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I just donated ₹${amount?.toLocaleString()} for a ${kit?.title} to @HareKrishnaVidya! Join me in making a difference. ${window.location.origin}`;
      navigator.clipboard.writeText(text);
      alert('Share text copied to clipboard!');
    }
  };

  if (!kit) {
    return null;
  }

  // Breadcrumb component
  const Breadcrumb = () => (
    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => navigate('/')}
        className="p-0 h-auto text-orange-600 hover:text-orange-700"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </Button>
      <span>›</span>
      <span className="text-gray-800 font-medium">Donation Success</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        <Breadcrumb />
        
        <Card className="p-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Thank You for Your Donation!
            </h1>
            <p className="text-xl text-gray-600">
              Your generosity will make a real difference in someone's life.
            </p>
          </div>

          <Card className="mb-8 bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Donation Details</h2>
              <div className="space-y-2 text-left max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="font-medium">Kit:</span>
                  <span>{kit.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount:</span>
                  <span>₹{amount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Donor:</span>
                  <span>{donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Transaction ID:</span>
                  <span className="text-sm">TXN{Date.now()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold">What happens next?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-white rounded-lg border">
                <Mail className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="font-semibold">Email Confirmation</p>
                <p className="text-gray-600">You'll receive a receipt via email within 24 hours</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <Heart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="font-semibold">Kit Assembly</p>
                <p className="text-gray-600">Your kit will be assembled within 3-5 days</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <Check className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="font-semibold">Impact Updates</p>
                <p className="text-gray-600">You'll receive photos and updates on distribution</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              onClick={handleDownloadReceipt}
              variant="outline"
              className="flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline"
              className="flex items-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Your Impact
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/?scrollTo=kits')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Donate Again
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Tax Benefits</h4>
            <p className="text-sm text-gray-600">
              Your donation is eligible for tax deduction under Section 80G. 
              You can claim up to 50% of your donation amount as tax deduction.
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Want to stay connected with our work?
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm">Follow on Social Media</Button>
            <Button variant="outline" size="sm">Join Our Newsletter</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;
