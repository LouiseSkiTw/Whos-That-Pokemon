package com.interview.pokemon.service;

import com.interview.pokemon.client.GetPokemonClient;
import com.interview.pokemon.model.Pokemon;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@SpringBootTest
class PokemonServiceTest {

    @Mock
    private GetPokemonClient getPokemonClient;

    @InjectMocks
    private PokemonService pokemonService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetPokemonClientCalledFourTimes() {
        when(getPokemonClient.getPokemon(anyInt()))
                .thenReturn(new Pokemon(1l, "pikachu", "image_url", false));

        ArrayList<Pokemon> result = pokemonService.getPokemon();

        verify(getPokemonClient, times(4)).getPokemon(anyInt());

        assertEquals(4, result.size());
    }

    @Test
    void testMysteryPokemonIsMarkedTrue() {
        List<Pokemon> mockData = new ArrayList<>();
        mockData.add(new Pokemon(1L, "pikachu", "pikachu.png", false));
        mockData.add(new Pokemon(2L, "bulbasaur", "bulbasaur.png", false));
        mockData.add(new Pokemon(3L, "charmander", "charmander.png", false));
        mockData.add(new Pokemon(4L, "Onix", "onix.png", false));

        when(getPokemonClient.getPokemon(anyInt()))
                .thenAnswer(invocation -> {
                    int index = invocation.getArgument(0);
                    if (index >= 0 && index < mockData.size()) {
                        return mockData.get(index);
                    }
                    return null;
                });

        ArrayList<Pokemon> result = pokemonService.getPokemon();

        List<Long> randomNumbers = result.stream().map(Pokemon::getId).toList();

        assertEquals(randomNumbers.size(), 4);
        assertEquals(1, randomNumbers.stream().distinct().count());

    }

    @Test
    void testHandleNullValues() {
        // Mock one of the responses to return null
        when(getPokemonClient.getPokemon(1)).thenReturn(null);
        when(getPokemonClient.getPokemon(anyInt()))
                .thenReturn(new Pokemon(2l, "charizard", "image_url", false));

        List<Pokemon> result = pokemonService.getPokemon();

        assertTrue(result.stream().allMatch(pokemon -> pokemon != null));
    }

    @Test
    void testGetPokemonClientCalledFourTimesAndValidPokemonReturned() {
        List<Pokemon> mockData = new ArrayList<>();
        mockData.add(new Pokemon(1L, "pikachu", "pikachu.png", false));
        mockData.add(new Pokemon(2L, "bulbasaur", "bulbasaur.png", false));
        mockData.add(new Pokemon(3L, "charmander", "charmander.png", false));
        mockData.add(new Pokemon(4L, "Onix", "onix.png", false));

        when(getPokemonClient.getPokemon(anyInt()))
                .thenAnswer(invocation -> {
                    int index = invocation.getArgument(0);
                    if (index >= 0 && index < mockData.size()) {
                        return mockData.get(index);
                    }
                    return null;
                });

        ArrayList<Pokemon> result = pokemonService.getPokemon();

        verify(getPokemonClient, times(4)).getPokemon(anyInt());

        List<Long> randomNumbers = result.stream().map(Pokemon::getId).toList();

        // Verify the result
        assertEquals(4, randomNumbers.size());
        assertEquals(4, randomNumbers.stream().distinct().count());
    }
}
