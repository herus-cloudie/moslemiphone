import MobilePage from "@/component/template/mobilePage";

export default function Mobile({data}){
    return <MobilePage data={data}/>
}

export async function getStaticProps(){
    let procces = await fetch(process.env.URI_DATA)
    let data = await procces.json()
    return{
        props : {data}
    }
}