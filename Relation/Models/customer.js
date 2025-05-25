// one---many(approach-2)
const mongoose = require("mongoose");
const {Schema} = mongoose;
async function main(){
 await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}
// here main() will return a promise 
main().then(()=>{
    console.log("Connection has been established to Backend");
}).catch(err=>{
    console.log(`There is an error : ${err}`);
});

const orderSchema = new Schema({
     item : String,
     price : Number,
     kind : String,
});
 
const customerSchema = new Schema({
     name : String,
     orders : [// here we need to store reference of each order that is avialable in OrderSchema
        {
         type: Schema.Types.ObjectId,
         ref: "Order",// need to specify ref. that has to know the collection from where id_object is stored
    
        }
     ]
})

const Order = mongoose.model("Order",orderSchema);
const Customer = mongoose.model("Customer",customerSchema);

const addCustomers = async()=>{
// but if we want to display the same result as we get from mongodb shell
  let res = await Customer.find({}).populate("orders"); 
  // res will return an array of objects that contains the entire details of objects of field orders
  console.log(res[0]);   
}
addCustomers();
/**
    const user1 = new Customer({
     name : "Rahul Kumar",
     // for id i will send the entire document of each orders rather than individual id **
   });
// for **,
 const order1 = await Order.findOne({item:"Samosa"});
 const order2 = await Order.findOne({item:"Chips"});
 const order3 = await Order.findOne({item:"Lassi"});

 user1.orders.push(order1,order2,order3);
  await user1.save().then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  });
 */
// call addCustomers
//addCustomers();

// const addOrders = async()=>{
//   await Order.insertMany([
//     {
//       item : "Samosa",
//       price : 10,
//       kind : "Namkin",
//     },
//   {
//     item : "Chips",
//     price:20,
//     kind : "Patato",
//   },
//   {
//     item : "Lassi",
//     price:30,
//     kind : "Mango",
//   },
//   {
//     item:"Cold-drink",
//     price:18 ,
//     kind : "Sprite,Coca-Cola",
//   }
//  ]) .then((res)=>{
//     console.log(res);
// }).catch(err=>console.log(err)); 
// }

// call addOrderfun.
//addOrders();
/**

 */