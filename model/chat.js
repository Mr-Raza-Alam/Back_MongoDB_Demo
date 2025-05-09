/// for chat model as a basic model for index
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
// create a schema for chat model
const charSchema = new mongoose.Schema({
  from : {
    type : String,
    require : true,
  },
  to : {
    type : String,
  
    require : true,
  },
  msg : {
    type : String,
  },
  created_At : {
    type : Date,
    require : true,
  }
});
// now create a model for a collection
const chart = mongoose.model("chart",charSchema);
// this above fundamental template export it 
// syntax of export is module.exports = modelName
 module.exports = chart;