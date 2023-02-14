import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { getCategories } from './features/gameSlice';
import Game from './pages/Game';
import Index from './pages/Index';
import 'animate.css/animate.min.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
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
