import { Button, Card, Spinner } from "react-bootstrap";
import useGetPokemon from "../../hooks/useGetPokemon";
import cx from 'classnames'
import React from "react";
import './Game.scss'
import { capitalizeFirstLetter, getRandomNumber } from "../../utils/utils";


// Fix Spinner
// Add colours for pass and fail
// Loop for 10, display result

const Game = () => {
    const [hasSelectedResponse, setHasSelectedResponse] = React.useState(false);
    const [selectedNumbers, setSelectedNumbers] = React.useState<number[]>([])
    const [randomPokemonIndex, setRandomPokemonIndex] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [optionSelection, setOptionSelection] = React.useState<{name: string, index: number}>();
    const [submit, setSubmitted] = React.useState(false);
    const [nextGame, setNextGame] = React.useState(false);

    
    const displaySilhouette = !submit ? cx("img", "silhouette") : cx("img");
    
    const { data, isLoading, error } = useGetPokemon();
    const pokemonFound = optionSelection?.name === data[randomPokemonIndex]?.name;


    React.useEffect(() => {
        let newSelectedNumbers = [...selectedNumbers]; // Start with the current array
        for (let index = 0; newSelectedNumbers.length < 4; index++) {
            const randomNumber = getRandomNumber();
            if (!newSelectedNumbers.includes(randomNumber)) {
                newSelectedNumbers.push(randomNumber);
            }
        }
        setSelectedNumbers(newSelectedNumbers); // Update state after array is built
        const randomIndex = newSelectedNumbers[Math.floor(Math.random() * newSelectedNumbers.length)];
        setRandomPokemonIndex(randomIndex);
        setNextGame(false);
    }, [nextGame === true]);

    const onClickCheckResult = () => {
        if (data && pokemonFound) {
            setScore(score + 1);
        }
        setSubmitted(!submit);
    }

    const onClickNextGame = () => {
        setSubmitted(!submit);
        setHasSelectedResponse(!hasSelectedResponse);
        setNextGame(!nextGame);
        setRandomPokemonIndex(0);
        setSelectedNumbers([]);     

    }



const getStyleArray = (index:number, value:number) => {
    const getElement = value == randomPokemonIndex;
    const userSelectionIndex = optionSelection?.index === index;
    const styleArray = ["option"];
    if (!submit && userSelectionIndex){
        styleArray.push("selected");
    }
    if(submit && pokemonFound && getElement){
        styleArray.push("sucesses")
    }

    if(submit && !pokemonFound && userSelectionIndex) {
        styleArray.push("fail")
    }

    return cx(styleArray); 
}
const displayOptions = () => (
    (<div className="question">
        {data && selectedNumbers.map((value,index) =>
            <Card.Title
                key={data[value].id}
                className={getStyleArray(index, value)}
                onClick={() => {
                    setOptionSelection({name: data[value].name, index});
                    setHasSelectedResponse(!hasSelectedResponse);
                    getStyleArray(index, value)
                }}
            >
            {capitalizeFirstLetter(data[value].name)}
            </Card.Title>
        )}
    </div>)
)

    if (isLoading) return <div><Spinner animation="border" role="status">Loading...</Spinner></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            {data && data.length > 0 && score < 10 &&
                <>
                    <div>
                        <h4>Score: {score}/10</h4>
                    </div>
                    <Card className="game">
                        <Card.Title className="title">Who's That Pokemon?</Card.Title>
                        <Card.Img className={displaySilhouette} src={data[randomPokemonIndex].image} />
                        <Card.Body>
                            {<div className="questions">
                                {displayOptions()}
                            </div>}
                        </Card.Body>
                    </Card>
                    {!submit && <Button className="button" disabled={!hasSelectedResponse} onClick={() => onClickCheckResult()}>Submit</Button>}
                    {submit && <Button className="button" onClick={() => onClickNextGame()}>Next</Button>}
                </>
            }
            <Card>
                {score == 10 && <Card.Text>Your Score was {score}/10</Card.Text>}
            </Card>
        </div>
    )
}

export default Game;