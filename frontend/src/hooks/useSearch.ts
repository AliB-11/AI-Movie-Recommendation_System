
import { useQuery } from "@tanstack/react-query";
import APIClient, { APIClientSearch } from "../services/api-client"

const apiClient = new APIClientSearch('/search');

const useSearch = (movieTitle: String, enabled: boolean=true) => useQuery({
  queryKey: ['backendSearch', movieTitle],
  queryFn: ()=> apiClient.search(movieTitle),
  enabled,
});


export default useSearch