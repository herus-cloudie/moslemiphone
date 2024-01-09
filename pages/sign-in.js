import SignInPage from "@/component/template/signInPage";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function SignIn(){
    return <SignInPage />  
}

export async function getServerSideProps({req , res}) {
    const session = await getServerSession(req , res, authOptions)
    if (!(!session)) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return {props: {}}
}
