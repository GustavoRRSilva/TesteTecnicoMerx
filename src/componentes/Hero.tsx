"use client";
import Image from "next/image";
import { HeroProps } from "@/types/types";
export default function Hero({ description, name, thumbnail }: HeroProps) {
  console.log(thumbnail);
  return (
    <div>
      <Image
        src={thumbnail}
        width={100}
        height={100}
        alt={`${name} picture`}
      ></Image>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

//name, descprition,thumbnail
