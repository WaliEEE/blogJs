//initial
const express = require("express");
const b_parser = require("body-parser");
var _ = require("lodash");
const ejs = require("ejs");
const mango = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(b_parser.urlencoded({extended: true}));
app.use(express.static("public"));


let port = process.env.PORT;
if(port == null || port == "")
{
  port = 3000;
}
app.listen(port, (req, res) => 
{
  console.log("Server Started");
});
//initial

const h_Content = "A home page is generally the main web page a visitor navigating to a website from a search engine will see, and it may also serve as a landing page to attract visitors.[1][2] The home page is used to facilitate navigation to other pages on the site by providing links to prioritized and recent articles and pages, and possibly a search box.[3] For example, a news website may present headlines and first paragraphs of top stories, with links to full articles.[4] Meanwhile, other websites use the home page to attract users to create an account. Once they are logged in, the home page may be redirected to their profile page. This may in turn be referred to as the personal home page.A website may have multiple home pages. Wikipedia, for example, has a home page at wikipedia.org, as well as language-specific home pages, such as en.wikipedia.org and de.wikipedia.org. The Uniform Resource Locator (URL) of a home page is most often the base-level domain name, such as https://example.com";
const a_Content = "An About page is a special web page on a site where your readers/visitors learn more about you and what you do. This is not a contact us page. Writing this page isn’t the easiest thing to master, but it’s possible once you understand the essential elements that must be included.";
const c_Content = "An awesome Contact Us page finds just the right balance between making it easy to reach the company and sharing resources users can use to answer their questions right away.";


/****************Create DataBase(S)*******************/
mango.connect("mongodb+srv://admin-waleee:godofwar3@clusterwaleee.steez.mongodb.net/databaseX?retryWrites=true&w=majority/Post",{ useNewUrlParser: true }, { useUnifiedTopology: true });

//Create  Schema
const BlogSchema =
{
  title: String,
  content: String
}

//Create Object
const Post = mango.model("Post", BlogSchema); 

//All Get Method
app.get("/", (req,res) => 
{
  Post.find({}, (err, all_post) => 
  {
     res.render("home", { posts: all_post });  
  });
});

app.get("/about", (req,res) => 
{
  res.render("about", {para: a_Content});
})

app.get("/contact", (req,res) => 
{
  res.render("contact", {para: c_Content});
})

app.get("/compose", (req,res) => 
{
  res.render("compose");
})

app.get("/posts/:postName", function(req, res)
{
  const x = req.params.postName;

  Post.findOne({ _id: x}, function (err, post) 
  {
    res.render("post", { title: post.title, content: post.content});
  });
});

//Post Method
app.post("/compose", (req, res) => 
{
  const post = new Post
  ({
    title: req.body.blogTitle,
    content: req.body.blogText,
  });

  post.save((err) => 
  {
    res.redirect("/");
  });
});

