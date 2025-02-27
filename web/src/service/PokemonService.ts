import axios from "axios";
export const BASE_URL = 'http://localhost:8080/pokemon'
const getPokemon = async() => {
    const value = await axios.get(BASE_URL+'/getAll').then(response => response.data);
    return value;
}

export {getPokemon};