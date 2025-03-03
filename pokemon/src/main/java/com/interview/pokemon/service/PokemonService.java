package com.interview.pokemon.service;

import com.interview.pokemon.client.GetPokemonClient;
import com.interview.pokemon.model.Pokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.stream.IntStream;

@Service
public class PokemonService {

    @Autowired
    private GetPokemonClient getPokemonClient;

    public ArrayList<Pokemon> getPokemon() {
        ArrayList<Integer> getRandomPokeIndex = getRandomNumber();
        ArrayList<Pokemon> pokeArray = new ArrayList<>();
        Random random= new Random();
        List<CompletableFuture<Pokemon>> futures =
                IntStream.rangeClosed(0, 3)
                        .mapToObj(index -> CompletableFuture.supplyAsync(() -> getPokemonClient.getPokemon(getRandomPokeIndex.get(index))))
                        .toList();

        pokeArray.addAll(futures.stream()
                .map(CompletableFuture::join)
                .toList());

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
