import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn, useSession } from  "next-auth/react"
export default function SignInPage(){
    let [loading , setLoading] = useState(false)
    let [state , setState] = useState({
        Email : '',
        Password : '',
        Err : ''
    })
    let changeHandler = (e) => setState({...state , [e.target.name] : e.target.value})
    let session = useSession()
    session.status == 'authenticated' ? router.push('/') : null
    console.log(session.status)
    let router = useRouter()
    
    let signInHandler = async () => {
        setLoading(true)
        let res = await signIn('credentials' , {
            Email : state.Email,
            Password : state.Password,
            redirect : false
        })
        res.ok ? router.push('/') : setState({...state , Err : 'ایمیل یا پسورد نادرست است'})
        setLoading(false)
    }
    let logInWithGithub = () => {
        setLoading(true)
        signIn('github', {redirect : false})
    }
    let logInWithGoogle = () => {
        setLoading(true)
        signIn('google', {redirect : false})
    }
    
    return(
        <div className="container-padding" style={{height : '55rem'}}>
            <div className="d-flex width-form mb-5 width-form-small width-form-medium align-items-center flex-row-reverse justify-content-evenly bg-white container">
                <div className="d-none d-lg-block">
                    <Image alt="ll" src={'/pict/img-01.png'} width={316} height={289}/>
                </div>
                <div className="d-flex align-items-center flex-column">
                    <span className="h4 pb-5">
                            ورود به اکانت
                    </span>

                    <div dir="ltr" className="input-group my-4">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name="Email" onChange={changeHandler} type="email" className="form-control input-pad" placeholder="ایمیل" aria-label="Username"/>
                    </div>

                    <div dir="ltr" className="input-group mb-5">
                        <img className="input-group-text" src="/picture.svg/bootstrap-icons-1.10.3/shield-lock-fill.svg"/>
                        <input name="Password" onChange={changeHandler} type="password" className="form-control input-pad" placeholder="رمزعبور" aria-label="Username"/>
                    </div>

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
                        : <div onClick={signInHandler} className="btn login-btn">
                            ورود
                        </div>
                    }
                    <div className="pt-3 d-flex justify-content-between align-items-baseline">
                        <small className="ps-3">اگر تا کنون ثبت نام نکردید</small>
                        <Link href={'/sign-up'}><p className="text-success">ثبت نام رایگان</p></Link>
                    </div>
                    <div className="d-flex">
                        <button onClick={logInWithGoogle} className="d-flex btn bg-light align-items-baseline mt-3">
                            <h6>ثبت نام گوگل</h6>
                            <a className="btn"><img src="/picture.svg/bootstrap-icons-1.10.3/google.svg" width={30} height={30}/></a>
                        </button>
                        <button onClick={logInWithGithub} className="d-flex btn bg-light align-items-baseline mt-3 me-4">
                            <h6>ثبت نام با گیت هاب</h6>
                            <a className="btn"><img src="/picture.svg/bootstrap-icons-1.10.3/github.svg" width={30} height={30}/></a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

