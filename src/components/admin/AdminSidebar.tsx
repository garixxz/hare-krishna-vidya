
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Book, 
  Briefcase, 
  Gift, 
  Settings,
  Grid2X2
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard Overview', icon: Home, path: '/admin', section: 'dashboard' },
    { label: 'Blogs', icon: Book, path: '/admin', section: 'blog' },
    { label: 'Jobs & Applications', icon: Briefcase, path: '/admin', section: 'jobs' },
    { label: 'Donation Kits', icon: Gift, path: '/admin', section: 'donations' },
    { label: 'Grocery Items', icon: Grid2X2, path: '/admin', section: 'grocery' },
    { label: 'Settings', icon: Settings, path: '/admin', section: 'settings' },
  ];

  const handleNavigation = (section: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('section', section);
    navigate(`/admin?${searchParams.toString()}`);
  };

  const getCurrentSection = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('section') || 'dashboard';
  };

  return (
    <div className="w-64 bg-gradient-to-b from-orange-50 to-amber-50 border-r border-orange-200 min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-orange-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">हरे</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-600">Hare Krishna Vidya</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = getCurrentSection() === item.section;
            const Icon = item.icon;
            
            return (
              <Button
                key={item.section}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                  isActive 
                    ? "bg-orange-600 text-white hover:bg-orange-700" 
                    : "text-gray-700 hover:bg-orange-100"
                }`}
                onClick={() => handleNavigation(item.section)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <Separator className="my-6 bg-orange-200" />

        {/* Admin Profile Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 bg-orange-100 rounded-lg">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-600">admin@harekrishnavidya.org</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute bottom-0 left-0 w-64 h-32 opacity-10 bg-gradient-to-t from-orange-300 to-transparent">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </div>
  );
};

export default AdminSidebar;
