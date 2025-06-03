import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Save, X, Eye, Upload, ArrowLeft } from 'lucide-react';
import MediumStyleEditor from './MediumStyleEditor';

const BlogManagement = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'The Impact of Your Donations',
      author: 'Hare Krishna Vidya Team',
      date: '2024-05-20',
      status: 'Published',
      content: 'Discover how your contributions are making a real difference in communities across India. Through our comprehensive donation programs, we have been able to reach thousands of families.',
      excerpt: 'Discover how your contributions are making a real difference in communities across India.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Impact Stories'
    },
    {
      id: 2,
      title: 'Sustainable Food Distribution',
      author: 'Dr. Radha Sharma',
      date: '2024-05-15',
      status: 'Draft',
      content: 'Learn about our sustainable methods for ensuring food reaches those who need it most. Our distribution network spans across multiple states.',
      excerpt: 'Learn about our sustainable methods for ensuring food reaches those who need it most.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Methodology'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    category: '',
    image: ''
  });

  const handleImageUpload = (file: File) => {
    // In a real app, you'd upload to a server
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, image: imageUrl });
  };

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
    setFormData({ title: '', author: '', excerpt: '', content: '', category: '', image: '' });
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
      category: post.category || '',
      image: post.image || ''
    });
    setEditingId(post.id);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setPreviewPost(null);
    setFormData({ title: '', author: '', excerpt: '', content: '', category: '', image: '' });
  };

  const handlePreview = (post) => {
    setPreviewPost(post);
  };

  const togglePublishStatus = (id) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, status: post.status === 'Published' ? 'Draft' : 'Published' }
        : post
    ));
  };

  if (previewPost) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Blog Preview</h2>
          <Button onClick={() => setPreviewPost(null)} variant="outline">
            <X className="w-4 h-4 mr-2" />
            Close Preview
          </Button>
        </div>
        
        {/* Blog Preview */}
        <Card className="max-w-4xl mx-auto">
          <div className="aspect-video overflow-hidden rounded-t-lg">
            {previewPost.image && (
              <img
                src={previewPost.image}
                alt={previewPost.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <CardContent className="p-8">
            <div className="mb-4">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                {previewPost.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{previewPost.title}</h1>
            <div className="flex items-center text-gray-600 mb-6">
              <span>By {previewPost.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(previewPost.date).toLocaleDateString()}</span>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                {previewPost.content}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Medium-style editor view
  if (isCreating) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">
                {editingId ? 'Edit Story' : 'Write a Story'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => handlePreview({ ...formData, id: Date.now(), date: new Date().toISOString().split('T')[0] })} 
                variant="outline"
                size="sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={handleSave} 
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>

        {/* Cover Image Section */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {formData.image ? (
            <div className="relative mb-8">
              <img
                src={formData.image}
                alt="Cover"
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-4 right-4"
                onClick={() => setFormData({ ...formData, image: '' })}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <label className="block mb-8 border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-orange-400 transition-colors">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg text-gray-600 mb-2">Add a cover image</p>
                <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                className="hidden"
              />
            </label>
          )}

          {/* Medium Style Editor */}
          <MediumStyleEditor
            title={formData.title}
            content={formData.content}
            excerpt={formData.excerpt}
            onTitleChange={(title) => setFormData({ ...formData, title })}
            onContentChange={(content) => setFormData({ ...formData, content })}
            onExcerptChange={(excerpt) => setFormData({ ...formData, excerpt })}
            onImageUpload={handleImageUpload}
          />

          {/* Metadata Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Story Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="Story category"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Blog Posts Management</CardTitle>
          <Button onClick={() => setIsCreating(true)} className="bg-orange-600 hover:bg-orange-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            Write Story
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
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
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`text-xs ${
                        post.status === 'Published' 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                      }`}
                      onClick={() => togglePublishStatus(post.id)}
                    >
                      {post.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreview(post)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
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
