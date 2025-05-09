package com.interview.pokemon.controller;

import com.interview.pokemon.model.Pokemon;
import com.interview.pokemon.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/pokemon")
@CrossOrigin
public class PokemonController {

    @Autowired
    private PokemonService pokemonService;

    @GetMapping("/getPokemon")
    public ArrayList<Pokemon> whoIsThatPokemon() {
        ArrayList<Pokemon> pokemon = pokemonService.getPokemon();
        if(pokemon.isEmpty()) {ResponseEntity.badRequest();
        }
        return ResponseEntity.ok(pokemon).getBody();
    }

}
