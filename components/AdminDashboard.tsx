import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../src/components/ui/card';
import { Input } from '../src/components/ui/input';
import { Textarea } from '../src/components/ui/textarea';
import { Button } from '../src/components/ui/button';

interface BlogPost {
  _id: string;
  title: string;
  summary: string;
  content: string;
}

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<BlogPost>();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const onSubmit = async (data: BlogPost) => {
    try {
      const url = editingPost 
        ? `/api/blogs/${editingPost._id}`
        : '/api/blogs';
      
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchPosts();
        reset();
        setEditingPost(null);
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setValue('title', post.title);
    setValue('summary', post.summary);
    setValue('content', post.content);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchPosts();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h2>
      {/* Blog Post Form */}
      <Card className="mb-8 max-w-2xl mx-auto shadow-lg border-2 border-neutral-200">
        <CardHeader>
          <CardTitle>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
          <CardDescription>
            {editingPost ? 'Update the blog post details below.' : 'Fill in the details to create a new blog post.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Title</label>
              <Input
                {...register('title', { required: true })}
                className="w-full"
                placeholder="Enter blog title"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Summary</label>
              <Textarea
                {...register('summary', { required: true })}
                className="w-full"
                rows={3}
                placeholder="Enter a short summary"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Content</label>
              <Textarea
                {...register('content', { required: true })}
                className="w-full"
                rows={6}
                placeholder="Write your blog content here..."
              />
            </div>
            <div className="flex gap-4 mt-4">
              <Button type="submit" className="bg-blue-600 text-white">
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
              {editingPost && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    reset();
                    setEditingPost(null);
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      {/* Blog Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {posts.map((post) => (
          <Card key={post._id} className="shadow-md border-2 border-neutral-200 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="truncate">{post.title}</CardTitle>
              <CardDescription className="text-xs text-gray-500">
                {new Date((post as any).createdAt).toISOString().slice(0, 10)}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 justify-between">
              <p className="text-gray-700 mb-4 line-clamp-3">{post.summary}</p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => handleEdit(post)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard; 