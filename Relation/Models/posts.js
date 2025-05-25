// one---squillions(approach-3) practical e.g is social media platform
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

const userSchema = new Schema({// parent Schema
     name : String,
     email : String,
});

const postSchema = new Schema({// child Schema
    comment : String,
    likes : Number,
    Followers : Number,
    use : {// since every posts will have single user 
        type : Schema.Types.ObjectId,
        ref : "User",// here User is model or called collection
    }
});

// now create collection or model of parent and child schema
const Post = mongoose.model("Post",postSchema);
const User = mongoose.model("User",userSchema);

// create a function to store information 

const addData = async()=>{
 let user1 = await User.findOne({ name : "Ragnudev Shina"});
  
    let post2 = new Post({
        comment : "Today,23rd of May i have 4 hours lectues on Python of 4th semester",
        likes : 3400,
        Followers : 7890,        
    });
    post2.use = user1;// this is for to store the user_id to postSchema's field use
   await post2.save();
//  await user1.save();
//  await post1.save();

}
//addData();
const getData = async()=>{
   await Post.findOne({}).populate("use").then((res)=>{
       console.log(res);
   }).catch((err)=>{
    console.log(err);
   });
}

getData();