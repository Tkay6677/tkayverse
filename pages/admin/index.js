import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '../../contexts/ThemeContext';

// Use TinyMCE React editor
const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then(mod => mod.Editor),
  { ssr: false }
);
const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY; // Add your TinyMCE API key here

export default function AdminDashboard() {
  const { theme } = useTheme();
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingBlogSlug, setEditingBlogSlug] = useState(null);

  const [projForm, setProjForm] = useState({ title: '', desc: '', tech: '', link: '', image: '' });
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', snippet: '', previewImage: '', date: '', content: '' });

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error);
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(console.error);
  }, []);

  // Edit/Delete handlers
  const startEditProject = p => {
    setProjForm({ title: p.title, desc: p.desc, tech: p.tech.join(','), link: p.link, image: p.image });
    setEditingProjectId(p._id);
    setTab('projects');
  };
  const deleteProject = async id => {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    const updated = await fetch('/api/projects').then(r => r.json());
    setProjects(updated);
  };
  const startEditBlog = post => {
    setBlogForm({ title: post.title, slug: post.slug, snippet: post.snippet, previewImage: post.previewImage, date: new Date(post.date).toISOString().slice(0,10), content: post.content });
    setEditingBlogSlug(post.slug);
    setTab('blogs');
  };
  const deleteBlog = async slug => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    const updated = await fetch('/api/posts').then(r => r.json());
    setPosts(updated);
  };


  // Upload project image to Cloudinary
  const handleProjImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    setProjForm({ ...projForm, image: data.url });
    setUploading(false);
  };

  // Upload blog preview image
  const handleBlogPreviewUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    setBlogForm({ ...blogForm, previewImage: data.url });
    setUploading(false);
  };

  const handleProjChange = e => setProjForm({ ...projForm, [e.target.name]: e.target.value });
  const handleBlogChange = e => setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
  const handleBlogContent = content => setBlogForm({ ...blogForm, content });

  const submitProject = async e => {
    e.preventDefault();
    const method = editingProjectId ? 'PUT' : 'POST';
    const url = editingProjectId ? `/api/projects/${editingProjectId}` : '/api/projects';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...projForm, tech: projForm.tech.split(',').map(s => s.trim()) }),
    });
    if (res.ok) {
      setProjForm({ title: '', desc: '', tech: '', link: '', image: '' });
        setEditingProjectId(null);
      const updated = await fetch('/api/projects').then(r => r.json());
      setProjects(updated);
    }
  };

  const submitBlog = async e => {
    e.preventDefault();
    const method = editingBlogSlug ? 'PUT' : 'POST';
    const url = editingBlogSlug ? `/api/posts/${editingBlogSlug}` : '/api/posts';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogForm),
    });
    if (res.ok) {
      setBlogForm({ title: '', slug: '', snippet: '', previewImage: '', date: '', content: '' });
        setEditingBlogSlug(null);
      const updated = await fetch('/api/posts').then(r => r.json());
      setPosts(updated);
    }
  };

  const inpClass = 'p-2 w-full mb-2 bg-gray-800 text-white rounded border border-green-500 focus:outline-none focus:border-green-400';

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => { setTab('projects'); setEditingProjectId(null); setEditingBlogSlug(null); }}
          className={`px-4 py-2 rounded ${tab === 'projects' ? 'bg-green-500' : 'bg-gray-700'}`}
        >Projects</button>
        <button
          onClick={() => { setTab('blogs'); setEditingProjectId(null); setEditingBlogSlug(null); }}
          className={`px-4 py-2 rounded ${tab === 'blogs' ? 'bg-green-500' : 'bg-gray-700'}`}
        >Blogs</button>
      </div>

      {tab === 'projects' && (
        <div>
          <h2 className="text-2xl mb-4">Manage Projects</h2>
          <form onSubmit={submitProject} className="mb-8">
            <input name="title" placeholder="Title" value={projForm.title} onChange={handleProjChange} className={inpClass} />
            <textarea name="desc" placeholder="Description" value={projForm.desc} onChange={handleProjChange} className={inpClass} />
            <input name="tech" placeholder="Tech (comma-separated)" value={projForm.tech} onChange={handleProjChange} className={inpClass} />
            <input name="link" placeholder="Link" value={projForm.link} onChange={handleProjChange} className={inpClass} />
            <div className="mb-2">
                <label className="block text-green-400 font-bold mb-1">Project Image</label>
                <input type="file" onChange={handleProjImageUpload} className={inpClass} />
                {projForm.image && <img src={projForm.image} alt="Project" className="mt-2 h-24 object-cover rounded" />}
              </div>
            <button type="submit" className="bg-purple-500 px-4 py-2 rounded">{editingProjectId ? 'Update Project' : 'Add Project'}</button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => (
              <div key={p._id} className="border p-4 rounded-lg bg-gray-800">
                <strong>{p.title}</strong> - {p.desc}
                <div className="mt-2 space-x-2">
                  <button onClick={() => startEditProject(p)} className="bg-blue-500 px-2 py-1 rounded text-white">Edit</button>
                  <button onClick={() => deleteProject(p._id)} className="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'blogs' && (
        <div>
          <h2 className="text-2xl mb-4">Manage Blogs</h2>
          <form onSubmit={submitBlog} className="mb-8">
            <input name="title" placeholder="Title" value={blogForm.title} onChange={handleBlogChange} className={inpClass} />
            <input name="slug" placeholder="Slug" value={blogForm.slug} onChange={handleBlogChange} className={inpClass} />
            <textarea name="snippet" placeholder="Snippet" value={blogForm.snippet} onChange={handleBlogChange} className={inpClass} />
            <div className="mb-2">
                <label className="block text-green-400 font-bold mb-1">Preview Image</label>
                <input type="file" onChange={handleBlogPreviewUpload} className={inpClass} />
                {blogForm.previewImage && <img src={blogForm.previewImage} alt="Preview" className="mt-2 h-24 object-cover rounded" />}
              </div>
            <input name="date" type="date" placeholder="Date" value={blogForm.date} onChange={handleBlogChange} className={inpClass} />
            <Editor apiKey={apiKey} tinymceScriptSrc={`https://cdn.tiny.cloud/1/${apiKey}/tinymce/6/tinymce.min.js`} 
  value={blogForm.content}
  init={{
    file_picker_types: 'image media',
    file_picker_callback: function (callback, value, meta) {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', meta.filetype === 'image' ? 'image/*' : 'video/*');
      input.onchange = function () {
        const file = this.files[0];
        const formData = new FormData();
        formData.append('file', file);
        fetch('/api/upload', { method: 'POST', body: formData })
          .then(res => res.json())
          .then(json => {
            const img = new Image();
            img.onload = () => {
              callback(json.url, { alt: file.name, width: img.width, height: img.height });
            };
            img.src = json.url;
          })
          .catch(err => console.error(err));
      };
      input.click();
    },
    height: 400,
    menubar: 'file edit view insert format tools table help',
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'paste', 'help', 'wordcount', 'emoticons'
    ],
    images_upload_url: '/api/upload',
    automatic_uploads: true,
    images_upload_credentials: true,
    toolbar: 'undo redo | formatselect | bold italic backcolor | outdent indent | numlist bullist | link image media emoticons | removeformat | help'
  }}
  onEditorChange={handleBlogContent}
  className="mb-4 bg-white text-black"
/>
            <button type="submit" className="bg-purple-500 px-4 py-2 rounded">{editingBlogSlug ? 'Update Blog Post' : 'Add Blog Post'}</button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => (
              <div key={post._id} className="border p-4 rounded-lg bg-gray-800">
                <strong>{post.title}</strong> - {new Date(post.date).toLocaleDateString()}
                <div className="mt-2 space-x-2">
                  <button onClick={() => startEditBlog(post)} className="bg-blue-500 px-2 py-1 rounded text-white">Edit</button>
                  <button onClick={() => deleteBlog(post.slug)} className="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
