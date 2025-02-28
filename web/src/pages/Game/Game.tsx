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
    const [optionSelection, setOptionSelection] = React.useState<string>();
    const [submit, setSubmitted] = React.useState(false);
    const [nextGame, setNextGame] = React.useState(false);

    const displaySilhouette = !submit ? cx("img", "silhouette") : cx("img");

    const { data, isLoading, error } = useGetPokemon();


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

    }, [nextGame]);

    const onClickCheckResult = () => {
        if (data && data[randomPokemonIndex].name == optionSelection) {
            setScore(score + 1);
        }
        setHasSelectedResponse(!hasSelectedResponse);
        setSubmitted(!submit)
    }

    const onClickNextGame = () => {
        setNextGame(!nextGame)
        setSubmitted(!submit)
        setHasSelectedResponse(!hasSelectedResponse)
    }
    // {data && selectedNumbers.map((value, index) => {
    //     let styleArray = ["options"];
    //     const pokemonFound = data[randomPokemonIndex].name == optionSelection.name ? "success" : "fail";
    //     if (index == optionSelection.index) {
    //         styleArray.push(pokemonFound)
    //     }
    //     return (<Card.Title
    //         key={data[value].id}
    //         className={cx("options")}
    //         onClick={() => {
    //             setOptionSelection({
    //                 name: data[value].name,
    //                 index: index,
    //             });
    //             setHasSelectedResponse(!hasSelectedResponse);
    //             styleArray.push("selected")
    //         }}
    //     >
    //         {capitalizeFirstLetter(data[value].name)}
    //     </Card.Title>
    //     )
    // }
    // )}
// </div>

const displayOptions = () => (
    <div className="question">
        {data && selectedNumbers.map(value =>
            <Card.Title
                key={data[value].id}
                className="option"
                onClick={() => {
                    setOptionSelection(data[value].name);
                    setHasSelectedResponse(!hasSelectedResponse);
                }}
            >
            {capitalizeFirstLetter(data[value].name)}
            </Card.Title>
        )}
    </div>
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