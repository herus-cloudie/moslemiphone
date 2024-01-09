import Link from "next/link";

export default function NewPhone(){
    return(
        <div className="section pb-0 pe-md-5" id="">
          <div className="container">
              <div className="row pe-md-5">
                  <div className="col-lg-6 mb--5">
                      <div className="icon-box">
                          <img src="picture.svg/bootstrap-icons-1.10.3/phone.svg" width="80px" height="80px" alt=""/>
                      </div>
                      <h2 className="H-color">گوشی های آکبند موجود</h2>
                      <p className="pp">هر هفته تخفیف های خفن روی گوشی هامون میزاریم. ارسالمون هم رایگانه ! حتما یه سر بزن</p>
                      <Link href={'/mobile'}><button className="btn btn-grad">نمایش لیست</button></Link>
                  </div>
                  <div className="perspective-phone">
                      <img src="./pict/perspective.png" className="img-fluid" alt=""/>
                  </div>
              </div>
          </div>
      </div>
    )
}