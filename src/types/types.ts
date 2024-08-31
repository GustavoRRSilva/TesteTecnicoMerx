export type HeroProps = {
    name: string,
    thumbnail: string
    id:number
}

// Adicionando 'id' à interface Comic para corresponder à estrutura dos dados retornados pela API
export interface Comic {
  id: number; // Adicione esta propriedade
  resourceURI: string;
  title: string;
  thumbnail: Thumbnail;
}

// Mantendo as outras interfaces como estão
export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Comics {
  available: number;
  collectionURI: string;
  items: Comic[];
  returned: number;
}

export interface HeroInfos {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: Comics;
}
