const express = require("express")
const app = express()
const path = require("path")

port = 8080;
app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))


app.get("/",(req, res)=>{
    let val = Math.floor(Math.random()*6)+1;
    res.render("home.ejs", {num:val} )
    
})
app.get("/2", (req,res)=>{
    res.send("hello")
})
app.get("/:username/:id", (req, res)=>{
    let username = req.params;
    res.send(`The Username is : ${JSON.stringify(username)}`)
})

app.get("/search", (req,res)=>{
    const q = req.query
    res.send(`the Query is : ${JSON.stringify(q)}`)
})
