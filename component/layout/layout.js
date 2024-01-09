import Footer from "@/component/module/footer";
import { useRouter } from "next/router";
import { useEffect} from "react";
import FixedTop from "../module/fixedTop";
import { useDispatch} from "react-redux";
import { ChangeList} from "@/redux/features/purchase/purchaseSlice";
export default function Layout({_app}){
    let router = useRouter()
    let dispatch = useDispatch()

    useEffect(() => {
        async function getPurchaseItem() {
            let procces = await fetch('/api/purchaseApi')
            let Data = await procces.json()
            dispatch(ChangeList(Data.data))
        } 
        getPurchaseItem()
    } , [])
    
    let bg = router.pathname == '/mobile' ? 'mobile-grad mobile-grad-small'
    : router.pathname == '/mobile/[detailes]' ? 'detaile-grad'
    : router.pathname == '/sign-in' ? 'bg-sign-in'
    : router.pathname == '/sign-up' ? 'mobile-grad bg-sign-up-small'
    : router.pathname == '/purchase' ? 'bg-purchase'
    : null
    return(
        <>
            <FixedTop/>
                <div className={bg}>{_app}</div>
            <Footer />
        </>
    )
}   







