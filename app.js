var express =require ("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
var bodyParser= app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology: true });
var tasks = [];
var workItems = [];
var today = new Date();
var Documents = [];

var itemsSchema = new mongoose.Schema({
    name:String
});

var listSchema ={
    name: String,
    items:[itemsSchema]
};
var Item = mongoose.model("Item",itemsSchema);


   var item1= new Item({name:"Helo"});
   var item2= new Item({name:"Hoe"});
   var item3= new Item({name:"Yo"});
   var defaultItems=[item1, item2, item3];

    
 var List = mongoose.model("list",listSchema)
app.get("/",function(req,res)
{
    
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    var day =today.toLocaleDateString("en-IN",options);
    
   var getDocument = async()=>
    {try{
       var results = await Item.find({});
        console.log(results);
       }catch(err)
       {
           console.log(err);
       }
        
    }   
   getDocument();
    res.render("list.ejs",{
        
        listTitle:day,newListItems:defaultItems,
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
    task=req.body.work;
    task= new Item({name:req.body.work});
    defaultItems.push(task);
    if(req.body.addbtn === "Work")
    {
        workItems.push(task);
        res.redirect("/work");
    }
    else
    {
        if(defaultItems.length <= 3)
        {
            for(var i=0;i<defaultItems.length;i++)
            { 
              var createDocument=async()=>
               {
                   try
                   {
                       Item.insertMany(defaultItems[i])
                   }catch(err)
                   {
                       console.log(err);
                   }
               }
                createDocument();
            }   
        }else
        {
            for(var i=3;i<defaultItems.length;i++)
            { 
              var createDocument=async()=>
               {
                   try
                   {
                       Item.insertMany(defaultItems[i])
                   }catch(err)
                   {
                       console.log(err);
                   }
               }
                createDocument();
            }  
        }
        
        res.redirect("/");
    }
   

    
});
app.get("/:customListName",function(req,res)
{
   var customListName =req.params.customListName;
   console.log(customListName);
   var list = new List (
    {
        name:customListName,
        items:defaultItems
    });
   
  
   res.render("list",{newListItems:defaultItems,listTitle:customListName});
  
});

app.post("/work",function(req,res)
{
  task = req.body.work;
  workItems.push(task);
  res.redirect("/work");
})
app.post("/delete",function(req,res)
{
const itemID=req.body.check;
Item.findByIdAndDelete(itemID,function(err)
{
    if(err)
    {
        console.log(err);
    }
})
res.redirect("/");
const taskName = Item.find(itemID).select({name:1,_id:0});
defaultItems.pop(taskName);
});
   
app.listen(3000,function()
{
    console.log("Server is running at port 3000.");
});