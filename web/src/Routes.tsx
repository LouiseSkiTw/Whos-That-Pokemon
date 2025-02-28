import { Route, Switch } from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import Game from "./pages/Game/Game";

const Routes = () => (
    <Switch>
        <Route exact path='/' render={()=> <StartPage />} />
        <Route path='/game' component={() => <Game />} />
    </Switch>
)

export default Routes;