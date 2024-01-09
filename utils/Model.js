import { Schema , model , models } from "mongoose";

let UserSchema = new Schema({
    Email : {
        type : String,
        require : true
    },
    Password : {
        type : String,
        require : true
    },
    Name : {
        type : String,
        require : true
    },
    PurchaseList : {
        type : Array,
        default : []
    },
    createdAt : {
        type : Date,
        default : () => Date()
    }
})

let User = models.User || model("User" , UserSchema)


let CommentSchima = new Schema({
    writerName : {
        type : String
    },
    name : {
        type : String
    },
    positivePoint: {
        type : Array
    } , 
    negetivePoint: {
        type : Array
    },
    text : {
        type : String
    },
    score : {
        type : String
    },
    inGenerall : {
        type : String
    }
})

let Comment = models.Comment || model("Comment" , CommentSchima)

export {User , Comment};