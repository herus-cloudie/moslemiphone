export default function LegibleName({name , brand}){
    brand == 'apple' ? name = name.replace('iphone' , 'iphone ')
     : brand == 'samsung' ? name = name.replace('galaxy' , 'galaxy ') 
        : brand == 'xiaomi' ? name.includes('redmi') ? name = name.replace('redmi' ,'redmi ')
          : name.includes('poco') ? name = name.replace('poco' ,'poco ') : null : null
        return(
            <>{name}</>
        )
}