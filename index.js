const express = require("express");
const app = express();
const path = require("path");

// Sample data for blog posts
const blogPosts = [
  { id: 1, title: "Introduction to Express.js", content: "Lorem ipsum dolor sit amet..." },
  { id: 2, title: "Building a RESTful API", content: "Lorem ipsum dolor sit amet..." },
  // Add more sample posts as needed
];

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Define routes

// Home route to display all blog posts
app.get("/", (req, res) => {
  res.render("home.ejs", { posts: blogPosts });
});

// Route to display a specific blog post
app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find((p) => p.id === postId);

  if (post) {
    res.render("post.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Route to handle post creation
app.post("/post/create", (req, res) => {
  // Implement post creation logic here
  res.send("Create a new post");
});

// Search route to search for blog posts
app.get("/search", (req, res) => {
  const query = req.query.q;
  const results = blogPosts.filter((post) => post.title.includes(query) || post.content.includes(query));
  res.render("search.ejs", { results, query });
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
