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

// now create a schema i.e define a schema
const userSchema = new Schema({
     username : String,
     addresses : [
        {// child schema
            _id : false,// so, now this document value will appear without inbuild- _id
            location : String,
            city : String,
            zipcode : Number,
        }
     ]
});

// now create a collection or model of  userSchema
 const User = mongoose.model("User",userSchema);

const addUsers = async()=>{
    const user1 = new User({
        username:"Tony Jack",
        // other way to use Address model is by appending or including their file into it but that will be overwhelm work so, to keep it simple and userful keep it as below
        addresses: [// way-1 -- to store infor of address
            {
                location : "Washington Maxco",
                city : "Silbchantong",
                zipcode : 800014,
            }
        ],
    });
  // 2nd way to store infor. for address attributed
  user1.addresses.push({
     location : "Austinson",
     city : "Mirango",
     zipcode : 800087,
});
  // now save it 
  await user1.save() .then((res)=>{
     console.log(res);
  }).catch(err=>console.log(err));
}

// now call addUsers() fun. to create the collection and store the document in it 
addUsers();
/**

 */