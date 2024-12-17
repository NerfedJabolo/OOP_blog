const fs = require('fs');

class BlogManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getAllBlogs() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      const blogs = JSON.parse(data);
      let updated = false;
      blogs.forEach((blog) => {
        if (!blog.id) {
          blog.id = require('uuid').v4();
          updated = true;
        }
      });
      if (updated) this.saveAllBlogs(blogs);
      return blogs;
    } catch (error) {
      return [];
    }
  }

  saveAllBlogs(blogs) {
    fs.writeFileSync(this.filePath, JSON.stringify(blogs, null, 2), 'utf-8');
  }

  saveBlog(blog) {
    const blogs = this.getAllBlogs();
    blogs.push(blog);
    this.saveAllBlogs(blogs);
  }

  deleteBlog(id) {
    const blogs = this.getAllBlogs().filter((blog) => blog.id !== id);
    this.saveAllBlogs(blogs);
  }

  updateBlog(id, updatedData) {
    const blogs = this.getAllBlogs();
    const index = blogs.findIndex((blog) => blog.id === id);
    if (index !== -1) {
      blogs[index] = {
        ...blogs[index],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
      this.saveAllBlogs(blogs);
    }
  }
}

module.exports = BlogManager;
