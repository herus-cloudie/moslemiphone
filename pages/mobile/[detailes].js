import DetailePage from "@/component/template/detailePage";

export default function Detaile({data}){
    return <DetailePage {...data}/>
}

export async function getStaticPaths (){
    let procces = await fetch(process.env.URI_DATA)
    let data = await procces.json()

    let paths = data.map(item => ({params : {detailes : item.id}}))

    return{
        paths,
        fallback : false
    }
}

export async function getStaticProps(context){
    let {params} = context;
    let procces = await fetch(`${process.env.URI_DATA}/${params.detailes}`)
    let data = await procces.json()

    return{
        props : {data}
    }
}