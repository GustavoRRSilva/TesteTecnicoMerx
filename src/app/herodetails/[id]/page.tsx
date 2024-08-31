"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HeroInfos } from "@/types/types";
import styles from "@/styles/HeroDetail.module.scss";

export default function HeroTeste() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [hero, setHero] = useState<HeroInfos | null>(null);
  const [comicsDetails, setComicsDetails] = useState<any[]>([]); 
  const md5 = "4739ead13b844f25749730ae4c134825";
  const apiKey = "15dbc5853fabb98c4a2ae92963f44a9a";
  const timesStamp = 1724962697;

  const loadHeroInfo = async () => {
    setError(false);
    try {
      const res = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timesStamp}&apikey=${apiKey}&hash=${md5}`;
      const response = await fetch(res);
      const data = await response.json();

      if (data.data && data.data.results && data.data.results.length > 0) {
        const heroData = data.data.results[0];
        setHero(heroData);

        // Buscar detalhes das comics
        if (heroData.comics.items.length > 0) {
          const comicsPromises = heroData.comics.items.map(
            async (comic: any) => {
              const comicRes = `${comic.resourceURI}?ts=${timesStamp}&apikey=${apiKey}&hash=${md5}`;
              const comicResponse = await fetch(comicRes);
              const comicData = await comicResponse.json();
              return comicData.data.results[0];
            }
          );

          const comics = await Promise.all(comicsPromises);
          setComicsDetails(comics);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (id) {
      loadHeroInfo();
    }
  }, [id]);

  if (error) {
    return <div>Error loading hero information.</div>;
  }

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
                      <div>No image available...</div>
                    )}
                    <p>{comic.title}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comics available...</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
