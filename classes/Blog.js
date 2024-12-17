const { v4: uuidv4 } = require('uuid');

class Blog {
  constructor(title, content) {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Blog;
