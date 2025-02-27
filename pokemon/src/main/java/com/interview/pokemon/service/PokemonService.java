package com.interview.pokemon.service;

import com.interview.pokemon.client.GetPokemonClient;
import com.interview.pokemon.model.Pokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PokemonService {

    @Autowired
    private GetPokemonClient getPokemonClient;

    public ArrayList<Pokemon> getPokemon() {
        ArrayList<Pokemon> pokeArray = new ArrayList<>();
        pokeArray.add(getPokemonClient.getPokemon());
        System.out.println(pokeArray);
        return pokeArray;
    }

}
