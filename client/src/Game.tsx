import './Game.css'
import Board from './Board.js';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx"
import Register from './pages/Register.jsx';
import AppContainer from './components/AppContainer.jsx';

const Game = () => {
    return (
        <Routes>
            <Route path="/" element={<AppContainer/>}>
                <Route index element={<Board/>}></Route>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    )
}

export default Game;
