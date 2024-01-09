import '@/styles/globals.css'
import '../styles/bootstrap.min.css'
import 'animate.css'
import Head from 'next/head'
import Layout from '@/component/layout/layout'
import { useEffect, useState } from 'react'
import Providers from '@/redux/Providers'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
export default function App({ Component, pageProps }) {
  let router = useRouter()
  let navClass = router.pathname == '/' ? 'home-page'
    : router.pathname == '/mobile' ? 'detaile-page'
    : router.pathname == '/mobile/[detailes]' ? 'detaile-page'
    : router.pathname == '/sign-in' ? 'singin-page'
    : router.pathname == '/sign-up' ? 'singin-page'
    : router.pathname == '/purchase' ? 'purchase-page'
    : null

  useEffect(() => {
    let selected = document.querySelector('.fixed-top') 
        function AddnavbarByScroll(){
            if (window.scrollY > 50)selected.classList.add(navClass)
            else if(window.scrollY < 50)selected.classList.remove(navClass)
        }
        if(window.innerWidth < 992){
          selected.classList.add(navClass)
        }else window.addEventListener('scroll' , () => AddnavbarByScroll() )
    })
  return (
  <>
  <Head>
    <title>فروشگاه موبایل مسلمی</title>
    <meta name='فروشگاه موبایل' content='فروش موبایل و خدمات پس از فروش' />
  </Head>
  <SessionProvider session={pageProps.session}>
    <Providers child={<Layout  _app={<Component {...pageProps} />}/>}/>
  </SessionProvider>
  </>
  )
}
