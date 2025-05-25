// 
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const chart = require("./model/chat.js");
const methodOverride = require("method-override");
const expError = require("./expressError.js");
const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));

app.use(methodOverride("_method"));
async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/fakeWhatsapp");
}
 main().then((res)=>{
     console.log("connection has been done successfully!!");
 }).catch((err)=>{
    console.log(err);
 });
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
 app.get("/chart",wrapAsync(async(req,res,next)=>{
   // extract all data from db 
   let chats = await chart.find({});
   if(!chats){
    next(new expError(403,"New Page Not Found!!")); // this error will throw when there is no chat is exist otherwise the main error will exist
   }
// now send all charts to the client site (frontent) so, have to render it 
    res.render("chartTemp.ejs",{chats});
 })
);

 // new Route  
 app.get("/chats/new",(req,res)=>{
   //throw new expError(402,"New Page Not Found!!");
     res.render("newChat.ejs");
 });

 // create Route i.e for post request
 app.post("/chat",wrapAsync(async(req,res,next)=>{
   //try{
    let {from,to,msg} = req.body;
    let newChat = new chart({
       from : from,
       to : to ,
       msg : msg,
       created_At : new Date(),
       });//  date : new Date(),// here the date variable is wrong so MongoDB ignore it and not save
      await newChat.save();
   // newChat.save().then((res)=>{
   //    console.log("new chat has been saved");
   // }).catch((err)=>{
   //    console.log(err);
   // });
   res.redirect("/chart");
   //   catch(err){
   //    next(err);
   //   }
})
);
 // Function wrapAsync or asyncWrap
 function wrapAsync(fn){
   return function(req,res,next){
      fn(req,res,next).catch((err)=>{// fn is an async.funtion so it return a promise
         next(err);
      });
   };
 }

   // NEW--Show Route - middleware
  app.get("/chats/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    let chat = await chart.findById(id);
    if(!chat){
   //throw new expError(403,"Chat is  Not Found!!");
    return next(new expError(403,"Chat is  Not Found!!"));
    }
    res.render("editChat.ejs",{chat});
  })
);

 // Edit Route==
 app.get("/chat/:id/edit",wrapAsync(async(req,res)=>{
   let {id} = req.params;
  // now search the data into database based on id
   let chat = await chart.findById(id);// await b.c findById() is an Async.func.
   res.render("editChat",{chat});
 })
);

 // Update Route --
  app.patch("/chat/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let { msg} = req.body;// here {key : newValue}
    let UpdatedChat = await chart.findByIdAndUpdate(id,{msg : msg},{runValidators : true , new : true});
    res.redirect("/chart");
  })
);

  // Destroy Route ---
  app.delete("/chat/:id",wrapAsync(async(req,res)=>{
   let {id} = req.params;
    await chart.findByIdAndDelete(id);
    res.redirect("/chart");
  })
);

// make a function called handlingValidationErr
 const handleValidationErr = (err)=>{
   // do some work that want to perform 
   console.log("This is a validation error.");
   console.log(err.message);
   err.status = 405;
   err.message = "Validation Failed" + err.message;
   return err;
 }
// Mongoose error handling-- use for each unique errors detected by mongoose itself
 app.use((err,req,res,next)=>{
   const errName = err.name;
   if(errName === "validationError" ){
      err = handleValidationErr(err);
    }//else{
  //   handleValidationErr(err);
  //  }
   next(err);
 });


// Handling Async. Error
  app.use((err,req,res,next)=>{
    let {status = 500,message ="Some error not permit to access it"} = err;
    res.status(status).send(message);
  });