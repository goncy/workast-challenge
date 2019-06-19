import * as React from 'react';

import { FavouriteContext } from '../modules/image';

interface Props {
  url: string;
}

const GifCard: React.FC<Props> = ({ url }) => {
  const {
    state: { list: favourites },
    methods: { toggle },
  } = React.useContext(FavouriteContext);

  const isFavourite = favourites.includes(url);

  return (
    <div key={url}>
      <a href={url} rel="noopener noreferrer" target="_blank">
        <img alt="result" src={url} />
      </a>
      <button onClick={() => toggle(url)}>
        {isFavourite ? 'Remove from' : 'Add to'} favourites
      </button>
    </div>
  );
};

export default GifCard;
