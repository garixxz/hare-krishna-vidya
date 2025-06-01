
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Edit3, Trash2, Settings } from 'lucide-react';
import BlogManagement from '../components/admin/BlogManagement';
import JobManagement from '../components/admin/JobManagement';
import DonationSettings from '../components/admin/DonationSettings';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your content and settings</p>
        </div>

        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blog">Blog Management</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="donations">Donation Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="jobs">
            <JobManagement />
          </TabsContent>

          <TabsContent value="donations">
            <DonationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
