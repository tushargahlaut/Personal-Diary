const express=require("express");
const app=express();
const axios=require("axios");
const { response } = require("express");
const ejs=require("ejs");
const _ =require("lodash");


const homeStartingContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo nunc sit amet scelerisque aliquet. Vivamus ut tristique quam. Donec non vestibulum neque. Praesent semper sapien sit amet lectus fringilla, at ultrices ipsum ultricies. Mauris molestie arcu quis arcu vestibulum faucibus. Praesent quis tempor purus. Donec magna turpis, interdum ac augue non, tincidunt tristique justo. Duis consequat eget nulla vel porta. Quisque viverra sit amet justo sit amet consequat. Proin pretium, tellus vel efficitur iaculis, felis nibh lacinia elit, a blandit urna eros vitae justo. Etiam nec felis mauris. Pellentesque consequat varius arcu, a sodales urna malesuada ac. Integer venenatis leo id feugiat lobortis. Nullam vitae dapibus lectus. Pellentesque gravida pretium ultrices.`;
const aboutContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo nunc sit amet scelerisque aliquet. Vivamus ut tristique quam. Donec non vestibulum neque. Praesent semper sapien sit amet lectus fringilla, at ultrices ipsum ultricies. Mauris molestie arcu quis arcu vestibulum faucibus. Praesent quis tempor purus. Donec magna turpis, interdum ac augue non, tincidunt tristique justo. Duis consequat eget nulla vel porta. Quisque viverra sit amet justo sit amet consequat. Proin pretium, tellus vel efficitur iaculis, felis nibh lacinia elit, a blandit urna eros vitae justo. Etiam nec felis mauris. Pellentesque consequat varius arcu, a sodales urna malesuada ac. Integer venenatis leo id feugiat lobortis. Nullam vitae dapibus lectus. Pellentesque gravida pretium ultrices.`;
const contactContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo nunc sit amet scelerisque aliquet. Vivamus ut tristique quam. Donec non vestibulum neque. Praesent semper sapien sit amet lectus fringilla, at ultrices ipsum ultricies. Mauris molestie arcu quis arcu vestibulum faucibus. Praesent quis tempor purus. Donec magna turpis, interdum ac augue non, tincidunt tristique justo. Duis consequat eget nulla vel porta. Quisque viverra sit amet justo sit amet consequat. Proin pretium, tellus vel efficitur iaculis, felis nibh lacinia elit, a blandit urna eros vitae justo. Etiam nec felis mauris. Pellentesque consequat varius arcu, a sodales urna malesuada ac. Integer venenatis leo id feugiat lobortis. Nullam vitae dapibus lectus. Pellentesque gravida pretium ultrices.`;
let posts=[];

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
    res.render("home",{homeContent : homeStartingContent,
        posts : posts});
});

app.get("/about",function(req,res){
    res.render("about",{aboutContent : aboutContent});
});

app.get("/contact",function(req,res){
    res.render("contact",{contactContent : contactContent});
});

app.get("/compose",function(req,res){
    res.render("compose",{composeContent : contactContent});
});

app.post("/compose",function(req,res){
   
    var post = {
        title : req.body.title,
        content : req.body.content
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postname",function(req,res){
    var requestedTitle = _.lowerCase(req.params.postname);
    posts.forEach(function(post){
        var storedTitle = _.lowerCase(post.title);
        if(requestedTitle==storedTitle){
          res.render("post",{
              title:post.title,
              content:post.content
          });
        }
        else{
            res.redirect("/");
            console.log("No such entry");
        }
    });
});

app.listen(process.env.PORT||3000,()=>{
    console.log("Server Started");
})
