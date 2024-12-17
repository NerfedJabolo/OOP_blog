const express = require('express');
const path = require('path');
const Blog = require('./classes/Blog');
const BlogManager = require('./classes/BlogManager');

const app = express();
const blogManager = new BlogManager(path.join(__dirname, 'blogs.json'));

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/blogs', (req, res) => {
  const blogs = blogManager.getAllBlogs();
  res.json(blogs);
});

app.post('/blogs', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  const blog = new Blog(title, content);
  blogManager.saveBlog(blog);
  res.status(201).json({ message: 'Blog created successfully' });
});

app.delete('/blogs/:id', (req, res) => {
  const { id } = req.params;
  blogManager.deleteBlog(id);
  res.json({ message: 'Blog deleted successfully' });
});

app.put('/blogs/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  blogManager.updateBlog(id, { title, content });
  res.json({ message: 'Blog updated successfully' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
