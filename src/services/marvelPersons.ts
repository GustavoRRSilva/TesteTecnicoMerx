// src/services/marvelService.ts

export const md5 = "4739ead13b844f25749730ae4c134825";
export const apiKey = "15dbc5853fabb98c4a2ae92963f44a9a";
export const timesStamp = 1724962697;

export const loadHeroes = async () => {
  try {
    const res = `https://gateway.marvel.com/v1/public/characters?ts=${timesStamp}&apikey=${apiKey}&hash=${md5}`;
    const response = await fetch(res);
    const data = await response.json();
    return data.data.results;
  } catch (err) {
    throw err; 
  }
};
