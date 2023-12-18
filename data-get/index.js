const express = require("express");
const app = express();
const port = 8080;

app.use(express.json()); // Middleware to parse JSON in request body

// Custom middleware for logging each request
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Root route
app.get("/", (req, res) => {
    const ipAddress = req.ip;
    console.log("IP Address:", ipAddress);
    res.send(`Welcome to the root. Your IP Address: ${ipAddress}`);
});

// Simple route
app.get("/apple", (req, res) => {
    res.send("You requested an apple!");
});

// Dynamic parameter route
app.get("/:username/:id", (req, res) => {
    const { username, id } = req.params;
    res.send(`Hello, ${username}! Your ID is ${id}.`);
});

// Query parameter route
app.get("/search", (req, res) => {
    const queryParams = req.query;
    console.log("Query Parameters:", queryParams);
    res.send(`Query Parameters: ${JSON.stringify(queryParams)}`);
});

// POST route to add a new user
app.post("/users", (req, res) => {
    const newUser = req.body;
    // Perform validation, save to database, etc.
    console.log("New User:", newUser);
    res.status(201).json({ message: "User added successfully", user: newUser });
});

// GET route to retrieve a list of users
app.get("/users", (req, res) => {
    // In a real application, you would fetch users from a database
    const users = [
        { id: 1, username: "john_doe" },
        { id: 2, username: "jane_smith" },
    ];
    res.json(users);
});

// PUT route to update user information
app.put("/users/:id", (req, res) => {
    const userId = req.params.id;
    const updatedInfo = req.body;
    // Update user in the database or perform other actions
    console.log(`Updating user ${userId} with new info:`, updatedInfo);
    res.json({ message: `User ${userId} updated successfully`, updatedInfo });
});

// DELETE route to delete a user
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    // Delete user from the database or perform other actions
    console.log(`Deleting user ${userId}`);
    res.json({ message: `User ${userId} deleted successfully` });
});

// 404 route
app.use((req, res) => {
    res.status(404).send("404 - Not Found");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});
