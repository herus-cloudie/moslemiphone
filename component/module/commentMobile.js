export default function CommentMobile({writerName , score , inGenerall , text , positivePoint , negetivePoint}){
    return(
        <div className="card width-comment width-comment-sm width-comment-md width-comment-lg p-4 m-5">
            <div className={`d-flex align-items-baseline justify-content-between px-5`}>
                <h5 className="text-black mb-4">{writerName}</h5>
                <span class="badge text-bg-warning">{score}</span>
            </div>
            <span className={`${inGenerall == 'positive' ? 'bg-success' : 'bg-danger'} position-absolute top-0 start-100 translate-middle p-2  border border-light rounded-circle`}></span>
            <p className="text-muted">{text}</p>
            <ul className="d-flex flex-column mt-3">
                <div className="d-flex flex-column">
                    {
                        positivePoint.map(item => <PointMap color={'text-success'} text={item.text} mark={'+'}/>)
                    }
                    {
                        negetivePoint.map(item => <PointMap color={'text-danger'} text={item.text} mark={'-'}/>)
                    }
                </div>
            </ul>
        </div>
    )
}

function PointMap({color , text , mark}){
    return(
        <div className="d-flex">
            <span className={`${color} ms-2`}>{mark}</span>
            <p className={`${color} fs-custome`}>{text}</p>
        </div>
    )
}