import * as React from 'react';

import { Gif } from '../types';
import api from '../resources';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: null,
};

interface Props {
  children: React.ReactNode;
}

interface State {
  list: Gif[];
  isLoading: boolean;
  error: string | null;
}

interface Methods {
  search: (criteria: string) => Promise<string | Gif[]>;
}

interface Api {
  state: State;
  methods: Methods;
}

type Action =
  | {
      type: 'SEARCH_STARTED';
    }
  | {
      type: 'SEARCH_RESOLVED';
      payload: Gif[];
    }
  | {
      type: 'SEARCH_REJECTED';
      payload: string;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SEARCH_STARTED':
      return {
        ...INITIAL_STATE,
        isLoading: true,
      };

    case 'SEARCH_RESOLVED':
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };

    case 'SEARCH_REJECTED':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

const SearchContext = React.createContext<Api>({
  state: INITIAL_STATE,
  methods: {
    search: () => Promise.resolve([]),
  },
});

const SearchProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  function onSearchResolved(list: Gif[]): Gif[] {
    dispatch({ type: 'SEARCH_RESOLVED', payload: list });

    return list;
  }

  function onSearchRejected(error: string): string {
    dispatch({ type: 'SEARCH_REJECTED', payload: error });

    return error;
  }

  function handleSearch(criteria: string): Promise<string | Gif[]> {
    dispatch({ type: 'SEARCH_STARTED' });

    return api
      .search(criteria)
      .then(onSearchResolved)
      .catch(onSearchRejected);
  }

  return (
    <SearchContext.Provider
      value={{
        state,
        methods: { search: handleSearch },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext as default, SearchProvider };
