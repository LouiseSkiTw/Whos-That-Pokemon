import axios from "axios";
import { Pokemon } from "./PokemonService.interface";
const BASE_URL = 'localhost:8080/pokemon/'
const getPokemon = ():Promise<Pokemon> => {
    return axios.get(BASE_URL+'getAll/')
}

export {getPokemon}