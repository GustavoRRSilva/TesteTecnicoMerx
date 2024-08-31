"use client";
import Hero from "@/componentes/Hero";
import { useEffect, useState } from "react";
import style from "@/styles/ListHeroes.module.scss";

export default function HeroList() {
  const [error, setError] = useState<boolean>(false);
  const [heroes, setHeroes] = useState<any[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const md5 = "4739ead13b844f25749730ae4c134825";
  const apiKey = "15dbc5853fabb98c4a2ae92963f44a9a";
  const timesStamp = 1724962697;

  const loadInfos = async (apiKey: string, timesStamp: number, md5: string) => {
    setError(false);
    try {
      const res = `https://gateway.marvel.com/v1/public/characters?ts=${timesStamp}&apikey=${apiKey}&hash=${md5}`;
      const data = await fetch(res).then((res) => res.json());
      console.log(data["data"]["results"]);
      setHeroes(data["data"]["results"]);
      setFilteredHeroes(data["data"]["results"]); 
    } catch (err) {
      setError(true);
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    loadInfos(apiKey, timesStamp, md5);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredHeroes(heroes);
    } else {
      setFilteredHeroes(
        heroes.filter((hero) =>
          hero.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, heroes]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (error) {
    return <div>Error loading data.</div>;
  }

  return (
    <main className={style.main}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a hero..."
        className={style.input}
      />
      <div className={style.List}>
        {filteredHeroes.length > 0 ? (
          filteredHeroes.map((hero) => (
            <Hero
              key={hero.id}
              id={hero.id}
              thumbnail={`${hero.thumbnail.path}/standard_fantastic.${hero.thumbnail.extension}`}
              name={hero.name}
            />
          ))
        ) : (
          <p>No heroes found.</p>
        )}
      </div>
    </main>
  );
}
