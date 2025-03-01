import { Button, Card, Row, Spinner } from "react-bootstrap";
import useGetPokemon from "../../hooks/useGetPokemon";
import cx from 'classnames'
import React from "react";
import './Game.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import { capitalizeFirstLetter } from "../../utils/utils";
import Columns from "../../components/Columns";
import Column from "../../components/Column";
import EndGame from "../../components/EndGame";


// Fix Spinner

const Game = () => {
    const [hasSelectedResponse, setHasSelectedResponse] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [round, setRound] = React.useState(1);
    const [optionSelection, setOptionSelection] = React.useState<{ name: string, index: number }|undefined>();
    const [submit, setSubmitted] = React.useState(false);
    const [nextGame, setNextGame] = React.useState(false);

    const { data, isLoading, error } = useGetPokemon(nextGame);

    const mysteryPokemon = data.find(pokemon => pokemon.isMysteryPokemon === true) || data.at(0);
    const pokemonFound = optionSelection?.name === mysteryPokemon?.name;

    const onClickCheckResult = () => {
        if (data && pokemonFound) {
            setScore(score + 1);
        }
        setSubmitted(!submit);
    };

    const onClickNextGame = () => {
        setSubmitted(!submit);
        setHasSelectedResponse(!hasSelectedResponse);
        setNextGame(!nextGame);
        setRound(round + 1);
        setOptionSelection(undefined);
    };

    const getStyleArray = (index: number, value: string) => {
        const getElement = value == mysteryPokemon?.name;
        const userSelectionIndex = optionSelection?.index === index;
        let styleArray = ["option"];
        if (!submit && userSelectionIndex) {
            styleArray.push("selected");
        }
        if (submit && getElement) {
            styleArray.push("success")
        }
        if (submit && !pokemonFound && userSelectionIndex) {
            styleArray.push("fail")
        }
        return cx(styleArray);
    };

    const displaySilhouette = !submit ? "silhouette" : "show";

    const displayMysteryPokemon = (
        <div className="img">
            <Card.Img className={displaySilhouette} src={mysteryPokemon?.image} alt={mysteryPokemon?.name}/>
        </div>
    );

    const displayLoading = (
        <div className="spinner_container" role="status">
            <Spinner className="spinner" animation="border" />
        </div>
    );
    const displayOptions = (
        <div className="options">
            {data && data.map((value, index) =>
                <Card.Title
                    key={value.id}
                    className={getStyleArray(index, value.name)}
                    onClick={() => {
                        setOptionSelection({ name: value.name, index });
                        setHasSelectedResponse(!hasSelectedResponse);
                    }}
                >
                    {capitalizeFirstLetter(value.name)}
                </Card.Title>
            )}
            {!submit && <Button className="button_submit" disabled={!hasSelectedResponse} onClick={() => onClickCheckResult()}>Submit</Button>}
            {submit && <Button className="button_submit" onClick={() => onClickNextGame()}>Next</Button>}
        </div>
    )

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="game_container">
            {round < 10 &&
                <>
                    <Card className="game">
                        <div className="header">
                            <h4 className="score">Score: {score}/10</h4>
                            <Card.Text className="title">Who's That Pokemon?</Card.Text>
                        </div>
                        <div className="game_play">
                        <Row>
                            <Columns>
                                <Column>
                                    {isLoading ? displayLoading : displayMysteryPokemon}
                                </Column>
                                <Column>
                                    {displayOptions}
                                </Column>
                            </Columns>
                        </Row>
                        </div>
                    </Card>
                </>
            }
            {round == 10 && (<EndGame score={score} />)}
        </div >
    )
}

export default Game;