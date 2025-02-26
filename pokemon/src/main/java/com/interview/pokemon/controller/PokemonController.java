package com.interview.pokemon.controller;

import com.interview.pokemon.model.Pokemon;
import com.interview.pokemon.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class PokemonController {

    @Autowired
    private PokemonService pokemonService;

    @GetMapping("/whos-that")
    public ArrayList<Pokemon> WhoIsThatPokemon() {
        return pokemonService.getPokemon();
    }

}
