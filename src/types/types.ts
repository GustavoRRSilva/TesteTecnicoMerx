export type HeroProps = {
    name: string,
    thumbnail: string
    id:number
}

export interface Thumbnail {
    path: string;
    extension: string;
  }
  
  export interface Comic {
    resourceURI: string;
    name: string;
    thumbnail: Thumbnail;
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