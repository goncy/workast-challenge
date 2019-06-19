import * as React from 'react';

import api from '../resources';

interface Props {
  children: React.ReactNode;
}

interface State {
  list: string[];
}

interface Methods {
  toggle: (id: string) => void;
}

interface Api {
  state: State;
  methods: Methods;
}

const FavouriteContext = React.createContext<Api>({
  state: { list: [] },
  methods: { toggle: () => {} },
});

const FavouriteProvider = ({ children }: Props) => {
  const [list, setList] = React.useState<string[]>([]);

  function handleToggle(id: string): void {
    setList(list =>
      list.includes(id)
        ? list.filter(favourite => favourite !== id)
        : list.concat(id)
    );
  }

  React.useEffect(() => {
    api.favourites.fetch().then(setList);
  }, []);

  React.useEffect(() => {
    api.favourites.update(list);
  }, [list]);

  return (
    <FavouriteContext.Provider
      value={{
        state: { list },
        methods: { toggle: handleToggle },
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export { FavouriteContext as default, FavouriteProvider };
