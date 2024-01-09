import SignUpPage from "@/component/template/singUpPage";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function SignUp(){
    return <SignUpPage />
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