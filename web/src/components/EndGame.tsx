import { Container, Row, Card, Button } from "react-bootstrap";
import Column from "./Column";
import Columns from "./Columns";
import { useHistory } from "react-router-dom";

interface EndGamePassedProps {
    score:number;
}

const EndGame = ({score}: EndGamePassedProps) => {
    const history = useHistory(); 
    return(
    <Container>
    <Row>
        <Card.Text>Your Score was {score}/10</Card.Text>
    </Row>
    <Row>
        <Columns>
            <Column>
                <Button onClick={() => window.location.reload()} >Try Again</Button>
            </Column>
            <Column>
                <Button onClick={() => history.push('/')} >Back to Home</Button>
            </Column>
        </Columns>
    </Row>
</Container>

)}

export default EndGame;