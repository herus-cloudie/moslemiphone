import GithubProvider from "next-auth/providers/github"
import nextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import ConnectDB from "@/utils/connectDB";
import { User } from "@/utils/Model";
import { compare } from "bcryptjs";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "@/lib/mongodb";
// import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    session : {strategy : 'jwt'},
    secret: process.env.SECRET_KEY,
    providers : [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET ,
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET,
        // }),
        Credentials({
            async authorize(state , req){
                let {Email , Password} = state;
                try {
                    await ConnectDB()
                } catch (err) {
                    throw new Error('problem at connecting to (DB) line 19 | nextAuth')
                }
                let user = await User.findOne({Email})
                if(!user) throw new Error(`User doesn't exist`)
                if(!await compare(Password , user.Password)) throw new Error('Password in not correct')
                return {email : Email , name : user.Name}
            }
        })
    ],
//    adapter: MongoDBAdapter(clientPromise),
}
export default nextAuth(authOptions)
    

