import Header from "@/component/module/header";
import WhyUs from "@/component/module/whyUs";
import NewPhone from "@/component/module/newPhone";
import HomePageComment from "@/component/module/HomePageComment";
import Gallery from "@/component/module/gallery";
import Pannel from "@/component/module/pannel";
import Question from "@/component/module/question";
import Download from "@/component/module/download";
import Contact from "../module/contact";
import { signIn } from "next-auth/react";

export default function HomePage(data) {
  return (
      <>
      <Header />
      <WhyUs />
      <NewPhone/>
      <HomePageComment /> 
      <Gallery {...data}/>
      <Pannel />
      <Question />
      <Download />
      <Contact />
      </>
  )
}