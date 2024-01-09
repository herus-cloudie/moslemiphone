export default function Download(){
    return(
        <div className="section bg-grad" id="download">
          <div className="container">
              <div className="call-to-action">
                  <img className="img-width" src="./picture.svg/bootstrap-icons-1.10.3/phone-vibrate.svg" width="100" height="100" alt=""/>
                  <h2 className="text-light">راه های دانلود</h2>
                  <p className="tagline">اپلیکیشن ما برای موبایل هم در دسترس هست و میتونید دانلود و ازش استفاده کنید (از تحریم شکن استفاده کنید)</p>
                  <div className="my-4">
                      <a className="btn btn-light"><img className="ms-2" src="./pict/playicon.png" alt=""/>اپل استور</a>
                      <a className="btn btn-light"><img className="ms-2" src="./pict/appleicon.png" alt=""/>گوگل پلی</a>
                  </div>
                  <p className="text-primary"><small><i>از ورژن 5 اندروید و  10 ios پشتیبانی میشود</i></small></p>
              </div>
          </div>
      </div>
    )
}