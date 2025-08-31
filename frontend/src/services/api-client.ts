import axios, { AxiosRequestConfig } from "axios"

const BASE_URL = "https://api.themoviedb.org/3";
const api_key = "17927fc242e173b0e72abd101fafbec3"


export interface fetchResponse<T> { 
  [key: string]:  T[];
}

export interface fetchMovieResponse<T>{
  results: T[];
  total_pages: number;

}

export interface searchBackendMovie{
  recommendation: number[]
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzkyN2ZjMjQyZTE3M2IwZTcyYWJkMTAxZmFmYmVjMyIsIm5iZiI6MTcyNjA2Mzg2NC41MDEzNDIsInN1YiI6IjY2YzUzMjkzZDkwMDdiODBlNzM5NmFkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D6wrcSJDGlJf1t7qoh90sWXZlnbOthapoxiy5PNPjcY'
  }

})

const backendAxios = axios.create({
  baseURL: "http://127.0.0.1:8000", 
})


class APIClient<T>{
  endpoint: string
  dataKey: string

  constructor(endpoint:string, dataKey:string){
    this.endpoint = endpoint;
    this.dataKey = dataKey;
  }


  getAll = (config: AxiosRequestConfig)=>{
    return axiosInstance.get<fetchResponse<T>>(this.endpoint, config).then(res=>res.data[this.dataKey])
  }
}


export class APIClientMovie<T>{
    endpoint: string

   constructor(endpoint:string){
    this.endpoint = endpoint;
    
  }


  getAll = (config: AxiosRequestConfig)=>{
    return axiosInstance.get<fetchMovieResponse<T>>(this.endpoint, config).then(res=>res.data)
  }

  get = (id:string | undefined)=> {
    return axiosInstance.get<T>(this.endpoint + '/' + id).then(res=>res.data)
  }

}



export class APIClientSearch{
  endpoint: string

  constructor(endpoint:string){
    this.endpoint = endpoint
  }

  search = (query: String, config?: AxiosRequestConfig) =>{
    return backendAxios.get<searchBackendMovie>(`${this.endpoint}`, {params: {query}, ...config}). then((res) => res.data);
  }
  
}




export default APIClient;

