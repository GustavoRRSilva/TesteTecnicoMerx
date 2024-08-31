"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HeroInfos, Comic } from "@/types/types";
import styles from "@/styles/HeroDetail.module.scss";
import { loadHeroInfo } from "@/services/marvelService";

export default function HeroTeste() {
  const { id } = useParams();
  const [error, setError] = useState<boolean>(false);
  const [hero, setHero] = useState<HeroInfos | null>(null);
  const [comicsDetails, setComicsDetails] = useState<Comic[]>([]);

  useEffect(() => {
    // Encapsulate the async function inside useEffect
    const fetchHeroInfo = async () => {
      setError(false);
      try {
        if (!id || (Array.isArray(id) && id.length === 0)) return;

        const heroId = Array.isArray(id) ? id[0] : id; // Ensure id is a string
        const { heroData, comicsDetails } = await loadHeroInfo(heroId);
        setHero(heroData);
        setComicsDetails(comicsDetails);
      } catch (err) {
        setError(true);
      }
    };

    fetchHeroInfo();
  }, [id]);

  // Ensure consistent rendering
  return (
    <div className={styles.heroContainer}>
      <div className={styles.titleDiv}>
        <h1>Character</h1>
        <span></span>
      </div>
      {hero ? (
        <div>
          <div className={styles.content}>
            <img
              src={`${hero.thumbnail.path}/standard_fantastic.${hero.thumbnail.extension}`}
              alt={hero.name}
              className={styles.heroImage}
            />
            <div>
              <h2>{hero.name || "No name"}</h2>
              <p className={styles.description}>{hero.description || "No description"}</p>
            </div>
          </div>
          <div className={styles.titleDiv}>
            <h1>Comics</h1>
            <span></span>
          </div>
          <div className={styles.comics}>
            {comicsDetails.length > 0 ? (
              <ul className={styles.comicList}>
                {comicsDetails.map((comic) => (
                  <li key={comic.id} className={styles.comicItem}>
                    {comic.thumbnail ? (
                      <img
                        src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                        alt={comic.title}
                        className={styles.comicImage}
                      />
                    ) : (
                      <div className={styles.erromsg}>No image available...</div>
                    )}
                    <p>{comic.title}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.erromsg}>No comics available...</p>
            )}
          </div>
        </div>
      ) : (
        <p className={styles.erromsg}>Loading...</p>
      )}
    </div>
  );
}
