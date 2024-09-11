import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3";
const api_key = "17927fc242e173b0e72abd101fafbec3"

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzkyN2ZjMjQyZTE3M2IwZTcyYWJkMTAxZmFmYmVjMyIsIm5iZiI6MTcyNjA2Mzg2NC41MDEzNDIsInN1YiI6IjY2YzUzMjkzZDkwMDdiODBlNzM5NmFkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D6wrcSJDGlJf1t7qoh90sWXZlnbOthapoxiy5PNPjcY'
  }

})
