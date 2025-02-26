import { Spinner } from "react-bootstrap";
import useGetPokemon from "../hooks/useGetPokemon";

const Game = () => {
    const {data, isLoading, error } = useGetPokemon();
    if (isLoading) return <div>Loading...<div><Spinner/></div></div>;
    if (error) return <div>Error: {error}</div>;
    return(
        <div>
            <h1>{data?.name}</h1>
        </div>
    )
}

export default Game;