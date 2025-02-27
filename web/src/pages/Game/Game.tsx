import { Card, Spinner } from "react-bootstrap";
import useGetPokemon from "../../hooks/useGetPokemon";
import cx from 'classnames'
import React from "react";
import styles from './Game.module.scss'

const Game = () => {
    const {data, isLoading, error } = useGetPokemon();
    const [hasSelectedResponse, setHasSelectedResponse] = React.useState(false)
    if (isLoading) return <div><Spinner animation="border" role="status">Loading...</Spinner></div>;
    if (error) return <div>Error: {error}</div>;

    const displayOptions = () => (
      data && data.map((item, index) => {
        if (index < 4) {
            return (
            <div className={styles.question}>
                <Card.Title onClick={() => setHasSelectedResponse(!hasSelectedResponse)}>{item.name}</Card.Title>
            </div>
            )
        }
      }
    ));

    const displaySilhouette = !hasSelectedResponse ? cx(styles.card, styles.img, styles.silhouette) : cx(styles.card, styles.img);
    return(
        <div className=" container">
                 <Card>
                    {data && <Card.Img className={displaySilhouette} src={data[0].image}/>}
                    <Card.Title className="title">Who's That Pokemon?</Card.Title>
                    <Card.Body>
                        <div className={styles.questions}>
                           {displayOptions()}
                        </div>
                    </Card.Body>
                </Card>
        </div>
    )
}

export default Game;