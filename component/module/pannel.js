export default function Pannel(){
    return(
              <div className="section light-bg" id="pricing">
              <div className="container ">
                  <div className="section-title">
                      <small className="text-pink">گارانتی</small>
                      <h3 className="H-color">ارتقا سطح ضمانت</h3>
                  </div>
                  <div className="row justify-content-center align-items-center flex-column flex-lg-row">
                      <div className="card pricing col-lg-3 mb-lg-0 px-3 mb-5 border border-4">
                          <div className="card-head">
                              <small className="text-primary">سطح 1</small>
                              <span>190<sub>تومان</sub></span>
                          </div>
                          <ul className="list-unstyled list-group-flush list-group p-0">
                              <li className="list-group-item">مهلت تست تا 24 ساعت</li>
                              <li className="list-group-item">تعویض قطعه در صورت خرابی</li>
                              <li className="list-group-item"><del>گارانتی ضربه و ابخوردگی</del></li>
                              <li className="list-group-item"><del>همکاری</del></li>
                              <li className="list-group-item"><del>گزارش و آنالیز</del></li>
                          </ul>
                          <div className="card-footer">
                              <a href="#" className="btn btn-grad d-grid">انتخاب این ضمانت</a>
                          </div>
                      </div>
                      <div className="card pricing col-lg-3 mx-lg-5 mb-5 mb-lg-0 popular">
                      <div className="card-head">
                          <small className="text-grad">سطح 2</small>
                          <span>349<sub>تومان</sub></span>
                      </div>
                      <ul className="list-unstyled list-group-flush list-group p-0">
                          <li className="list-group-item">مهلت تست تا 1 هفته</li>
                          <li className="list-group-item">تعویض  محصول در صورت خرابی</li>
                          <li className="list-group-item">رفع مشکل درب محل (50% هزینه)</li>
                          <li className="list-group-item">گارانتی ضد سرقت</li>
                          <li className="list-group-item"><del>گارانتی ضد ضربه و آب</del></li>
                      </ul>
                      <div className="card-footer">
                          <a href="#" className="btn btn-grad d-grid">انتخاب این ضمانت</a>
                      </div>
                  </div>
                      <div className="card pricing col-lg-3 mb-lg-0 px-3 mb-5 border border-4">
                          <div className="card-head">
                              <small className="text-primary">سطح 3</small>
                              <span>599<sub>تومان</sub></span>
                          </div>
                          <ul className="list-unstyled list-group-flush list-group p-0">
                          <li className="list-group-item">مهلت تست تا 1 ماه</li>
                              <li className="list-group-item">تعویض  محصول در صورت خرابی</li>
                              <li className="list-group-item"> رفع مشکل درب محل رایگان</li>
                              <li className="list-group-item">گارانتی ضد سرقت</li>
                              <li className="list-group-item">گارانتی ضد ضربه و آب</li>
                          </ul>
                          <div className="card-footer">
                              <a href="#" className="btn btn-grad d-grid">انتخاب این ضمانت</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    )
}