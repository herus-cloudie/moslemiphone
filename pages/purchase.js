import PurchasePage from "@/component/template/purchasePage";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function SignIn(){
    return <PurchasePage />  
}

export async function getServerSideProps({req , res}) {
  
    const session = await getServerSession(req , res, authOptions)
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return {props: {}}
}
