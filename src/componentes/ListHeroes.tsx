"use client";
import Hero from "@/componentes/Hero";
import { useEffect, useState } from "react";
import style from "@/styles/ListHeroes.module.scss";
import { loadHeroes } from "@/services/marvelPersons"; 
export default function HeroList() {
  const [error, setError] = useState<boolean>(false);
  const [heroes, setHeroes] = useState<any[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchHeroes = async () => {
    setError(false);
    try {
      const heroData = await loadHeroes();
      console.log(heroData);
      setHeroes(heroData);
      setFilteredHeroes(heroData); 
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchHeroes();
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
