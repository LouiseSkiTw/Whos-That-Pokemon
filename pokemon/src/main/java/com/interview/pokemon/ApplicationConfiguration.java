package com.interview.pokemon;

import com.interview.pokemon.client.GetPokemonClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
public class ApplicationConfiguration {
    @Bean
    public GetPokemonClient getPokemonClient() {
        return new GetPokemonClient();
    }
}
