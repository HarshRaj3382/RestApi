const express=require("express");
let app=express();

const port=8080;

const path=require("path");
app.set("view  engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended: true}));

const { v4: uuidv4 } = require('uuid');

const methodOverride=require("method-override");
app.use(methodOverride("_method"));
let posts = [
    {
        "id": uuidv4(),
        "username": "alice123",
        "content": "Excited about my new job!"
    },
    {
        "id": uuidv4(),
        "username": "bob_the_builder",
        "content": "Just finished building a new treehouse."
    },
    {
        "id": uuidv4(),
        "username": "charlie_chocolate",
        "content": "Loving the new chocolate recipes!"
    },
    {
        "id": uuidv4(),
        "username": "dana_dance",
        "content": "Had an amazing dance practice today!"
    },
    {
        "id": uuidv4(),
        "username": "eric_engineer",
        "content": "Working on a cool new project at work."
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p) => id === p.id);
    post.content=newContent;
    res.redirect("/posts");
})


app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
 posts=posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("Radhe Radhe on port 8080");
})