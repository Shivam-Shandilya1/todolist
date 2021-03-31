var express =require ("express");
var bodyParser = require("body-parser");
var app = express();
app.get("/",function(req,res)
{
    var today =new Date();
    if(today.getDay()==3 || today.getDay()==0 )
    {
        res.send("yay! It's a Holiday.")
    }else{
        res.send("Uh Oh! It's a working day.")
    }
});
app.listen(3000,function()
{
    console.log("Server is running at port 3000");
})