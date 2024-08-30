import Image from "next/image";
import { useState } from "react";
import Hero from "./Hero/ListHeroes";
import style from "@/styles/Index.module.scss";
export default function Home() {
  return (
    <main className={style.main}>
      <img src = "banner.png" alt = "Marvel banner" className = {style.img}/>
      <div className = {style.titleDiv}>
        <h1>Marvel Characters</h1>
        <span></span>
      </div>
      <Hero></Hero>
    </main>
  );
}
