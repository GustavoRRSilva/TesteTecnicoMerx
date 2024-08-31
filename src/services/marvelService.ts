// src/services/marvelService.ts
import { HeroInfos, Comic } from "@/types/types";

const md5 = "4739ead13b844f25749730ae4c134825";
const apiKey = "15dbc5853fabb98c4a2ae92963f44a9a";
const timesStamp = 1724962697;

export const loadHeroInfo = async (id: string) => {
  try {
    const res = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timesStamp}&apikey=${apiKey}&hash=${md5}`;
    const response = await fetch(res);
    const data = await response.json();

    if (data.data && data.data.results && data.data.results.length > 0) {
      const heroData: HeroInfos = data.data.results[0];
      let comicsDetails: Comic[] = [];

      if (heroData.comics.items.length > 0) {
        const comicsPromises = heroData.comics.items.map(async (comic: { resourceURI: string }) => {
          const comicRes = `${comic.resourceURI}?ts=${timesStamp}&apikey=${apiKey}&hash=${md5}`;
          const comicResponse = await fetch(comicRes);
          const comicData = await comicResponse.json();
          return comicData.data.results[0] as Comic;
        });

        comicsDetails = await Promise.all(comicsPromises);
      }

      return { heroData, comicsDetails };
    } else {
      throw new Error("Hero not found");
    }
  } catch (err) {
    throw err;
  }
};
