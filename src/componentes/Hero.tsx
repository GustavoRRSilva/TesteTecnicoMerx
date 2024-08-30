"use client";
import Image from "next/image";
import Link from "next/link";
import { HeroProps } from "@/types/types";
import style from "@/styles/Hero.module.scss";
export default function Hero({ name, thumbnail,id }: HeroProps) {
  return (
    <Link href = {`/herodetails/${id}`} className={style.Link}>
      <img className={style.img} src={thumbnail} alt={`${name} picture`}></img>
      <h3>{name}</h3>
    </Link>
  );
}

//name, descprition,thumbnail
