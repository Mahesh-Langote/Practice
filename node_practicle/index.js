const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    const ipp = req.ip;
    console.log("IP Address:", ipp);
    res.send(`You are on the root. Your IP Address: ${ipp}`);
});

app.get("/apple", (req, res) => {
    res.send("apple");
});

app.get("/:username/:id", (req, res) => {
    const Parameterss = req.params;
    res.send(`Parameters: ${JSON.stringify(Parameterss)}`);
});

app.get("/search", (req, res) => {
    var queryParams = req.query;
    console.log("Query Parameters:", queryParams);
    res.send(`Query Parameters: ${JSON.stringify(queryParams)}`);
});
