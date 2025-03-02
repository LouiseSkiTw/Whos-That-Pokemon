package com.interview.pokemon.service;

import com.interview.pokemon.client.GetPokemonClient;
import com.interview.pokemon.model.Pokemon;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@SpringBootTest
public class PokemonServiceTest {

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
            // Spy on the service
            PokemonService spyService = Mockito.spy(pokemonService);

            // Mock the getRandomNumber() method to return controlled indices (to match mock data)
            doReturn(new ArrayList<>(List.of(0, 1, 2, 3))).when(spyService).getRandomNumber();

            // Mock data
            List<Pokemon> mockData = new ArrayList<>();
            mockData.add(new Pokemon(1L, "pikachu", "pikachu.png", false));
            mockData.add(new Pokemon(2L, "bulbasaur", "bulbasaur.png", false));
            mockData.add(new Pokemon(3L, "charmander", "charmander.png", false));
            mockData.add(new Pokemon(4L, "Onix", "onix.png", false));

            // Mock getPokemonClient to return the correct Pokémon for each index
            when(getPokemonClient.getPokemon(anyInt()))
                    .thenAnswer(invocation -> {
                        int index = invocation.getArgument(0);
                        if (index >= 0 && index < mockData.size()) {
                            return mockData.get(index);
                        }
                        return null; // Return null for invalid indices
                    });

            // Call the method under test
            ArrayList<Pokemon> result = spyService.getPokemon();

            // Extract IDs for validation
            List<Long> randomNumbers = result.stream().map(Pokemon::getId).toList();
            System.out.println("Random Numbers: " + randomNumbers);

            // Validate the results
            assertEquals(4, result.size());
            assertEquals(4, randomNumbers.stream().distinct().count()); // Verify all IDs are distinct

            // Verify that one Pokémon is set as the mystery Pokémon
            long mysteryCount = result.stream().filter(Pokemon::isMysteryPokemon).count();
            assertEquals(1, mysteryCount);

            // Verify that getPokemonClient.getPokemon() was called 4 times
            verify(getPokemonClient, times(4)).getPokemon(anyInt());

            // Verify that getRandomNumber() was called exactly once
            verify(spyService, times(1)).getRandomNumber();
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
        // Spy on the service
        PokemonService spyService = Mockito.spy(pokemonService);

        // Mock the getRandomNumber() method to return controlled indices (to match mock data)
        doReturn(new ArrayList<>(List.of(0, 1, 2, 3))).when(spyService).getRandomNumber();

        // Mock data
        List<Pokemon> mockData = new ArrayList<>();
        mockData.add(new Pokemon(1L, "pikachu", "pikachu.png", false));
        mockData.add(new Pokemon(2L, "bulbasaur", "bulbasaur.png", false));
        mockData.add(new Pokemon(3L, "charmander", "charmander.png", false));
        mockData.add(new Pokemon(4L, "Onix", "onix.png", false));

        // Mock getPokemonClient to return the correct Pokémon for each index
        when(getPokemonClient.getPokemon(anyInt()))
                .thenAnswer(invocation -> {
                    int index = invocation.getArgument(0);
                    if (index >= 0 && index < mockData.size()) {
                        return mockData.get(index);
                    }
                    return null; // Return null for invalid indices
                });

        // Call the method under test
        ArrayList<Pokemon> result = spyService.getPokemon();

        verify(getPokemonClient, times(4)).getPokemon(anyInt());

        List<Long> randomNumbers = result.stream().map(Pokemon::getId).toList();

        // Verify the result
        assertEquals(4, randomNumbers.size());
        assertEquals(4, randomNumbers.stream().distinct().count());
    }
}
