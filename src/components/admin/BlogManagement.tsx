
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Save, X } from 'lucide-react';

const BlogManagement = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'The Impact of Your Donations',
      author: 'Hare Krishna Vidya Team',
      date: '2024-05-20',
      status: 'Published'
    },
    {
      id: 2,
      title: 'Sustainable Food Distribution',
      author: 'Dr. Radha Sharma',
      date: '2024-05-15',
      status: 'Draft'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    category: ''
  });

  const handleSave = () => {
    if (editingId) {
      setPosts(posts.map(post => 
        post.id === editingId 
          ? { ...post, ...formData, date: new Date().toISOString().split('T')[0] }
          : post
      ));
      setEditingId(null);
    } else {
      const newPost = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        status: 'Draft'
      };
      setPosts([...posts, newPost]);
      setIsCreating(false);
    }
    setFormData({ title: '', author: '', excerpt: '', content: '', category: '' });
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      author: post.author,
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || ''
    });
    setEditingId(post.id);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({ title: '', author: '', excerpt: '', content: '', category: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Blog Posts</CardTitle>
          <Button onClick={() => setIsCreating(true)} className="bg-orange-600 hover:bg-orange-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </CardHeader>
        <CardContent>
          {isCreating && (
            <div className="mb-6 p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Post' : 'Create New Post'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Post title"
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Post category"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Input
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short description"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Post content"
                  rows={6}
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
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.status === 'Published' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
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

export default BlogManagement;
