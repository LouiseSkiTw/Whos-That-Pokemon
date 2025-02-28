import { Button, Card, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import './StartPage.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import img from '../../assets/whos_that.png'


const StartPage = () => {
    const history = useHistory();
    const onClickHandler = () => {
        history.push('/game');
    }
    return (
        <Container className="container">
            <Row className="row">
                <Card>
                    <Card.Img className="col col-6 image" src={img} />
                    <Button className="col col-3 start_button" onClick={onClickHandler}>Game Start</Button>
                </Card>
            </Row>
        </Container>

    )
}

export default StartPage;