package com.interview.pokemon.model;

public class Pokemon {
    private Long id;
    private String name;
    private String image;
    private boolean isMysteryPokemon;


    public Pokemon(Long id, String name, String image,boolean isMysteryPokemon) {
        this.name = name;
        this.id = id;
        this.image = image;
        this.isMysteryPokemon = isMysteryPokemon;
    }

    public Pokemon() {

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getImage() {
        return image;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isMysteryPokemon() {
        return isMysteryPokemon;
    }

    public void setMysteryPokemon(boolean mysteryPokemon) {
        isMysteryPokemon = mysteryPokemon;
    }
}
