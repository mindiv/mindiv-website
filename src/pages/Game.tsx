import { useAppSelector } from '../app/hooks';
import Categories from '../components/Categories';
import GameLayout from '../components/GameLayout';
import Layout from '../components/Layout';

const Game = () => {
  const { view } = useAppSelector((state) => state.game);
  return (
    <Layout>
      {view === 'categories' && <Categories />}
      {view === 'game' && <GameLayout />}
    </Layout>
  );
};

export default Game;
