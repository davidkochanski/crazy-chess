import ReactDOM from 'react-dom/client'
import Game from './Game.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'

import queryClient from './config/queryClient.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Game />
        </BrowserRouter>
    </QueryClientProvider>
)
