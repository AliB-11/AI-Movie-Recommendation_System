// import apiClient from "../services/api-client";
// import { useEffect, useState } from "react";
// import { AxiosRequestConfig, CanceledError } from "axios";

// interface fetchResponse<T>{ 
//   results: T[]
// }


// const delay = (ms:number) => new Promise( resolve => setTimeout(resolve, ms));

// const useData = <T>(endpoint:string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
 
//   const [data, setData] = useState<T[]>([]);
//   const [error, setError] = useState("");
//   const [isLoading, setLoading] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController(); 
//     setLoading(true);
    
//     apiClient
//       .get<fetchResponse<T>>(endpoint,  { signal: controller.signal, ...requestConfig})
//       .then((res) => {setData(res.data.results); 
//         delay(1100).then(() => setLoading(false))
        
//       })
//       .catch((err) => {
//         if (err instanceof CanceledError) 
//           return;
//         setError(err.message);
//         setLoading(false);
//       });

//       return () => controller.abort();
//   }, deps? [...deps] : []);

//   return {data, error, isLoading}

// }

// export default useData