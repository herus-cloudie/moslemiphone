import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function FixedTop(){
    useEffect(() => {
        let navItem = document.querySelectorAll('.change-active')
        navItem.forEach(item => item.addEventListener('click' , function(){
            let prevElem = document.querySelector('.change-active.active')
            prevElem?.classList.remove('active')
            this.classList.add('active')
        }))
    } , [])

    let router = useRouter()
    let reduxState = useSelector(item => item.purchase.item)
    let signOutHandler = async () => {
        await signOut()
        router.reload()
    }

    let session = useSession()
    return(
        <div className="fixed-top">
          <div className="container">
              <div className="row animate__animated animate__bounceIn animate__delay-1s">
                  <div className="col">
                      <nav className="navbar navbar-dark navbar-expand-lg">
                        {
                            session.status == 'authenticated' ?
                                <div className="d-flex">
                                    <h3 className="text-white h4 ms-4">{session.data.user.name} خوش اومدی</h3>
                                    {
                                        session.data.user.image ? <img className="rounded" src={session.data.user.image} height={50} width={50}/> : null
                                    }
                                </div>
                                :<Link href="/sign-in" className="navbar-brand">{router.pathname == '/sign-in' ? <h3>ورود به حساب کاربری</h3>
                                :router.pathname == '/sign-up' ? <h3>ساخت اکانت</h3> : <img className="hover-logIcon" src={"/pict/log-in.png"} width={'50'} height={'50'} alt=""/> }</Link>
                        }
                          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
                              <span className="navbar-toggler-icon"></span>
                          </button>

                          <div className="collapse navbar-collapse" id="navbar">
                              <ul className="navbar-nav me-auto coustom d-md-flex flex-md-wrap flex-md-row">
                                {
                                  session.status == 'authenticated' && router.pathname != '/purchase'? 
                                    <Link href={'/purchase'} type="button" class="btn mx-md-5 px-lg-2 purchese-icon purchese-icon-lg btn-light position-relative ms-4">
                                        <img width={20} height={20} src="/picture.svg/bootstrap-icons-1.10.3/cart3.svg"/>
                                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {reduxState?.length}
                                        </span>
                                    </Link>
                                     : null
                                }
                                  <li className="nav-item px-md-5 px-lg-0"> <a href="/#home" className={`nav-link ${router.pathname == '/' ? 'active' : null} change-active`}>صفحه اصلی</a> </li>
                                  <li className="nav-item"> <a className="nav-link d-none d-l-block"></a> </li>
                                  <Link href={'/mobile'} className={`nav-link px-md-5 mx-lg-3 px-lg-0 ${router.pathname == '/mobile' ? 'active' : null} change-active`}>
                                    <li>موبایل</li></Link>
                                  <li className="nav-item px-md-5 px-lg-0"><a href="/#features" className={`nav-link change-active ${router.asPath == '/#features' ? 'active' : ''} `}>ویژگی ها</a> </li>
                                  <li className="nav-item px-md-5 px-lg-0 pt-md-3 pt-lg-0"><a href="/#pricing" className="nav-link change-active">گارانتی</a> </li>
                                  <li className="nav-item px-md-5 px-lg-0 pt-md-3 pt-lg-0"><a href="/#contact" className="nav-link change-active">ارتباط با ما</a> </li>
                                  {
                                    session.status == 'authenticated' ?
                                    <li className="nav-item sign-out_li px-md-5 px-lg-0 pt-md-3 pt-lg-0"><a className="sign-out_btn sign-out_btn-sm nav-link"
                                  onClick={signOutHandler}>خروج از حساب</a> </li> : null
                                  }
                                  <li className="nav-item pt-md-3 pt-lg-0"><a className="nav-link"></a> </li>
                                  <li className="nav-item pt-md-3 pt-lg-0 px-md-5 px-lg-0"><a href="/#download" className="btn btn-outline-light">دانلود</a> </li>
                              </ul>
                          </div>
                      </nav>
                  </div>
              </div>
          </div>
      </div>
    )
}