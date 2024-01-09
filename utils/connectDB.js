import mongoose from "mongoose";

export default async function ConnectDB (){
    let URI = process.env.DB_URI;
    if(mongoose.connections[0].readyState) return;
    await mongoose.connect(URI)
    console.log('db connected')
};

