import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import './App.css'

const StartPage = () => {
    const history = useHistory();
    const onClickHandler = () => {
        history.push('game/')
    }
    return (
        <div>
            <Button title="Game Start" onClick={() => onClickHandler()}/>
        </div>
    )
}

export default StartPage;