import * as React from 'react';

import {
  SearchContext,
  FavouriteContext,
  TrendingContext,
  Gif,
} from './modules/image';

const App: React.FC = () => {
  const [criteria, setCriteria] = React.useState('');

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

  function handleCriteria(event: React.ChangeEvent<HTMLInputElement>) {
    setCriteria(event.target.value);
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    search(criteria);
  }

  return (
    <div>
      <h3>Trendings</h3>
      <div>
        {trending.map((gif: Gif) => (
          <img key={gif.id} alt="favourite" className="image" src={gif.url} />
        ))}
      </div>
      <hr />
      <h3>Favourites</h3>
      <div>
        {favourites.map((url: string) => (
          <img key={url} alt="favourite" src={url} />
        ))}
      </div>
      <hr />
      <form onSubmit={handleSearch}>
        <input type="text" onChange={handleCriteria} />
        <input type="submit" />
      </form>
      <hr />
      <h3>Results</h3>
      <div>
        {results.map((result: Gif) => (
          <img key={result.id} alt="result" src={result.url} />
        ))}
      </div>
    </div>
  );
};

export default App;
