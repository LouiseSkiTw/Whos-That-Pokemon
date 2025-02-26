package com.interview.pokemon.service;

import com.interview.pokemon.model.Pokemon;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PokemonService {

    public ArrayList<Pokemon> getPokemon() {
        ArrayList<Pokemon> pokeArray = new ArrayList<>();
        Pokemon poke = new Pokemon(1l, "balbusar", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png");
        pokeArray.add(poke);
        return pokeArray;
    }
}
