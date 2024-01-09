import Card from "./card";

export default function Gallery(data){

    return(
        <div className="section bg-thistle" id="gallary">
          <div className="container">
              <div className="section-title">
                  <small></small>
                  <h3>پر فروش ترین ها</h3>
              </div>
              <div id="carouselExample2" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="comment-single d-flex align-items-center flex-column">
                      <h4 className="text-white d-flex bg-grad p-3 rounded">تعداد خرید : 54 عدد</h4>
                          <Card className="img-costom  rounded py-3 bg-white"{...data[7]}/>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="comment-single d-flex align-items-center flex-column">
                      <h4 className="text-white d-flex bg-grad p-3 rounded">تعداد خرید : 68 عدد</h4>
                      <Card className="img-costom  rounded py-3 bg-white"{...data[11]}/>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="comment-single d-flex align-items-center flex-column">
                        <h4 className="text-white d-flex bg-grad p-3 rounded">تعداد خرید : 173 عدد</h4>
                      <Card className="img-costom  rounded py-3 bg-white"{...data[17]}/>
                      </div>
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample2" data-bs-slide="prev">
                      <span className="red"><p className="perv-next">  {'>'} </p></span>
                      <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample2" data-bs-slide="next">
                      <span className="red"><p className="perv-next">  {'<'} </p></span>
                      <span className="visually-hidden">Next</span>
                  </button>
              </div>
          </div>
      </div>
    )
}