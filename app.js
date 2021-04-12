var express =require ("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
var bodyParser= app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology: true });
var tasks = [];
var workItems = [];
var today = new Date();

const itemsSchema = new mongoose.Schema({
    name:String
})
;

const Item = mongoose.model("Item",itemsSchema);


    const item1= new Item({name:"Helo"});
    const item2= new Item({name:"Hoe"});
    const item3= new Item({name:"Yo"});
    const defaultItems=[item1, item2, item3];
    Item.insertMany(defaultItems,function(err)
    {
        if (err)
        {
            console.log(err);
        }else{console.log("Successfully saved default items to DB.")}
    });


app.get("/",function(req,res)
{
    
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    var day =today.toLocaleDateString("en-IN",options);
    
    const getDocument = async()=>
    {try{
        const results = await Item.find({});
        console.log(results);
       }catch(err)
       {
           console.log(err);
       }
        
    }   
   getDocument();
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