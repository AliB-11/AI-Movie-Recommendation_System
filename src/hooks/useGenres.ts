import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import APIClient from "../services/api-client";


export interface GenreObjects{
  id: number, 
  name: string
}

interface fetchGenresResponse{ 
  genres: GenreObjects[]
}

const apiClient = new APIClient<GenreObjects>('/genre/movie/list', 'genres')

const delay = (ms:number) => new Promise( resolve => setTimeout(resolve, ms));

const useGenres = () => useQuery<GenreObjects[]>({
  queryKey:['genres'],
  queryFn: apiClient.getAll,
  staleTime: 24*60*60*1000, //24hrs
  initialData: genres,
})
 

export default useGenres





// const [data, setData] = useState<GenreObjects[]>([]);
  // const [error, setError] = useState("");
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   const controller = new AbortController(); 
  //   setLoading(true);
    
  //   apiClient
  //     .get<fetchGenresResponse>("/genre/movie/list",  { signal: controller.signal })
  //     .then((res) => {setData(res.data.genres); 
  //       delay(900).then(() => setLoading(false))
        
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) 
  //         return;
  //       setError(err.message);
  //       setLoading(false);
  //     });

  //     return () => controller.abort();
  // }, []);

  // return {data, error, isLoading}