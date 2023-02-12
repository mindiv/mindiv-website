import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { getCategories } from './features/gameSlice';
import Game from './pages/Game';
import Index from './pages/Index';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="min-h-screen bg-gray-800">
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
