import Image from "next/image";

export default function Header() {
    return(
        <header className="bg-grad" id="home">
          <div className="container mt-5">
              <h1 className="mb-5 H-color animate__animated  animate__jackInTheBox">به وبسایت فروشگاهی مسلمی خوش آمدید!</h1>
              <div className="tagline">انواع خدمات مانند فروش گوشی آکبند , دست دوم و تعمیرات و... اینجا در دسترس شماست </div>
              <div className="img-holder mt-3">
              <img width={500} height={500} src="/pict/iphonex.png" priority={true}  alt="" className="img-fluid"/>
              </div>
          </div>
      </header>
    )
}