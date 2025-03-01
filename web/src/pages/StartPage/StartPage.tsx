import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import './StartPage.scss'
// import "bootstrap/dist/css/bootstrap.min.css"
import img from '../../assets/whos_that.png'
import Columns from "../../components/Columns";
import Column from "../../components/Column";


const StartPage = () => {
    const history = useHistory();
    const onClickHandler = () => {
        history.push('/game');
    }
    return (
        <Columns>
            <Column>
                <Card.Img className="image" src={img} alt="Whos that Pokemon" />
            </Column>
            <Column>
                <Button className="col start_button" onClick={onClickHandler}>Play</Button>
            </Column>
        </Columns>

    )
}

export default StartPage;