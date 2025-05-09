// mongoose is nodejs. 
const mongoose = require('mongoose');

// url = "https://localhost:5500/users"
// similarly here localhost -- 127.0.0.1:port/database
async function  main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/college')    
}
  main()
  .then((res) =>{
     console.log('Connection successfully!')
    })
  .catch((err) =>{
    console.log(err);
  });

 const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    date : {type : Date , default : Date.now},
    comment : {body : String, date : Date} ,
   }
 )
//  const Instance = mongoose.model(collectionName,Schema)
  const User = mongoose.model("user",userSchema);
// Model.find({}); {} means select all data without any condition
//  User.find({age : {$gt : 46}}).then((res)=>{// now apply some condition inside{}
//   console.log(res);// here res - [all value]
//  }).catch((err)=>{
//    console.log(err);  
// Model.findOne({}) return single use 

// Model.findById(_id)-- return data based on id.

  //const Employee = mongoose.model("employee",userSchema);

// insert data into it i.e insertingOne 
// before inserting document , we have to create document and i.e done by creating an object of class(model) User
//const user1 = new User({name : "",email : "",age : ,});
// to reflect or save in MongoDB 
// user1.save();//and save() is Asynchronous function it return a promise so we can use then and catch

// Inserting Multiple data
// Model.insertMany([data1,data2,data3,.....])and data - object type
// User.insertMany([// it return a Promise
//   {name : "Tony",email : "stark324@Yahoo.com",age:54},
//   {name : "Thor",email : "hulk654@Yahoo.com",age:52},
//   {name : "Captain",email : "america895@gamil.com",age:43},
//   {name : "Hyder",email : "spi364@gmail.com",age:25},
// ]).then((res)=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log(err);
// });

// while we inserting documents , there is something Mongoose users Operation Buffering --- mongoose lets you start using your models immediately,without waiting for mongoose to establish a connection to MongoDB

// find operation in Mongoose

// Model.find() return a Query Object(thenable means that it allows to use then() method rather Mongoose Queries aren't promise)

// Update operation in Mongoose
// Model.updateOne(<filter>,<update value without set key>,<option>)
// Model.updateMany(<filter>,<update value without set key>,<option>)
// User.updateMany({age : {$in : [48,52,25,65,42]}},{age : 18})
// .then((res)=>{
//   console.log(res);// it return a meta data i.e extra information
// }).catch((err)=>{
//   console.log(err);
// })
// but i want to update value as updation occured then we use 
// Model.findOneAndUpdate() or .findByIdAndUpdate
  // User.findOneAndUpdate({age : {$in : [45,65,25,56]}},{name : "Moongy"},{new : true})
  // .then((res)=>{
  //   console.log(res);// since here This method find the existing document first and then update them so, it print the Aupdated doc. But,if we want to print with update one then we use option {new  : true;} by default it set to false 
  // }).catch((err)=>{
  //   console.log(err);
  // })

  // Delete operation in Moongoose
  // Having 2 methods -- I) deleteOne({filter},{option}) II) deleteMany({filter},{option}) -- both return Queries object
  // Model.delete
  // User.deleteOne({age : 25}).then((res)=>{
  //   console.log(res);
  // }).catch((err)=>{
  //   console.log(err);
  // });

  // To check which document has been actually deleted -- done by findByIdAndDelete({filter}) or findOneAndDelete({filter})
  User.findOneAndDelete({name : "Tony"}).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  });