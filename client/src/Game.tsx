import './Game.css'
import Board from './Board';
import { Route, Routes, useNavigate } from "react-router-dom";
import { setNavigate } from "./lib/navigation"

const Game = () => {
    const navigate = useNavigate();
    setNavigate(navigate);


    return (
        <>
            <nav><div style={{color: 'white'}}>Test!</div></nav>
            <Routes>
                <Route path="/" element={<Board/>}/>
            </Routes>
        </>
    )
}

export default Game;
