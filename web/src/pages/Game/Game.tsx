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
    const { data, isLoading, error } = useGetPokemon();
    const [hasSelectedResponse, setHasSelectedResponse] = React.useState(false);
    const [selectedNumbers, setSelectedNumbers] = React.useState<number[]>([])
    const [randomPokemonIndex, setRandomPokemonIndex] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [svgContent, setSvgContent] = React.useState<string>();
    const displaySilhouette = !hasSelectedResponse ? cx("img", "silhouette") : cx("img");

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
    }, [hasSelectedResponse]);

    const loadSvg = async (url: string): Promise<string | undefined> => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return await response.text(); // Returns the fetched SVG content as a string
        } catch (error) {
          console.error("Error loading SVG:", error);
          return url; // Return undefined in case of failure
        }
      };

    React.useEffect(() => {
        const fetchAndSetSvg = async () => {
            if(data) {
                const svgData = await loadSvg(data[randomPokemonIndex].image);
                if (svgData) {
                    const encodedSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData.replace(/^<\?xml.*\?>\s*/, ""))}`;
                    setSvgContent(encodedSvg);
                }
            }
          };
      
          fetchAndSetSvg();
    }, [randomPokemonIndex]);

    const onClickHandler = (selection: string) => {
        setSelectedNumbers([]);
        if(data && data[randomPokemonIndex].name == selection) {
            setScore(score + 1);
        }
        setHasSelectedResponse(!hasSelectedResponse);
    }

    const displayOptions = () => (
        <div className="question">
            {data && selectedNumbers.map(value =>
                <Card.Title
                    key={data[value].id}
                    className="option"
                    onClick={() => onClickHandler(data[value].name)}
                >
                {capitalizeFirstLetter(data[value].name)}
                </Card.Title>
            )}
        </div>
    )

    if (isLoading) return <div><Spinner animation="border" role="status">Loading...</Spinner></div>;
    if (error) return <div>Error: {error}</div>;

    console.log

    return (
        <div className="container">
            {data &&
            <>
                <div>
                    <h4>Score: {score}/10</h4>
                </div>
                <Card className="game">
                    <Card.Title className="title">Who's That Pokemon?</Card.Title>
                    <img className={'z-0 w-full'} src={svgContent}/>
                    <Card.Body>
                        <div className="questions">
                            {displayOptions()}
                        </div>
                    </Card.Body>
                </Card>
                <Button disabled={!hasSelectedResponse}>Submit</Button>
            </>
           }
        </div>
    )
}

export default Game;