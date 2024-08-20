import './Game.css'
import Board from './Board.js';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx"

const Game = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Board/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </>
    )
}

export default Game;
