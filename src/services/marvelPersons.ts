// src/services/marvelService.ts

const BASE_URL = "https://gateway.marvel.com/v1/public/characters";
const md5 = "4739ead13b844f25749730ae4c134825";
const apiKey = "15dbc5853fabb98c4a2ae92963f44a9a";
const timesStamp = 1724962697;

export const loadHeroes = async (offset: number, limit: number, searchTerm?: string) => {
  try {
    const searchQuery = searchTerm ? `&nameStartsWith=${searchTerm}` : "";
    const res = `${BASE_URL}?ts=${timesStamp}&apikey=${apiKey}&hash=${md5}&offset=${offset}&limit=${limit}${searchQuery}`;
    const response = await fetch(res);
    const data = await response.json();
    return data.data.results;
  } catch (err) {
    throw err;
  }
};
