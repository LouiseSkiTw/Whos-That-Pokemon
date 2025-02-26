import axios from "axios";
const BASE_URL = 'http://localhost:8080/pokemon'
const getPokemon = () => {
    const value = axios.get(BASE_URL+'/getAll/').then(response => {
        console.log(response)
        return response.data});
    return value;
}

export {getPokemon};