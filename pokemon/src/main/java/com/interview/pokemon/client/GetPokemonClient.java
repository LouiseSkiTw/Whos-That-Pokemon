package com.interview.pokemon.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interview.pokemon.model.Pokemon;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class GetPokemonClient {

    private static final String API_URL = "https://pokeapi.co/api/v2/pokemon/35";

    public Pokemon getPokemon() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String jsonResponse = response.body();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(jsonResponse);

            return mapResponseToObject(rootNode, jsonResponse);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    private Pokemon mapResponseToObject(JsonNode rootNode, String jsonResponse) {
        Pokemon pokemon = new Pokemon();
        pokemon.setId(rootNode.path("id").asLong());
        pokemon.setName(rootNode.path("name").asText());
        pokemon.setImage(rootNode.path("sprites").path("front_default").asText());
        return pokemon;
    }
}