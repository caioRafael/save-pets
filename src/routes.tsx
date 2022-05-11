import { FC } from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"

const Routes:FC = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/home" exact component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes