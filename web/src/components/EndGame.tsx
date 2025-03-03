import { Container, Row, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Base.scss';

interface EndGamePassedProps {
    score:number;
}

const EndGame = ({score}: EndGamePassedProps) => {
    const history = useHistory(); 
    return(
    <Container>
    <Row>
        <Card.Text className="text">Your Score was {score}/10</Card.Text>
    </Row>
    <Row>
        <div className="row btn_container">
            <div className="col-md-2">
                <Button className="buttons" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
            <div className="col-md-2">
                <Button className="buttons" onClick={() => history.push('/')}>Back to Home</Button>
            </div>
        </div>
    </Row>
</Container>

)}

export default EndGame;