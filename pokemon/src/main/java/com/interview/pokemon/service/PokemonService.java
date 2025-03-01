package com.interview.pokemon.service;

import com.interview.pokemon.client.GetPokemonClient;
import com.interview.pokemon.model.Pokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class PokemonService {

    @Autowired
    private GetPokemonClient getPokemonClient;

    public ArrayList<Pokemon> getPokemon() {
        ArrayList<Integer> getRandomPokeIndex = getRandomNumber();
        ArrayList<Pokemon> pokeArray = new ArrayList<>();
        Random random= new Random();

        for (int i = 0; i < 4; i++) {
            pokeArray.add(getPokemonClient.getPokemon(getRandomPokeIndex.get(i)));
        }
        int randomMysterPokemon = random.nextInt(3);
        pokeArray.get(randomMysterPokemon).setMysteryPokemon(true);
        return pokeArray;
    }

    private ArrayList<Integer> getRandomNumber() {
        ArrayList<Integer> pokeIndex = new ArrayList<>();
        Random random =  new Random();
        while(pokeIndex.size() < 4) {
            int randomNumber = random.nextInt(1,100);
            if(!pokeIndex.contains(randomNumber)){
                pokeIndex.add(randomNumber);
            }
        }
        return pokeIndex;
    }
}
