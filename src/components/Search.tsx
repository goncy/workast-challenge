import * as React from 'react';

interface Props {
  onSearch: (string) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
  const [criteria, setCriteria] = React.useState('');

  function handleCriteria(event: React.ChangeEvent<HTMLInputElement>) {
    setCriteria(event.target.value);
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSearch(criteria);
  }

  return (
    <form onSubmit={handleSearch}>
      <input type="text" onChange={handleCriteria} />
      <input type="submit" />
    </form>
  );
};

export default Search;
