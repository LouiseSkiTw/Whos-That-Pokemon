import { Button, Card, Spinner } from "react-bootstrap";
import useGetPokemon from "../../hooks/useGetPokemon";
import cx from 'classnames'
import React from "react";
import './Game.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import { capitalizeFirstLetter } from "../../utils/utils";
import { useHistory } from "react-router-dom";


// Fix Spinner
// Add colours for pass and fail
// Loop for 10, display result

const Game = () => {
    const [hasSelectedResponse, setHasSelectedResponse] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [round, setRound] = React.useState(1);
    const [optionSelection, setOptionSelection] = React.useState<{name: string, index: number}>();
    const [submit, setSubmitted] = React.useState(false);
    const [nextGame, setNextGame] = React.useState(false);

    const history = useHistory();
    
    const { data, isLoading, error } = useGetPokemon(nextGame);
    const mysteryPokemon = data.find(pokemon => pokemon.isMysteryPokemon === true) || data.at(0);

    console.log(mysteryPokemon)
    const pokemonFound = optionSelection?.name === mysteryPokemon?.name;
    
    const displaySilhouette = !submit ? cx("img", "silhouette") : cx("img", "show");
    
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
        setRound(round + 1);

        //react hook here
    }

const getStyleArray = (index:number, value:string) => {
    const getElement = value == mysteryPokemon?.name
    const userSelectionIndex = optionSelection?.index === index;
    let styleArray = ["option"];
    if (!submit && userSelectionIndex){
        styleArray.push("selected");
    }
    if(submit && getElement ){
        styleArray.push("success")
    }

    if(submit && !pokemonFound && userSelectionIndex) {
        styleArray.push("fail")
    }

    return cx(styleArray); 
}

const displayMysteryPokemon = <Card.Img className={displaySilhouette} src={mysteryPokemon?.image} />
const displayLoading = (
    <div className="spinner_container">
        <Spinner className="spinner" animation="border"/>
    </div>
);
const displayOptions = () => (
    (<div>
        {data && data.map((value,index) =>
            <Card.Title
                key={value.id}
                className={getStyleArray(index, value.name)}
                onClick={() => {
                    setOptionSelection({name: value.name, index});
                    setHasSelectedResponse(!hasSelectedResponse);
                }}
            >
            {capitalizeFirstLetter(value.name)}
            </Card.Title>
        )}
    </div>)
)

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            {data && data.length > 0 && round < 10 &&
                <>
                    <div>
                        <h4 className="score">Score: {score}/10</h4>
                    </div>
                    <Card className="game">
                        <Card.Title className="title">Who's That Pokemon?</Card.Title>
                        {isLoading ? displayLoading : displayMysteryPokemon}
                            {<div className="questions">
                                {displayOptions()}
                            </div>}
                    {!submit && <Button className="button" disabled={!hasSelectedResponse} onClick={() => onClickCheckResult()}>Submit</Button>}
                    {submit && <Button className="button" onClick={() => onClickNextGame()}>Next</Button>}
                    </Card>
                </>
            }
            {round ==  10 && <Card className="container">
                <Card.Text>Your Score was {score}/10</Card.Text>
                <Button onClick={() => history.push('/')} >Back to Home</Button>
                <Button onClick={() => window.location.reload()} >Try Again</Button>
            </Card>}
        </div>
    )
}

export default Game;