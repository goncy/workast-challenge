import * as React from 'react';

import { Gif } from '../types';
import api from '../resources';

interface Props {
  children: React.ReactNode;
}

interface State {
  list: Gif[];
}

interface Methods {
  refetch: (id: string) => void;
}

interface Api {
  state: State;
  methods: Methods;
}

const TrendingContext = React.createContext<Api>({
  state: { list: [] },
  methods: { refetch: () => {} },
});

const TrendingProvider = ({ children }: Props) => {
  const [list, setList] = React.useState<Gif[]>([]);

  const fetchList = React.useCallback(() => api.trendings().then(setList), []);

  React.useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <TrendingContext.Provider
      value={{
        state: { list },
        methods: { refetch: fetchList },
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};

export { TrendingContext as default, TrendingProvider };
