
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Gift, Edit3, Trash2, Save, X, Eye } from 'lucide-react';

const KitManagement = () => {
  const [kits, setKits] = useState([
    {
      id: 'hope-basic',
      name: 'Hope Basic Kit',
      description: 'Essential food items for a family of 4 for one week',
      category: 'Food',
      price: 500,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop',
      isActive: true,
      lastUpdated: '2024-05-20'
    },
    {
      id: 'hope-premium',
      name: 'Hope Premium Kit',
      description: 'Complete nutrition kit with premium items for a family of 4',
      category: 'Food',
      price: 1000,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop',
      isActive: true,
      lastUpdated: '2024-05-18'
    },
    {
      id: 'hope-family',
      name: 'Hope Family Kit',
      description: 'Comprehensive kit for larger families with extended support',
      category: 'Food',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop',
      isActive: false,
      lastUpdated: '2024-05-15'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Food',
    price: 0,
    image: '',
    isActive: true
  });

  const handleEdit = (kit: any) => {
    setFormData({
      name: kit.name,
      description: kit.description,
      category: kit.category,
      price: kit.price,
      image: kit.image,
      isActive: kit.isActive
    });
    setEditingId(kit.id);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingId) {
      setKits(kits.map(kit => 
        kit.id === editingId 
          ? { ...kit, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
          : kit
      ));
      setEditingId(null);
    } else {
      const newKit = {
        id: `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        ...formData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setKits([...kits, newKit]);
    }
    setIsEditing(false);
    setFormData({ name: '', description: '', category: 'Food', price: 0, image: '', isActive: true });
  };

  const handleDelete = (id: string) => {
    setKits(kits.filter(kit => kit.id !== id));
  };

  const toggleActive = (id: string) => {
    setKits(kits.map(kit => 
      kit.id === id ? { ...kit, isActive: !kit.isActive } : kit
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <Gift className="w-6 h-6 text-orange-600" />
            <div>
              <CardTitle>Donation Kit Manager</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Create and manage donation kits</p>
            </div>
          </div>
          <Button onClick={() => setIsEditing(true)} className="bg-orange-600 hover:bg-orange-700">
            <Gift className="w-4 h-4 mr-2" />
            Add Kit
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing && (
            <div className="mb-6 p-6 border rounded-lg bg-orange-50">
              <h3 className="text-lg font-semibold mb-4 text-orange-800">
                {editingId ? 'Edit Kit' : 'Create New Kit'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kitName">Kit Name</Label>
                  <Input
                    id="kitName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Education Kit"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Food">Food</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Hygiene">Hygiene</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what's included in this kit..."
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="isActive">Make kit visible to donors</Label>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Kit
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Kit Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kits.map((kit) => (
              <Card key={kit.id} className={`overflow-hidden ${kit.isActive ? 'border-green-200' : 'border-gray-200 opacity-75'}`}>
                <div className="relative">
                  <img 
                    src={kit.image} 
                    alt={kit.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      kit.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {kit.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{kit.name}</h3>
                    <span className="text-lg font-bold text-orange-600">₹{kit.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{kit.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                      {kit.category}
                    </span>
                    <span>Updated: {kit.lastUpdated}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(kit)}>
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant={kit.isActive ? "secondary" : "default"} 
                      onClick={() => toggleActive(kit.id)}
                    >
                      {kit.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(kit.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kit Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            See how your donation kits appear to donors on the frontend
          </p>
          <Button variant="outline">
            🔗 View Live Donation Page
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default KitManagement;
