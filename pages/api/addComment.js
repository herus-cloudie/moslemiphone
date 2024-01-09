import { Comment } from "@/utils/Model"
import ConnectDB from "@/utils/connectDB"

export default async function hanlder(req , res){
    if(req.method !== 'POST' && req.method !== 'GET') return res.status(500).json({message : 'wrong method req'})
    try {
        await ConnectDB()
    } catch (err) {
        console.log(err)
        return res.status(500).json({status : 'faild' , message : 'problem to connect to DB'})
    }
    
    if(req.method === 'POST'){
        let {text , score , inGenerall , positivePoint , negetivePoint} = req.body.addComment;
        let {writerName , name} = req.body;
        let createComment = await Comment.create({writerName , name , text , score , inGenerall , positivePoint , negetivePoint})
        res.status(200).json({status : 'success' , data :createComment})
    }
    
    if(req.method === 'GET'){
        let findUser = await Comment.find({})
        res.status(200).json({status : 'success' , data : findUser})
    }
}