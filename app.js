var express =require ("express");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");

app.get("/",function(req,res)
{
    var today =new Date();
  
    var day =today.getDay();
    var dayname="";
    if(day == 0)
    {
        dayname="Sunday";
        
    }
    if(day == 1)
    {
        dayname="Monday";
       
    }
    if(day == 2)
    {
        dayname="Tuesday";
       
    }
    if(day == 3)
    {
        dayname="Wednesday";
       
    }
    if(day == 4)
    {
        dayname="Thursday";
       
    }
    if(day == 5)
    {
       dayName="Friday";
    };
    if(day == 6)
    {
        dayname="Saturday";
        
    };
    res.render("list",
        {
            day:dayname
            
        });
  

}); 
   
app.listen(3000,function()
{
    console.log("Server is running at port 3000.");
});