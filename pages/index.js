import HomePage from "@/component/template/HomePage";

export default function Home({data}) {

  return <HomePage {...data}/>
}

export async function getStaticProps(){
    let procces = await fetch(process.env.URI_DATA)
    let data = await procces.json()
    return {
      props : {data}
    }
}