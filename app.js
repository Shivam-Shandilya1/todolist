var express =require ("express");
var bodyParser = require("body-parser");
const e = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
var bodyParser= app.use(bodyParser.urlencoded({extended:true}));
var tasks = [];
var workItems = [];
var today = new Date();

app.get("/",function(req,res)
{
    
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    var day =today.toLocaleDateString("en-IN",options);
    
    
    res.render("list.ejs",{
        
        listTitle:day,newListItems:tasks,
    });
  

}); 
app.get("/work",function(req,res)
{
     res.render("list.ejs",{
        
        listTitle:"Work List",newListItems:workItems,
    });
  
});

app.post("/",function(req,res)
{
    console.log(req.body);
    task= req.body.work;
    if(req.body.addbtn === "Work")
    {
        workItems.push(task);
        res.redirect("/work");
    }
    else
    {
        tasks.push(task);
    
        res.redirect("/");
    }
   

    
});
app.post("/work",function(req,res)
{
  task = req.body.work;
  workItems.push(task);
  res.redirect("/work");
})
   
app.listen(3000,function()
{
    console.log("Server is running at port 3000.");
});