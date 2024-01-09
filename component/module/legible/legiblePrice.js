function LegiblePrice({Price}){
    Price = +Price
    let price = Price.toLocaleString() 
    return(
        <>{price}</>
    )
} 
function LegibleDiscount({Price , discount}){
    
    Price = +Price
    let discountAdded = Price  - (Price  / 100 * discount);
    let price = discountAdded.toLocaleString() 
    return(
        <>{price}</>
    )
} 

export {LegiblePrice , LegibleDiscount}