import Link from "next/link"
import { useEffect , useState} from "react";

import { ChangeList } from "@/redux/features/purchase/purchaseSlice";
import {useDispatch , useSelector} from "react-redux";

import Back from "../module/Back"
import LegibleName from "../module/legible/legibleName";
import  {LegiblePrice , LegibleDiscount} from "../module/legible/legiblePrice";
import CommentMobile from "../module/commentMobile";
import { useSession } from "next-auth/react";
import CustomLoading from "../module/customLoading";

export default function DetailePage(Phone){
    let {price , name , brand , model , iframeSrc , detailes , discount , img , id} = Phone;

    let [loading , setLoading] = useState();
    let [auth , setAuth] = useState(false); 
    let [showButton , setShowButton] = useState(false);
    let [addComment , setAddComment] = useState({
        text : '',
        score : '',
        inGenerall : '',
        positivePoint : [],
        negetivePoint : [],
        Err : ''
    })
    let [writerStatus , setWriterStatus] = useState(false);
    let [getComment , setGetComment] = useState([])

    let reduxState = useSelector(item => item.purchase.item);
    let dispatch = useDispatch();

    let session = useSession()
    let writerName = session.data?.user?.name;

    useEffect(() => {
    if(session.status == 'authenticated') setAuth(true)
        else setAuth(false)
    }, [session])
    
    
    /* -----------------------------------get data (purchase basket and comment) from api -------------------------------------------------- */
    useEffect(() => {
        async function getPurchaseItem() {
            let procces = await fetch('/api/purchaseApi')
            let Data = await procces.json()
            dispatch(ChangeList(Data.data))
            Data.data.find(item => item.id == id) ? setShowButton(true) : setShowButton(false) 
        }
        getPurchaseItem()
    } , []);
    useEffect(() => {
        async function getComment() {
            let procces = await fetch('/api/addComment')
            let Data = await procces.json();
            let filterComment = Data?.data?.filter(item => item.name == name)
            setGetComment(filterComment)
        }
        getComment()
    } , [writerStatus]);
    /* -----------------------------------get data (purchase basket and comment) from api  -------------------------------------------------- */


    /* ------------------------------------ update purchase's item and comment ------------------------------------------------- */
    const clickAddHandler = async () => {
        let forceUpdate = [...reduxState , Phone]
        let procces = await fetch('/api/purchaseApi' , {
            method : 'PATCH',
            body : JSON.stringify(forceUpdate),
            headers : {'Content-Type': 'application/json'}
        })
        let Data = await procces.json()
        Data.status == 'success' ? dispatch(ChangeList(Data.data)): null
        setShowButton(true)
    };
    const clickDeleteHandler = async () => {
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
        Data.status == 'success' ? setShowButton(false) : null
    }   
    const sendCommentHandler = async () => {
        if(addComment.text == '' || addComment.inGenerall == '' || addComment.score == ''){
           return setAddComment({...addComment , Err : 'لظفا تمامی فیلد هارا پر کنید'})
        }
        setLoading(true)
        let procces = await fetch('/api/addComment' , {
            method : 'POST',
            body : JSON.stringify({name , addComment , writerName}),
            headers : {'Content-Type': 'application/json'}
        })
        let data = await procces.json();
        setWriterStatus(false)
        setLoading(false)
    }

    const changeScoreHandler = (e) => setAddComment({...addComment , score : e.target.name})
    const changeGenerallHandler = (e) => setAddComment({...addComment , inGenerall : e.target.name})
    const updataText = (e) => setAddComment({...addComment , [e.target.name] : e.target.value})
    const updataPositiveInput = (e , id) => {
        let findInput = addComment.positivePoint.find(item => item.id == id)
        findInput.text = e.target.value;
        setAddComment({...addComment , findInput})
    }
    const updataNegitiveInput = (e , id) => {
        let findInput = addComment.negetivePoint.find(item => item.id == id)
        findInput.text = e.target.value;
        setAddComment({...addComment , findInput})
    }      

    const addPositiveInputHandler = () => setAddComment({...addComment , positivePoint : [...addComment.positivePoint , {text : '' , id : Date.now()}]}) 
    const addNegitiveInputHandler  = () =>  setAddComment({...addComment ,negetivePoint : [...addComment.negetivePoint , {text : '' , id : Date.now()}]})
    const deletePositiveInputHandler = () => {
        addComment.positivePoint.pop()
        let elseInput = addComment.positivePoint
        setAddComment({...addComment , positivePoint : elseInput})
    }
    const deleteNegitiveInputHandler = () => {
        addComment.negetivePoint.pop()
        let elseInput = addComment.negetivePoint
        setAddComment({...addComment , negetivePoint : elseInput})
    }
    /* ------------------------------------ update purchase item and comment ------------------------------------------------- */

    return(
    <div style={{paddingTop : '10rem', paddingBottom : '5rem'}} className="container text-white">
        <div className="d-flex justify-content-between mb-5">
            <h1>جزییات محصول</h1>
            <div className="d-flex align-items-start">
               <p className="ps-2 text-white">بازگشت</p> <Link href={'/mobile'}><Back/></Link>
            </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-around flex-lg-row-reverse detaile mt-5">
            <div className="d-flex flex-column mb-5 ">
                {
                    discount != 'no' ?
                    <span className="badge mb-4 fs-4 bg-danger">
                        {discount}%off
                    </span> 
                    : null
                }  
                <div className="d-flex">
                    <div className="img-box">
                        <img priority={true} width={350} height={350} alt="." className="p-4 bg-white rounded res-img" src={img}/>
                    </div> 
                </div>
            </div>

           <div>
            <div className="border-grad border-grad-res">
                <h3 className="d-flex justify-content-between"><p className="ps-4 tm-color">اسم:</p><LegibleName brand={brand} name={name}/></h3>
                <h3 className="d-flex justify-content-between"><p className="ps-4 tm-color">قیمت:</p>
                    <div style={discount !== 'no' ? {color: 'mediumspringgreen'} : null}
                        className="ps-2">{discount !== 'no'? <LegibleDiscount Price={price} discount={discount}/> : <LegiblePrice Price={price}/>}</div>تومان 
                    </h3>
                <h3 className="d-flex justify-content-between"><p className="ps-4 tm-color">سال ساخت:</p> {model}</h3>
                <hr/>
                <h3>
                        <p className="ps-4 tm-color ">مشخصات فنی:</p>
                        <div className="d-flex justify-content-between align-items-center"><p className="detailFont">رم :</p>  {detailes.ram} GB</div>
                        <div className="d-flex justify-content-between align-items-center"><p className="detailFont">حافظه :</p>  {detailes.memory} GB</div>
                        <div className="d-flex justify-content-between align-items-center"><p className="detailFont">اندازه :</p>  {detailes.screan} Inch</div>
                </h3>
            </div>
           </div>
        </div>
        <div className="d-grid py-5 p-0 px-lg-5 padding-lg-btn">
            {
                auth
                ? !showButton ? <a onClick={clickAddHandler} className="btn btn-success">افزودن به سبد خرید</a> 
                : <a onClick={clickDeleteHandler} className="btn btn-danger">حذف از سبد خرید</a>
                :  <Link href="/sign-up" className="btn btn-primary">ثبت نام کنید</Link>
            }
        </div>

        <hr style={{paddingTop : "4rem"}}></hr>

        <div className="mb-5">
            <h2>ویدیو بررسی</h2>
            <div style={{maxHeight : '500px'}} className="d-flex justify-content-center mt-5">
                <iframe className="h_iframe-aparat_embed_frame p-5 bg-grad rounded w-iframe-lg w-iframe-sm w-iframe w-iframe-md"
                allowFullScreen={true} webkitallowfullscreen='true' mozallowfullscreen='true'
                src={iframeSrc} />
                <span style={{display: 'block', paddingTop:'57%'}}></span>
            </div>
        </div>

        <hr/>

        <div>
            <h3> نظر و دیدگاه کاربران</h3>
            <div style={{marginTop : '90px'}}
             className="d-flex flex-column  flex-row align-items-center  justify-content-md-around ">
                {
                    auth ? 
                        writerStatus ? 
                        <div>
                            <p className="mb-0">صرف نظر</p>
                            <img onClick={() => setWriterStatus(false)} className={`${!writerStatus ? 'd-none' : null} p-2 rounded  bg-danger btn-lg mb-5`} width={50} height={50} src="/picture.svg/bootstrap-icons-1.10.3/x-lg.svg"/>    
                        </div>
                        : <a onClick={() => setWriterStatus(true)} className={`${writerStatus ? 'd-none' : null} btn btn-info btn-lg mb-5`}>ثبت دیدگاه شما</a>
                        : <a href="/sign-up" className={`btn btn-outline-info btn-lg mb-5` }>برای ثبت نظر ثبت نام کنید</a>
                }

                <div  className={`${!writerStatus ? 'd-none' : null} d-flex flex-column mt-5 mt-lg-0`}>
                    <div className={`mb-3 d-flex`}>
                        <div className="d-flex flex-column justify-content-between ms-4">
                            <button className="btn btn-outline-warning" type="button" data-bs-toggle="dropdown" aria-expanded="false">امتیاز دهی</button>
                            <ul className="dropdown-menu" style={{backgroundColor : '#292929'}}>
                                <li><a name={1} onClick={changeScoreHandler} className="dropdown-item text-danger">1</a></li>
                                <li><a name={2} onClick={changeScoreHandler}style={{color : '#ff9e9e'}} className="dropdown-item">2</a></li>
                                <li><a name={3} onClick={changeScoreHandler}className="dropdown-item text-secondary">3</a></li>
                                <li><a name={4} onClick={changeScoreHandler}style={{color : 'rgb(158 255 165)'}} className="dropdown-item">4</a></li>
                                <li><a name={5} onClick={changeScoreHandler}className="dropdown-item text-success">5</a></li>
                            </ul>
                            <button className="btn btn-outline-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">نظر کلی</button>
                            <ul className="dropdown-menu">
                                <li><a name={'positive'} onClick={changeGenerallHandler} className="dropdown-item text-success">مثبت</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a name={'negitive'} onClick={changeGenerallHandler} className="dropdown-item text-danger">منفی</a></li>
                            </ul>
                        </div>
                        <textarea name="text" onChange={updataText} value={addComment.text}
                        className=" form-control p-2 text-area-style-sm text-area-style-md text-area-style-lg" placeholder="نظرتان را با جزئیات بنوسید ..." id="exampleFormControlTextarea1" style={{height : '80px' , width : '800px'}}></textarea>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-around">
                       <div className="d-flex flex-column">
                             <div className="d-flex justify-content-between mt-2 mt-md-0">
                                <a onClick={addPositiveInputHandler} className="btn btn-outline-success dropdown-toggle">+ اضافه کردن نکته مثبت</a>
                                <img onClick={deletePositiveInputHandler} style={{backgroundColor : 'red'}} className="rounded p-1 me-2" width={30} height={30} src={'/picture.svg/bootstrap-icons-1.10.3/trash3.svg'}/> 
                            </div>
                            {
                                addComment?.positivePoint?.map((item , index) => 
                                    <input name="positivePoint" onChange={(e) => updataPositiveInput(e , item.id)} style={{backgroundColor : 'rgb(197 255 209)'}} className="form-control p-2 mt-2" placeholder={`${index + 1}- نکته مثبت...`}/>
                                )
                            }
                       </div>
                       <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between mt-2 mt-md-0">
                                <a onClick={addNegitiveInputHandler} className="btn btn-outline-danger dropdown-toggle"> - اضافه کردن نکته منفی</a>
                                <img onClick={deleteNegitiveInputHandler}  style={{backgroundColor : 'red'}} className="rounded p-1 me-2" width={30} height={30} src={'/picture.svg/bootstrap-icons-1.10.3/trash3.svg'}/> 
                            </div>
                            {
                                addComment?.negetivePoint?.map((item , index) => 
                                    <input name="negetivePoint" onChange={(e) => updataNegitiveInput(e , item.id)} style={{backgroundColor : 'rgb(255 194 194)'}} className="form-control p-2 mt-2" placeholder={`${index + 1}- نکته منفی...`}/>
                                )
                            }
                            
                       </div>
                    
                    </div>
                    {
                        loading ? <CustomLoading />
                        : <a onClick={sendCommentHandler}  className={`btn btn-info btn-lg mt-5`}>ارسال و ثبت نظر</a>
                    }
                    
                    {
                        addComment.Err ? <p className="text-danger text-center mt-5 p-3 rounded text-danger">{addComment.Err}</p> : null
                    }
                </div>

                <div className={`${writerStatus ? 'd-none' : null} mt-5 mt-md-0`}>
                    {
                        getComment?.length == 0 ? <h3 className="text-light text-center">هیچ نظر و ارزیابی در این بخش وجود ندارد!</h3>
                        :
                            getComment?.map(comment => 
                            <CommentMobile writerName={comment.writerName} score={comment.score}
                            inGenerall={comment.inGenerall} text={comment.text}
                            positivePoint={comment.positivePoint} negetivePoint={comment.negetivePoint}/>
                        )}
                </div>
            </div>
        </div>
    </div>
    )
}