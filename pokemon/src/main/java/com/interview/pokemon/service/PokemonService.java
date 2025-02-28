package com.interview.pokemon.service;

import com.interview.pokemon.client.GetPokemonClient;
import com.interview.pokemon.model.Pokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class PokemonService {

    @Autowired
    private GetPokemonClient getPokemonClient;

    public ArrayList<Pokemon> getPokemon() {
        ArrayList<Pokemon> pokeArray = new ArrayList<>();
        List<CompletableFuture<Pokemon>> futures =
                IntStream.rangeClosed(1, 50)
                        .mapToObj(index -> CompletableFuture.supplyAsync(() -> getPokemonClient.getPokemon(index)))
                        .collect(Collectors.toList());

        // Wait for all futures to complete and collect results
        pokeArray.addAll(futures.stream()
                .map(CompletableFuture::join) // Join to get the result of each future
                .collect(Collectors.toList()));

        return pokeArray;
    }

}
