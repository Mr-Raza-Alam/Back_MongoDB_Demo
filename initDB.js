// for testing purpose
const mongoose = require("mongoose");
// established database connection 

async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
 main().then((res)=>{
     console.log("connection has been done successfully!!");
 }).catch((err)=>{
    console.log(err);
 });

 const chart = require("./model/chat.js");// requrie model

 let allCharts = ([
   {
    from : "Mohit",
    msg : "Bro, I want 100 in next match",
    to : "Rohit",
    created_At : new Date(),
   },
   {
    from : "Bhumika Jain",
    msg : "Arre Bahen 100 ka recharge karde please,urgent lecture dekna hai exam sar par hai",
    to : "Sueeli Markam",
    created_At : new Date(),

   },
   {
    from : "Mohit",
    msg : "Hello give me the notes , i am coming at your home",
    to : "Jaggu",
    created_At : new Date(),
   },
   {
    from : "Bhanusali",
    msg : "Don't forget to subscribe my page",
    to : "Akram",
    created_At : new Date(),
   },
   {
    from : "Akram",
    msg : "Ok fine will not subscribe you but i will tell to all my friend to subscribe you ok",
    to : "Bhanusali",
    created_At : new Date(),
   },
 ]);
// 
 chart.insertMany(allCharts);