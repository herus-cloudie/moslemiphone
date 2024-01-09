import LegibleName from "./legible/legibleName";
import { LegiblePrice } from "./legible/legiblePrice";

function PurchaseItemCard({deleteHandler , Brand , Price , Name , Img , id}){

    return(
        <li className="list-group-item d-flex justify-content-between padd">
            <div>
                <img onClick={(e) => deleteHandler(id)} style={{backgroundColor : '#ff5858'}} className="rounded p-1 me-2" width={22} height={22} src={'/picture.svg/bootstrap-icons-1.10.3/trash3.svg'}/> 
                <h6 className="my-3"><LegibleName brand={Brand} name={Name}/></h6>
                <h6 className="text-secondary"><LegiblePrice Price={Price}/> تومان</h6>
            </div>
            <div>
                <img  width={100} height={100} alt=";;" className=" bg-white rounded res-img" src={Img}/>
            </div>
        </li>
    )
}


function StaticPurchaseItemCard({Label , Price , bgColor , textColor}){
    return(
        <li style={{backgroundColor: bgColor}} className="list-group-item d-flex justify-content-between padd">
            <div>
                <h6 className="my-0">{Label}</h6>
            </div>
            <span  className={textColor}>{Price.toLocaleString()} تومان</span>
        </li>
    )
}

export {PurchaseItemCard , StaticPurchaseItemCard}
