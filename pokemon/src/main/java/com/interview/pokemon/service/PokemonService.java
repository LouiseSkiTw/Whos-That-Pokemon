package com.interview.pokemon.service;

import com.interview.pokemon.client.GetPokemonClient;
import com.interview.pokemon.model.Pokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Random;

@Service
public class PokemonService {

    @Autowired
    private GetPokemonClient getPokemonClient;

    public ArrayList<Pokemon> getPokemon() {
        ArrayList<Integer> getRandomPokeIndex = getRandomNumber();
        ArrayList<Pokemon> pokeArray = new ArrayList<>();
        Random random= new Random();
        int index = 0;
        while(index < 4) {
            Pokemon pokemon = getPokemonClient.getPokemon(getRandomPokeIndex.get(index));
            pokeArray.add(pokemon);
            index++;
        }
        int randomMysteryPokemon = random.nextInt(4);
        if(!pokeArray.isEmpty()) {
            pokeArray.get(randomMysteryPokemon).setMysteryPokemon(true);
        }
        return pokeArray;
    }

    protected ArrayList<Integer> getRandomNumber() {
        ArrayList<Integer> pokeIndex = new ArrayList<>();
        Random random = new Random();
        while (pokeIndex.size() < 4) {
            int randomNumber = random.nextInt(1,50);
            if (!pokeIndex.contains(randomNumber)) {
                pokeIndex.add(randomNumber);
            }
        }
        return pokeIndex;
    }

}
