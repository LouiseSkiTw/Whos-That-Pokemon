package com.interview.pokemon;

import com.interview.pokemon.controller.PokemonController;
import com.interview.pokemon.model.Pokemon;
import com.interview.pokemon.service.PokemonService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class PokemonControllerTest {

    @InjectMocks
    private PokemonController pokemonController;

    @Mock
    private PokemonService pokemonService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testWhoIsThatPokemonReturnsNonEmptyList() {
        // Mock data
        List<Pokemon> mockData = new ArrayList<>();
        mockData.add(new Pokemon(1L, "pikachu", "pikachu.png", false));
        mockData.add(new Pokemon(2L, "bulbasaur", "bulbasaur.png", false));

        when(pokemonService.getPokemon()).thenReturn(new ArrayList<>(mockData));

        ResponseEntity<List<Pokemon>> response = ResponseEntity.ok(pokemonController.whoIsThatPokemon());

        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertEquals("pikachu", response.getBody().get(0).getName());
        assertEquals("bulbasaur", response.getBody().get(1).getName());
    }

    @Test
    void testWhoIsThatPokemonReturnsBadRequestOnEmptyList() {
        when(pokemonService.getPokemon()).thenReturn(new ArrayList<>());
        ResponseEntity<List<Pokemon>> response = ResponseEntity.badRequest().body(pokemonController.whoIsThatPokemon());

        assertNotNull(response.getBody());
        assertTrue(response.getBody().isEmpty());
    }
}
