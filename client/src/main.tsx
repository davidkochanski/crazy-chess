import ReactDOM from 'react-dom/client'
import Game from './Game.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Game />
        </BrowserRouter>
    </QueryClientProvider>
)
