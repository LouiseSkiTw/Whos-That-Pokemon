import { Card, Spinner } from "react-bootstrap";
import useGetPokemon from "../../hooks/useGetPokemon";
import cx from 'classnames'
import React from "react";
import './Game.scss'
import { getRandomNumber } from "../../utils/getRandomNumber.utils";

const Game = () => {
    const { data, isLoading, error } = useGetPokemon();
    const [hasSelectedResponse, setHasSelectedResponse] = React.useState(false);
    const [selectedNumbers, setSelectedNumbers] = React.useState<number[]>([])
    const [randomPokemonIndex, setRandomPokemonIndex] = React.useState(0);
    const displaySilhouette = !hasSelectedResponse ? cx("card", "img", "silhouette") : cx("card", "img");

    React.useEffect(() => {
        let newSelectedNumbers = [...selectedNumbers]; // Start with the current array
        for (let index = 0; newSelectedNumbers.length < 4; index++) {
            const randomNumber = getRandomNumber();
            if(!newSelectedNumbers.includes(randomNumber)) {
                newSelectedNumbers.push(randomNumber);
            }
        }
        setSelectedNumbers(newSelectedNumbers); // Update state after array is built
        const randomIndex = newSelectedNumbers[Math.floor(Math.random()* newSelectedNumbers.length)];
        setRandomPokemonIndex(randomIndex);
        console.log(randomPokemonIndex);

    }, []);

    if (isLoading) return <div><Spinner animation="border" role="status">Loading...</Spinner></div>;
    if (error) return <div>Error: {error}</div>;

    const displayOptions = () => (
        <div className="question">
            {selectedNumbers.map(value =>
                <Card.Title className="option" onClick={() => setHasSelectedResponse(!hasSelectedResponse)}>{data && data[value].name}</Card.Title>
            )}
        </div>
    )

    return (
        <div className="container">
            <Card>
                {data && <Card.Img className={displaySilhouette} src={data[selectedNumbers[0]].image} />}
                <Card.Title className="title">Who's That Pokemon?</Card.Title>
                <Card.Body>
                    <div className="questions">
                        {displayOptions()}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Game;