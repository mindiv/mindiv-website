import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Index from './pages/Index';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
