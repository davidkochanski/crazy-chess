import ReactDOM from 'react-dom/client'
import Game from './Game.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Game />
    </BrowserRouter>
)
