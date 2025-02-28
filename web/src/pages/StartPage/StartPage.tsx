import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import './StartPage.css'
import img from '../../assets/whos_that.png'

const StartPage = () => {
    const history = useHistory();
    const onClickHandler = () => {
        history.push('/game');
    }
    return (
        <div>
            <Card>
                <Card.Img src={img}/>
            </Card>
            <Button className='start_button' onClick={onClickHandler}>Game Start</Button>
        </div>
    )
}

export default StartPage;