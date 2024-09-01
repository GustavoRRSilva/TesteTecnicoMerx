"use client";
import Hero from "@/componentes/Hero";
import { useEffect, useState } from "react";
import style from "@/styles/ListHeroes.module.scss";
import { loadHeroes } from "@/services/marvelPersons";

// Número de heróis por página
const HEROES_PER_PAGE = 20;

export default function HeroList({ currentPage }: { currentPage: number }) {
  const [error, setError] = useState<boolean>(false);
  const [heroes, setHeroes] = useState<any[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const fetchHeroes = async () => {
    setError(false);
    setLoading(true);
    try {
      const offset = (currentPage - 1) * HEROES_PER_PAGE;
      const heroData = await loadHeroes(offset, HEROES_PER_PAGE);
      setHeroes(heroData);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, [currentPage]);

  useEffect(() => {
    let result = heroes;

    // Filtrar por nome
    if (searchTerm.trim() !== "") {
      result = result.filter((hero) =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por nome
    result = result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredHeroes(result);
  }, [searchTerm, heroes, sortOrder]); // Certifique-se de que o efeito seja executado sempre que esses valores mudarem

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
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
        placeholder="Procure por um herói..."
        className={style.input}
      />

      <select value={sortOrder} onChange={handleSortChange} className={style.select}>
        <option value="asc">Ordem da página por nome (A-Z)</option>
        <option value="desc">Ordem da página por nome (Z-A)</option>
      </select>

      {loading ? (
        <div className={style.loading}>Loading...</div>
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
