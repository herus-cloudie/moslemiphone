import Image from "next/image"
import Link from "next/link"
import LegibleName from "./legible/legibleName"
import { LegibleDiscount, LegiblePrice } from "./legible/legiblePrice"
export default function Card({price , name , id , brand , img , discount}){

    return(
        <div className="py-lg-5 py-3">
            <div className="card card-mobile-width">
            {
                discount != 'no' ?
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {discount}%off
                </span> 
                : null
            }
            <Link href={`/mobile/${id}`}><img width={200} height={200} src={img} className="center-image mb-3" alt="..."/></Link>
                <div className="card-body border-top border-3 border-danger-subtle">
                <h5 className="card-title d-flex justify-content-between align-baseline"><p className="text-secondary">نام موبایل :</p><small>{<LegibleName name={name} brand={brand}/>}</small></h5>
                <h5 className="card-text d-flex justify-content-between align-baseline"><p className="text-secondary">قیمت :
                </p>{discount != 'no' ?
                 <div className="d-flex flex-column">
                    <p className="text-success">{<LegibleDiscount Price={price} discount={discount}/>} تومان</p> <del className="text-danger"><small>{<LegiblePrice Price={price}/>}</small></del>
                 </div> : <p>{<LegiblePrice Price={price}/>} تومان</p>}</h5>
                <h5 className="card-text d-flex justify-content-between align-baseline"><p className="text-secondary">برند سازنده :</p>{brand}</h5>
                <Link href={`/mobile/${id}`} className="btn btn-grad">جزییات</Link>
            </div>
        </div>
        </div>
    )
}