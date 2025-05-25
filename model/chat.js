/// for chat model as a basic model for index
const mongoose = require("mongoose");
// established database connection 

// async function main(){
//   await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
// }
//  main().then((res)=>{
//      console.log("connection has been done successfully!!");
//  }).catch((err)=>{
//     console.log(err);
//  });

// async function main(){ // no need to connect dbms from here
//   await mongoose.connect("mongodb://127.0.0.1:27017/fakeWhatsapp");
// }
//  main().then((res)=>{
//      console.log("connection has been done successfully!!");
//  }).catch((err)=>{
//     console.log(err);
//  });

// create a schema for chat model
const chatSchema = new mongoose.Schema({
  from : {
    type : String,
    required : true,
  },
  to : {
    type : String,  
    required : true,
  },
  msg : {
    type : String,
    maxLength : 50,
  },
  created_At : {
    type : Date,
    required : true,
  }
});
// now create a model for a collection
const chart = mongoose.model("chart",chatSchema);
// this above fundamental template export it 
// syntax of export is module.exports = modelName
 module.exports = chart;