import { Button, Card, Container, Row } from "react-bootstrap";
import pikachu from '../assets/Sleepy.png'
import './Base.scss';
import { useHistory } from "react-router-dom";


interface ErrorPagePassedProps {
    error: string
}
const ErrorPage = ({ error }: ErrorPagePassedProps) =>{ 
        const history = useHistory(); 
    
    return(
    <Container>
        <Row>
            <Card.Text className="text">{error}</Card.Text>
        </Row>
        <Row>
            <div className="row btn_container">
                <div className="col-md-2">
                    <Card.Img src={pikachu} />
                </div>
                <div className="col-md-2">
                    <Button className="buttons" onClick={() => history.push('/')}>Back to Home</Button>
                </div>
            </div>
        </Row>
    </Container>
)}

export default ErrorPage;