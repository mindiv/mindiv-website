import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-10 text-white h-20">
      <Link to="/" className="text-2xl font-bold">
        Mindiv
      </Link>
      <div>
        <ul>
          <li>
            <Link to="/">Study</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
