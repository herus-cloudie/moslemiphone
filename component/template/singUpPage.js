import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
export default function SignUpPage(){
    let [loading , setLoading] = useState()
    let [state , setState] = useState({
        Email : '',
        Name : '',
        Password : '',
        Password2nd : '',
        Err : ''
    })
    let changeHandler = (e) => setState({...state , [e.target.name] : e.target.value})
    
    let router = useRouter()
    
    let clickHandler = async () => {
        if (state.Email && state.Password && state.Password2nd && state.Name) {
            if (state.Password.length < 6 || state.Password2nd.length < 6) {
                setState({...state , Err : 'پسورد شما باید بیشتر از 6 کلمه باشد'})
                return;
            }else{
                setLoading(true)
                let procces = await fetch('/api/sign-up' , {
                    method : 'POST',
                    body : JSON.stringify(state),
                    headers : {'Content-Type': 'application/json'}
                })
                let data = await procces.json()
                setLoading(false)
                data.status == 'success' ? router.push('/sign-in') : setState({...state , Err : data.message})
            }
        } else {
            setState({...state , Err : 'لطفا تمامی فیلد هارا پر کنید'})
            return;
        }
    }
    return(
        <div className="container-padding padding-custom" style={{height : '60rem'}}>
            <div style={{paddingBottom : '65px'}} className="d-flex width-form width-form-small width-form-medium align-items-center flex-row-reverse justify-content-evenly bg-white container">
                <div className="d-none d-lg-block">
                    <Image alt="log-img" src={'/pict/img-01.png'} width={316} height={289}/>
                </div>
                <form className="d-flex align-items-center flex-column">
                    <span className="h4 pb-5">
                            ایجاد حساب کاربری
                    </span>
                    <div dir="ltr" className="input-group my-4">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name="Email" onChange={changeHandler} type="email" className="form-control input-pad" placeholder="ایمیل" aria-label="Username"/>
                    </div>
                    <div dir="ltr" className="input-group mb-4">
                        <img className="input-group-text" src="/picture.svg/bootstrap-icons-1.10.3/person-fill.svg"/>
                        <input name="Name" onChange={changeHandler} type="text" className="form-control input-pad" placeholder="نام" aria-label="Username"/>
                    </div>

                    <div dir="ltr" className="input-group mb-4">
                        <img className="input-group-text" src="/picture.svg/bootstrap-icons-1.10.3/shield-lock-fill.svg"/>
                        <input name="Password" onChange={changeHandler} type="text" className="form-control input-pad" placeholder="رمزعبور" aria-label="Username"/>
                    </div>
                    <div dir="ltr" className="input-group mb-3">
                        <img className="input-group-text" src="/picture.svg/bootstrap-icons-1.10.3/shield-lock-fill.svg"/>
                        <input name="Password2nd" onChange={changeHandler} type="text" className="form-control input-pad" placeholder="تکرار رمزعبور" aria-label="Username"/>
                    </div>
                    <ul class="list-group p-0 mb-3">
                        <li class="info-style">پسورد باید حداقل 6 کاراکتر باشد</li>
                        <li class="info-style">لطفا پسورد را به حروف انگلیسی وارد کنید</li>
                    </ul>
                    <>
                        {
                            state.Err != '' 
                            ? <div className="text-danger p-1 mb-4">{state.Err}</div>
                            : null
                        }
                    </>
                    {
                        loading ? 
                        <div className="btn login-btn-loading">
                            <span role="status" className="margin-loading">... Loading</span>
                            <span class="spinner-border spinner-grow-sm" aria-hidden="true"></span>
                        </div> 
                        : <div onClick={clickHandler} className="btn login-btn">
                        ایجاد اکانت 
                        </div>
                    }
                    

                    <div className="pt-3 d-flex align-items-baseline">
                        <small className="ps-3">اگر حساب کاربری دارید</small>
                        <Link href={'/sign-in'}><p className="text-success">ورود به حساب</p></Link>
                    </div>
                </form> 
            </div>
        </div>
    )
}

