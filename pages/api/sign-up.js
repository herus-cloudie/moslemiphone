import ConnectDB from "@/utils/connectDB";
import {User} from "@/utils/Model";
import Hash from "@/utils/hash";

export default async function handler(req , res){

    /********* handle request and database connection *********/
    if(req.method !== 'POST') return;
    try {
       await ConnectDB() 
    } catch (err) {
        console.log('error' + err)
        res.status(500).json({status : 'falid' , message : 'err in connect to DataBase'})
        return;
    }

    let {Email , Name , Password , Password2nd} = req.body;
    /********* check if the passwords isn't match/ *********/
    if (Password !== Password2nd) {
        res.status(422).json({status : 'falid' , message : 'پسورد ها با همدیگر همخوانی ندارند'})
        return;
    }
    
    /********* check if the account exists before/ *********/
    let existAccount = await User.findOne({Email : Email})
    if (existAccount) {
        res.status(422).json({status : 'falid' , message : 'از قبل ثبت نام کرده اید!'})
        return;
    }
    
    /********* finall procces and send json to front *********/
    let passwordHashed = await Hash(Password)
    let createUser = await User.create({Email , Name , Password : passwordHashed})
    res.status(200).json({status : 'success' , message : createUser})
    
}