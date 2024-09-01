"use client";
import Hero from "@/componentes/Hero";
import { useEffect, useState } from "react";
import style from "@/styles/ListHeroes.module.scss";
import { loadHeroes } from "@/services/marvelPersons";

const HEROES_PER_PAGE = 20; // Número de heróis por página

export default function HeroList({ currentPage }: { currentPage: number }) {
  const [error, setError] = useState<boolean>(false);
  const [heroes, setHeroes] = useState<any[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Novo estado para carregar

  const fetchHeroes = async () => {
    setError(false);
    setLoading(true); // Inicia o carregamento
    try {
      const offset = (currentPage - 1) * HEROES_PER_PAGE;
      const heroData = await loadHeroes(offset, HEROES_PER_PAGE);
      setHeroes(heroData);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, [currentPage]);

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
      {loading ? (
        <p className={style.loading}>Loading...</p> // Mensagem de carregamento
      ) : (
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
      )}
    </main>
  );
}
