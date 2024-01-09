export default function HomePageComment(){
    return(
        <div className="section light-bg" id="">
          <div className="container">
              <div className="section-title">
                  <small className="text-pink">نظرات</small>
                  <h3 className="H-color">آنچه مشتریان ما میگویند</h3>
              </div>

              <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="comment-single d-flex align-items-center flex-column">
                          <img className="client-img" src="./pict/khodam2.jpg" alt=""/>
                          <blockquote className="blockquote text-center">بهترین تجربه خرید انلاینی که داشتم تا به حال! البته لوازم جانبی رو از شعبه رشت حضوری خرید کردم که خیلی راضی بودم. خیلی ممنون از مجموعه تون</blockquote>
                          <h5 className="mt-4 mb-2">امیر زارعی</h5>
                          <p>رشت</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="comment-single d-flex align-items-center flex-column">
                          <img className="client-img" src="./pict/khodam3.jpg" alt=""/>
                          <blockquote className="blockquote text-center">من یک گوشی note 12 pro از فروشگاهتون خرید کردم که متاسفانه رنگ اشتباه فرستادن البته با پیگیری خوب پشتیبانی گوشی کمتر از 24 ساعت تعویض به رنگ دلخواهم شد بدون هزینه ای. در کل من از خریدم راضیم</blockquote>
                          <h5 className="mt-4 mb-2">حامد کلهورپور</h5>
                          <p>تهران</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="comment-single d-flex align-items-center flex-column">
                          <img className="client-img" src="./pict/khodam.jpg" alt=""/>
                          <blockquote className="blockquote text-center">اهل اغراق نیستم ولی واقعا از برخورد پرسنل این فروشگاه بسیار راضی بودم و به نظرم یکی از مهمترین فاکتورهای مجموعه مناسب , برخورد خوب هست </blockquote>
                          <h5 className="mt-4 mb-2">ali niazi</h5>
                          <p>آبادان</p>
                      </div>
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <span className="red"><p className="perv-next">{'>'}</p></span>
                      <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span className="red"><p className="perv-next">{'<'}</p></span>
                      <span className="visually-hidden">Next</span>
                  </button>
              </div>
          </div>
      </div>
    )
}