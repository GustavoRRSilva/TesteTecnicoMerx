export type HeroProps = {
    name: string,
    thumbnail: string
    id:number
}

// Adicionando 'id' à interface Comic para corresponder à estrutura dos dados retornados pela API
export interface Comic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
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
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    items: { resourceURI: string }[]; 
  };
}