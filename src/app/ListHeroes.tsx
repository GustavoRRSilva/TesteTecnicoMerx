"use client";
import Hero from "@/componentes/Hero/Hero";
import path from "path";
import { useEffect, useState } from "react";
export default function first() {
  const [error, setError] = useState(false);
  const md5 = "4739ead13b844f25749730ae4c134825";
  const apiKey = "15dbc5853fabb98c4a2ae92963f44a9a";
  const timesStamp = 1724962697;
  const [heroes, setHeroes] = useState([]);
  const loadInfos = async (apiKey: string, timesStamp: number, md5: string) => {
    setError(false);
    try {
      const res = `https://gateway.marvel.com/v1/public/characters?ts=${timesStamp}&apikey=${apiKey}&hash=${md5}`;
      const data = await fetch(res).then((res) => res.json());
      console.log(data["data"]["results"]);
      setHeroes(data["data"]["results"]);
    } catch (err) {
      setError(true);
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    loadInfos(apiKey, timesStamp, md5); // Chame a função diretamente dentro
  }, []);

  return (
    <main>
      {heroes &&
        heroes.map((hero: any, index: number) => (
          <Hero
            key={index}
            description={hero.description}
            thumbnail={hero.thumbnail["path"]}
            name={hero.name}
          />
        ))}
    </main>
  );
}
