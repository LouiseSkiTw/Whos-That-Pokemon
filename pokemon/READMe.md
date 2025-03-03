# Getting Started
- Before running, ensure that all dependencies are download by running gradle from the IDE

# Project Struture
- Controller
  - Where the requests mapping happens
- Service 
  - Where the logic for the service is created
- Model 
  - Where the POJO's are stored
- Client 
  - Endpoints for the internal/external services


# How To Run
- To launch, navigate over to `pokemon/src/main/java/PokemonApplication`
- Click the green play button next to PokemonApplication

# About
- This covers the backend side of the 'Who's that Pokemon' Game
- The service is reached a `getPokemon` this will return the Array of 4 pokemon, one which is the correct answer and 3 decoys
- The service randomly generates 4 random numbers which are the pokemon index to which will be fetched. These numbers cannot be the same
- Then calls the API asynchronously using CompletableFuture to fetch the data using the random generated numbers
- Then collects the information for once all calls are completed
- The service selects one of the options, using the index as the mystery pokemon and sets that value to true
- The service returns an array of the `Pokemon` Object
  - Id - Long 
  - Name - String
  - Image - String
  - mysteryPokemon - boolean
- If no data is present then the service will throw an error back to the frontend.

- Example
```
  [
    {
        "id": 45,
        "name": "vileplume",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png",
        "mysteryPokemon": false
    },
    {
        "id": 42,
        "name": "golbat",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png",
        "mysteryPokemon": false
    },
    {
        "id": 25,
        "name": "pikachu",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        "mysteryPokemon": false
    },
    {
        "id": 48,
        "name": "venonat",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png",
        "mysteryPokemon": true
    }
]
```

# API
- In this application, we use the [PokeAPI](https://pokeapi.co) and the [Pokemon](https://pokeapi.co/docs/v2#pokemon) endpoint to fetch the data.
- The API takes in an index in which to fetch the data
- It returns many attributes
- Required attributes:
  - Id: Id of Pokemon
  - Name: The name which will be displayed as the option
  - Image: The image i which the user will need to guess
