const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());   
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
 
app.get("/", (req, res) => {
    const ipAddress = req.ip;
    console.log("IP Address:", ipAddress);
    res.send(`Welcome to the root. Your IP Address: ${ipAddress}`);
}); 
app.get("/apple", (req, res) => {
    res.send("You requested an apple!");
});
 
app.get("/:username/:id", (req, res) => {
    const { username, id } = req.params;
    res.send(`Hello, ${username}! Your ID is ${id}.`);
});
 
app.get("/search", (req, res) => {
    const queryParams = req.query;
    console.log("Query Parameters:", queryParams);
    res.send(`Query Parameters: ${JSON.stringify(queryParams)}`);
}); 
app.post("/users", (req, res) => {
    const newUser = req.body; 
    console.log("New User:", newUser);
    res.status(201).json({ message: "User added successfully", user: newUser });
}); 
app.get("/users", (req, res) => { 
    const users = [
        { id: 1, username: "john_doe" },
        { id: 2, username: "jane_smith" },
    ];
    res.json(users);
});
 
app.put("/users/:id", (req, res) => {
    const userId = req.params.id;
    const updatedInfo = req.body; 
    console.log(`Updating user ${userId} with new info:`, updatedInfo);
    res.json({ message: `User ${userId} updated successfully`, updatedInfo });
});
 
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id; 
    console.log(`Deleting user ${userId}`);
    res.json({ message: `User ${userId} deleted successfully` });
}); 
app.use((req, res) => {
    res.status(404).send("404 - Not Found");
}); 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});
