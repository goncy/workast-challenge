import { Gif } from './types';

const BASE_URL = 'https://api.giphy.com/v1/gifs';
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

interface Giphy {
  id: string;
  images: {
    preview_gif: {
      url: string;
    };
  };
}

export default {
  favourites: {
    fetch: (): Promise<string[]> =>
      new Promise<string[]>((resolve, reject) => {
        try {
          resolve(JSON.parse(localStorage.getItem('favourites') || '[]'));
        } catch (e) {
          reject(e);
        }
      }),
    update: (favourites: string[]): Promise<string[]> =>
      new Promise<string[]>((resolve, reject) => {
        try {
          localStorage.setItem('favourites', JSON.stringify(favourites));

          resolve(favourites);
        } catch (e) {
          reject(e);
        }
      }),
  },
  trendings: (): Promise<Gif[]> =>
    fetch(`${BASE_URL}/trending?api_key=${API_KEY}&limit=${10}`)
      .then(res => res.json())
      .then((response: { data: Giphy[] }) =>
        response.data.map(giphy => ({
          id: giphy.id,
          url: giphy.images.preview_gif.url,
        }))
      )
      .catch(() => {
        throw new Error('There was an error, try again later');
      }),
  search: (criteria: string): Promise<Gif[]> =>
    fetch(`${BASE_URL}/search?q=${criteria}&api_key=${API_KEY}&limit=${20}`)
      .then(res => res.json())
      .then((response: { data: Giphy[] }) =>
        response.data.map(giphy => ({
          id: giphy.id,
          url: giphy.images.preview_gif.url,
        }))
      )
      .catch(() => {
        throw new Error('There was an error, try again later');
      }),
};
