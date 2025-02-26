package com.interview.pokemon.model;

public class Pokemon {
    private Long id;
    private String name;
    private String image;


    public Pokemon(Long id, String name, String image) {
        this.name = name;
        this.id = id;
        this.image = image;
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
}
