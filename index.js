// 
const express = require("express");
const path = require("path");
const chart = require("./model/chat.js");
const methodOverride = require("method-override");
const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));

app.use(methodOverride("_method"));
app.listen(5400,()=>{
    console.log("Server has been started at port : 5400");
});
// now insert data to DataBase.

// now save our chart1 and save() -- return a promise
//  chart1.save()
//  .then((res)=>{
//     console.log(res);
//  }).catch((err)=>{
//    console.log(err);
//  });

 // Route--- /chats
app.get("/home",(req,res)=>{
   res.send("I am on root directory");
});
 app.get("/chart",async(req,res)=>{
   // extract all data from db 
   let chats = await chart.find({});
// now send all charts to the client site (frontent) so, have to render it 
    res.render("chartTemp.ejs",{chats});
 })

 // new Route  
 app.get("/chats/new",(req,res)=>{
     res.render("newChat.ejs");
 });

 // create Route i.e for post request
 app.post("/chat",(req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new chart({
       from : from,
       to : to ,
       msg : msg,
       created_At : new Date(),
      //  date : new Date(),// here the date variable is wrong so MongoDB ignore it and not save
    });
   newChat.save().then((res)=>{
      console.log("new chat has been saved");
   }).catch((err)=>{
      console.log(err);
   });
   res.redirect("/chart");
 });

 // Edit Route==
 app.get("/chat/:id/edit",async(req,res)=>{
   let {id} = req.params;
  // now search the data into database based on id
   let chat = await chart.findById(id);// await b.c findById() is an Async.func.
   res.render("editChat",{chat});
 });

 // Update Route --
  app.patch("/chat/:id",async(req,res)=>{
    let {id} = req.params;
    let { msg} = req.body;// here {key : newValue}
    let UpdatedChat = await chart.findByIdAndUpdate(id,{msg : msg},{runValidators : true , new : true});
    res.redirect("/chart");
  });

  // Destroy Route ---
  app.delete("/chat/:id",async(req,res)=>{
   let {id} = req.params;
    await chart.findByIdAndDelete(id);
    res.redirect("/chart");
  });