import './Game.css'
import Board from './Board.js';
import { Route, Routes, useNavigate } from "react-router-dom";
import { setNavigate } from "./lib/navigation.js"
import Login from "./pages/Login.jsx"

const Game = () => {
    const navigate = useNavigate();
    setNavigate(navigate);


    return (
        <>
            <nav><div style={{color: 'white'}}>Test!</div></nav>
            <Routes>
                <Route path="/" element={<Board/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </>
    )
}

export default Game;
