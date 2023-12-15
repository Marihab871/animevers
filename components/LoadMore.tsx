'use client'

import Image from "next/image";
import { useInView } from "react-intersection-observer";
//import  AnimeCard  from "./AnimeCard";
import React, { useEffect } from "react";
import { fetchAnime } from "@/app/action";
import { useState } from "react";
let page = 2


export type AnimeCard = JSX.Element
 function  LoadMore() {
  const [data,setData] = useState<AnimeCard[]>([])
  const {ref,inView} = useInView()
  useEffect(()=>{
    if(inView){
      fetchAnime(page).then((res)=>{
        setData([...data,...res])
        page++
      })
    }
  },[inView,data])
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full">
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
