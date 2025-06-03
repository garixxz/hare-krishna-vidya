
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Save, X, Users, Eye, FileText } from 'lucide-react';

const JobManagement = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Program Coordinator',
      location: 'Mumbai, India',
      type: 'Full-time',
      department: 'Operations',
      status: 'Active',
      applications: 12,
      description: 'We are looking for a dedicated Program Coordinator to manage our food distribution programs.',
      requirements: 'Bachelor\'s degree, 2+ years experience in NGO work'
    },
    {
      id: 2,
      title: 'Volunteer Manager',
      location: 'Delhi, India',
      type: 'Part-time',
      department: 'Community',
      status: 'Active',
      applications: 8,
      description: 'Manage and coordinate volunteer activities across different programs.',
      requirements: 'Experience in volunteer management, excellent communication skills'
    }
  ]);

  const [applicants] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      jobId: 1,
      jobTitle: 'Program Coordinator',
      appliedDate: '2024-05-18',
      status: 'Pending',
      experience: '3 years',
      notes: ''
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      jobId: 1,
      jobTitle: 'Program Coordinator',
      appliedDate: '2024-05-17',
      status: 'Shortlisted',
      experience: '5 years',
      notes: 'Strong candidate with relevant NGO experience'
    },
    {
      id: 3,
      name: 'Anita Gupta',
      email: 'anita.gupta@email.com',
      jobId: 2,
      jobTitle: 'Volunteer Manager',
      appliedDate: '2024-05-16',
      status: 'Pending',
      experience: '2 years',
      notes: ''
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingApplications, setViewingApplications] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    department: '',
    description: '',
    requirements: ''
  });

  const handleSave = () => {
    if (editingId) {
      setJobs(jobs.map(job => 
        job.id === editingId 
          ? { ...job, ...formData }
          : job
      ));
      setEditingId(null);
    } else {
      const newJob = {
        id: Date.now(),
        ...formData,
        status: 'Active',
        applications: 0
      };
      setJobs([...jobs, newJob]);
      setIsCreating(false);
    }
    setFormData({ title: '', location: '', type: '', department: '', description: '', requirements: '' });
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      location: job.location,
      type: job.type,
      department: job.department,
      description: job.description || '',
      requirements: job.requirements || ''
    });
    setEditingId(job.id);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setViewingApplications(null);
    setFormData({ title: '', location: '', type: '', department: '', description: '', requirements: '' });
  };

  const updateApplicationStatus = (applicantId, newStatus) => {
    // In a real app, this would update the database
    console.log(`Updated applicant ${applicantId} status to ${newStatus}`);
  };

  if (viewingApplications) {
    const jobApplications = applicants.filter(app => app.jobId === viewingApplications.id);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Applications for {viewingApplications.title}</h2>
            <p className="text-gray-600">{jobApplications.length} applications received</p>
          </div>
          <Button onClick={() => setViewingApplications(null)} variant="outline">
            <X className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </div>

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobApplications.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell>{applicant.experience}</TableCell>
                    <TableCell>{applicant.appliedDate}</TableCell>
                    <TableCell>
                      <select
                        value={applicant.status}
                        onChange={(e) => updateApplicationStatus(applicant.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs border-0 ${
                          applicant.status === 'Shortlisted' 
                            ? 'bg-green-100 text-green-600' 
                            : applicant.status === 'Rejected'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job Postings</CardTitle>
          <Button onClick={() => setIsCreating(true)} className="bg-orange-600 hover:bg-orange-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Job
          </Button>
        </CardHeader>
        <CardContent>
          {isCreating && (
            <div className="mb-6 p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Job' : 'Create New Job'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Job location"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="Full-time, Part-time, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Department name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Job description"
                  rows={4}
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Job requirements"
                  rows={4}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewingApplications(job)}
                      className="flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      {job.applications || 0}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
                      {job.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(job)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(job.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobManagement;
