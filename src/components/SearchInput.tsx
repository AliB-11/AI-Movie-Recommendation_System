import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import useMovieQueryStore from "../store";

const SearchInput = () => {
  const { movieQuery, setSearchText } = useMovieQueryStore();

  // Local state for typing
  const [localSearch, setLocalSearch] = useState(movieQuery.searchText || "");

  // Sync local input with store when searchText changes (e.g., cleared by genre/sort)
  useEffect(() => {
    setLocalSearch(movieQuery.searchText || "");
  }, [movieQuery.searchText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchText(localSearch.trim() || undefined);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          borderRadius={20}
          placeholder=" Search movies..."
        />
        <InputLeftElement children={<BsSearch />} />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
