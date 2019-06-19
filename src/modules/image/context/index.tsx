import * as React from 'react';

import { default as FavouriteContext, FavouriteProvider } from './favourite';
import { default as TrendingContext, TrendingProvider } from './trending';
import { default as SearchContext, SearchProvider } from './search';

interface Props {
  children: React.ReactNode;
}

const ImageProvider = ({ children }: Props) => (
  <SearchProvider>
    <TrendingProvider>
      <FavouriteProvider>{children}</FavouriteProvider>
    </TrendingProvider>
  </SearchProvider>
);

export { FavouriteContext, SearchContext, TrendingContext };

export default ImageProvider;
