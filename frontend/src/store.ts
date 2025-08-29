import { create } from "zustand";
import { Order } from "./components/Filter";
import { GenreObjects } from "./entities/GenreObjects";
import SearchInput from "./components/SearchInput";

export interface MovieQuery {
  genre?: GenreObjects;
  filter: Order;
  searchText?: string;
}

interface MovieQueryStore{
  movieQuery: MovieQuery;
  setGenre: (genre: GenreObjects) => void; 
  setSortOrder: (sortOrder:Order) => void;
  setSearchText: (searchText:string | undefined) => void; 
}


const useMovieQueryStore = create<MovieQueryStore>( set=> ({
  movieQuery: {filter:  { value: "popularity.desc", label: "Recently Popular" } },
  setGenre: (genre) => set(store => ({movieQuery: {...store.movieQuery, genre, searchText:undefined}})),
  setSortOrder: (sortOrder) => set(store => ({movieQuery: {...store.movieQuery, filter: sortOrder, searchText:undefined, genre:undefined}})),
  setSearchText: (searchText) => set(store => ({movieQuery: {...store.movieQuery, searchText}}))


}
))


export default useMovieQueryStore;