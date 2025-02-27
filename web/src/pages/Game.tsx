import { Card, Spinner } from "react-bootstrap";
import useGetPokemon from "../hooks/useGetPokemon";

const Game = () => {
    const {data, isLoading, error } = useGetPokemon();
    if (isLoading) return <div>Loading...<div><Spinner/></div></div>;
    if (error) return <div>Error: {error}</div>;
    return(
        <div>
                 <Card>
                    {data && <Card.Img src={data[0].image}/>}
                    <Card.Body>
                        {data && <Card.Title>{data[0].name} </Card.Title>}
                    </Card.Body>
                </Card>
        </div>
    )
}

export default Game;