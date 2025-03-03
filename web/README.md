# About
- This repo covers the frontend side of the 'Who's that Pokemon Game'
- The game starts with the loading page where a button will start the game.
- When button is clicked the API is launched fetching the 4 options.
- The user selects one of the 4 options and the submit button will appear
- If the user does not select an option or if deselects current option the submit button will not appear
- Once the user selects an option and pressed 'Submit' then the Pokemon is uncovered and the correct option is given and the button for the next options is avaliable
- If the user guesses wrong, it will highlight the correct answer (green) and the wrong answer(red)
- Game will end when the number of rounds is 10
- Once 10 rounds are completed, the user will be given their score with an option to go back to home page or play again


# Getting Started
- To begin ensure that all dependencies are deployed
- To do so ensure that you are in the web folder then run `npm i`

# How To run
- Run the command `cd web` (only if on root package) then `npm run dev`
- Follow the link that is provided
- Default host is http://localhost:5173/

# API
- There is only one API for this game which is the 'getPokemon'. 
- It passes no arguments and returns an array of 4 options with 4 attributes in the response:
  - id - Id of the pokemon for reference
  - name - The name of the pokemon which will be selected as the options
  - Image - The image of the pokemon. Which will be displayed once the user submits their choice
  - mysteryPokemon: this is a boolean which determines which pokemon, the user is trying to guess.
  
- All are captured in the PokemonService.interface file
- The API should respond with an error if there is no results
- If no failure the API should return with the 4 options.

# Running Tests
- To run tests, not yet configured for individual packages
- on /web run `npm test`