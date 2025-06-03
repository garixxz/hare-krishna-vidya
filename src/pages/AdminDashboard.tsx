
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardOverview from '../components/admin/DashboardOverview';
import BlogManagement from '../components/admin/BlogManagement';
import JobManagement from '../components/admin/JobManagement';
import DonationSettings from '../components/admin/DonationSettings';
import KitManagement from '../components/admin/KitManagement';
import GroceryManagement from '../components/admin/GroceryManagement';

const AdminDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentSection = searchParams.get('section') || 'dashboard';

  const renderContent = () => {
    switch (currentSection) {
      case 'blog':
        return <BlogManagement />;
      case 'jobs':
        return <JobManagement />;
      case 'donations':
        return <KitManagement />;
      case 'grocery':
        return <GroceryManagement />;
      case 'settings':
        return <DonationSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case 'blog':
        return 'Blog Management';
      case 'jobs':
        return 'Jobs & Applications';
      case 'donations':
        return 'Donation Kits';
      case 'grocery':
        return 'Grocery Items';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard Overview';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="flex w-full">
        <AdminSidebar />
        
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{getSectionTitle()}</h1>
                <p className="text-gray-600 text-sm mt-1">
                  {currentSection === 'dashboard' && 'Welcome to your admin dashboard'}
                  {currentSection === 'blog' && 'Manage blog posts and content'}
                  {currentSection === 'jobs' && 'Post jobs and manage applications'}
                  {currentSection === 'donations' && 'Create and manage donation kits'}
                  {currentSection === 'grocery' && 'Manage grocery items and pricing'}
                  {currentSection === 'settings' && 'Configure donation settings and pricing'}
                </p>
              </div>
              
              {/* Admin Profile Dropdown */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">Super Administrator</p>
                </div>
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
