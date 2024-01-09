import Link from "next/link";

import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {ChangeList} from "@/redux/features/purchase/purchaseSlice";

import CustomLoading from "../module/customLoading";
import { PurchaseItemCard , StaticPurchaseItemCard } from "../module/purchaseItemCard";

export default function PurchasePage(){
    let [loading , setLoading] = useState(false)
    
    let reduxState = useSelector(item => item.purchase.item)
    let dispatch = useDispatch()

    useEffect(() => {
        async function getPurchaseItem() {
            let procces = await fetch('/api/purchaseApi')
            let Data = await procces.json()
            setLoading(true)
            dispatch(ChangeList(Data.data))
        } 
        setLoading(false)
        getPurchaseItem()
    } , [])

    const deleteHandler = async (id) => {
        let procces = await fetch('/api/purchaseApi' , {
            method : 'DELETE',
            body : JSON.stringify({
                id,
                reduxState
            }),
            headers : {'Content-Type': 'application/json'}
        })
        let Data = await procces.json()
        dispatch(ChangeList(Data.data))
    }

    let getPrice = reduxState?.map(item => +item.price)
    const finalyPrice = getPrice.reduce((accumulator, currentValue) => accumulator + currentValue , 0)
    
    return (
        <div className="container container-padding"  dir="rtl" >
            {
                 !loading ?
                 <CustomLoading />
                 : reduxState.length < 1 
                 ?
                 <div className="d-flex flex-column align-items-center pb-5" style={{height : '50rem'}}>
                    <h3 style={{color : 'darkgray'}} className="py-5">سبد خرید شما خالی است!</h3>
                    <img className="rounded" width={300} height={300} src="/pict/emptyBasket.jpg" />
                    <Link href={'/mobile'}><btn className="btn btn-primary mt-4 p-2">خرید گوشی و گارانتی</btn></Link>
                </div>
                :
                <div className="d-flex flex-column flex-lg-row-reverse no-min-width justify-content-around container">
                    <div className="col-lg-4 ">
                            <h4 className="d-flex justify-content-between align-content-center mb-3">
                                <span className="text-light my-1 my-lg-5">سبد خرید</span>
                                <span style={{maxHeight : '25px'}} className="badge bg-info rounded-pill my-1 my-lg-5">{reduxState.length}</span>
                            </h4>
                            <div className="p-4">
                                <ul className="list-group p-0 mb-2">
                                    <div>
                                    {  
                                        reduxState.map(item =>
                                         <PurchaseItemCard deleteHandler={deleteHandler} id={item.id}
                                          Brand={item.brand} Price={item.price} Name={item.name} Img={item.img}/>
                                         )
                                    }
                                    </div>
                                    <StaticPurchaseItemCard Price={'0'} Label={'تخفیف'} bg-color={''} textColor={'text-danger'}/>
                                    <StaticPurchaseItemCard Price={finalyPrice.toLocaleString()} Label={'جمع (تومان)'} bgColor={'rgb(230 255 230)'}  textColor={'text-success'}/>
                                </ul>
                                <form className="p-2 text-center">
                                        <div className="input-group  form-control">
                                            <input type="text" className="form-control" placeholder="کد تخفیف"/>
                                            <div className="input-group-apend">
                                                <button className="btn btn-secondary">اعمال کد</button>
                                            </div>
                                        </div>
                                </form>
                            </div>
                        </div>
                        <div>

                        <hr className="d-block d-lg-none"/>

                        <h4 className="text-light my-5">آدرس شما</h4>
                        <form/>
                            <div className="row mb-3">
                                <div className="col-6 mb-3 mb-md-0">
                                    <label className="form-label" for="firstName">نام</label>
                                    <input type="text" id="name" className="form-control"/>
                                </div>
                                <div className="col-6">
                                    <label className="form-label" for="lastName">نام خانوادگی</label>
                                    <input type="text" id="lastName" className="form-control"/>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" for="lastName">ایمیل <span className="text-muted">(اختیاری)</span></label>
                                <input type="text" id="lastName" className="form-control" placeholder="you@example.com"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" for="lastName">آدرس</label>
                                <input type="text" className="form-control" placeholder="تهران , میدان ازادی..."/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" for="lastName">آدرس دوم <span className="text-muted">(اختیاری)</span></label>
                                <input type="text" className="form-control"/>
                            </div>
                            
                            <div className="row mb-5">
                                <div className="col-6">
                                    <label className="form-label">استان</label>
                                    <select id="" className="form-select">
                                        <option value="استان">انتخاب کنید</option>
                                        <option value="تهران">تهران</option>
                                        <option value="مازندران">مازندران</option>
                                        <option value="اردبیل">اردبیل</option>
                                        <option value="گیلان">گیلان</option>
                                        <option value="خراسان">خراسان رضوی</option>
                                        <option value="اصفهان">اصفهان</option>
                                        <option value="فارس">فارس</option>
                                        <option value="سیستان">سیستان و بلوچستان</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="form-label">نام شهر</label>
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>

                            <hr/>

                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input"/>
                                <label className="form-check-label">قبل از ارسال بسته تماس گرفته شود.</label>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input"/>
                                <label className="form-check-label">ذخیره سازی اطلاعات برای خرید بعدی</label>
                            </div>

                            <hr className="mb-4"/>

                            <h4 className="mb-3">نوع پرداخت</h4>
                            <div className="mb-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="radioobutton" id="radio1"/>
                                    <label className="form-check-label" for="radio1">بانک ملت</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="radioobutton" id="radio2" className="form-check-input"/>
                                    <label for="radio2" className="form-check-label">زرین پال</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="radioobutton" id="radio3" className="form-check-input"/>
                                    <label for="radio3" className="form-check-label">بانک صادرات</label>
                                    <div className="invalid-feedback" >
                                        لطفا کشور را وارد کنید
                                    </div>
                                </div>
                                
                            </div>

                            <hr className="mb-3"/>

                            <div className="d-grid py-5 gap-2">
                                <button style={{backgroundColor : 'darkblue'}} className="btn btn-lg btn-primary">ثبت و ادامه خرید</button>
                            </div>
                        <form/>
                        </div>
                </div>
                
            }
        </div>
    )
}