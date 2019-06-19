import * as React from 'react';

import {
  SearchContext,
  FavouriteContext,
  TrendingContext,
  Gif,
} from './modules/image';

import Search from './components/Search';
import GifCard from './components/GifCard';

const App: React.FC = () => {
  const {
    state: { list: favourites },
  } = React.useContext(FavouriteContext);
  const {
    state: { list: trending },
  } = React.useContext(TrendingContext);
  const {
    state: { list: results },
    methods: { search },
  } = React.useContext(SearchContext);

  return (
    <div>
      <h3>Trendings</h3>
      <div>
        {trending.map((gif: Gif) => (
          <GifCard key={gif.id} url={gif.url}></GifCard>
        ))}
      </div>
      <hr />
      <h3>Favourites</h3>
      <div>
        {favourites.map((url: string) => (
          <GifCard key={url} url={url}></GifCard>
        ))}
      </div>
      <hr />
      <Search onSearch={search}></Search>
      <hr />
      <h3>Results</h3>
      <div>
        {results.map((gif: Gif) => (
          <GifCard key={gif.id} url={gif.url}></GifCard>
        ))}
      </div>
    </div>
  );
};

export default App;
