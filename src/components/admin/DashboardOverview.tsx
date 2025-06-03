
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Briefcase, Gift, Grid2X2 } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total Blog Posts',
      value: '24',
      change: '+3 this month',
      icon: Book,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Jobs',
      value: '8',
      change: '+2 new openings',
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      title: 'Donation Kits',
      value: '12',
      change: '3 kit types',
      icon: Gift,
      color: 'bg-orange-500'
    },
    {
      title: 'Grocery Items',
      value: '45',
      change: 'Updated prices',
      icon: Grid2X2,
      color: 'bg-purple-500'
    }
  ];

  const recentActivity = [
    { action: 'New blog post published', time: '2 hours ago', type: 'blog' },
    { action: 'Job application received', time: '4 hours ago', type: 'job' },
    { action: 'Donation kit prices updated', time: '1 day ago', type: 'donation' },
    { action: 'New grocery items added', time: '2 days ago', type: 'grocery' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'blog' ? 'bg-blue-500' :
                    activity.type === 'job' ? 'bg-green-500' :
                    activity.type === 'donation' ? 'bg-orange-500' :
                    'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                <Book className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">New Blog Post</p>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
                <Briefcase className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Post Job</p>
              </button>
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors">
                <Gift className="w-6 h-6 text-orange-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Add Kit</p>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                <Grid2X2 className="w-6 h-6 text-purple-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Update Prices</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
