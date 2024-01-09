import { hash } from "bcryptjs";
// import { verify } from "jsonwebtoken";
// import {compare} from 'bcryptjs'

export default async function Hash(Password){
    let passwordHashed = await hash(Password , 8)
    return passwordHashed;
}
// async function ComparePassword(Password , hashedPassword){
//     let passwordValidation = await compare(Password , hashedPassword)
//     return passwordValidation;
// }
// let secretKey = process.env.SECRET_KEY;
// function VerifyToken(token){
//     try {
//         let result = verify(token , secretKey)
//         return result;
//     } catch (err) {
//         return false;
//     }
// }
// export {Hash , ComparePassword , VerifyToken}

