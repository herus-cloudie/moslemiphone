import { User } from "@/utils/Model";
import ConnectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function hanlder(req , res){
    try {
        await ConnectDB()
    } catch (err) {
        console.log(err + 'errbackend')
    }

 /*---------------------- needed data --------------------------------- */
    const session = await getServerSession(req , res , authOptions);
    let selectedUser = await User.findOne({Email : session?.user.email})
// /*---------------------- needed data --------------------------------- */

    if(req.method === 'PATCH'){
        let data = req.body;
        selectedUser.PurchaseList = data;
        await selectedUser.save();
        res.status(201).json({status : 'success', data : selectedUser.PurchaseList})
    }

    if(req.method === 'GET'){
         res.status(200).json({ status : 'success' , data : selectedUser.PurchaseList})
    }
// selectedUser.PurchaseList
    if(req.method === 'DELETE'){
        let {id , reduxState} = req.body;
        let findItemForDelete = reduxState.filter(item => item.id != id)
        selectedUser.PurchaseList = findItemForDelete;
        await selectedUser.save();
        res.status(200).json({status : 'success' , data : findItemForDelete})
    }

}