import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import './StartPage.css'

const StartPage = () => {
    const history = useHistory();
    const onClickHandler = () => {
        history.push('/game');
    }
    return (
        <div>
            <Button className='start_button' onClick={onClickHandler}>Game Start</Button>
        </div>
    )
}

export default StartPage;