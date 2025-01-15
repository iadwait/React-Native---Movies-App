import axios from "axios";
import { apiKey } from "../Constants/constants";

// Endpoints
const baseURL = 'https://api.themoviedb.org/3'
const trendingMoviesURL = `${baseURL}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesURL = `${baseURL}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesURL = `${baseURL}/movie/top_rated?api_key=${apiKey}`

export const image500 = path=> path? `https://image.tmdb.org/t/p/w500/${path}`: null
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342/${path}`: null
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185/${path}`: null

export const getImage500Path = (path) => {
    if (path) {
        return `https://image.tmdb.org/t/p/w500/${path}`
    } else {
        return null
    }
}

export const getImage185Path = (path) => {
    if (path) {
        return `https://image.tmdb.org/t/p/w185/${path}`
    } else {
        return null
    }
}

const apiCall = async (endpoint, params)=> {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data
    } catch (error) {
        console.log('error', error)
        const errorMessage = error.errorMessage || "Something went wrong please try again later"
        return {error: errorMessage}
    }

}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesURL)
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesURL)
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesURL)
}