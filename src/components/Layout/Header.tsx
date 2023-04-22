import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from 'utils/auth';

function Header() {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuthStore();
  return (
    <header className="sticky top-0 bg-white flex justify-between items-center px-4 py-3">
      <Link to="/" className="font-black text-black text-2xl">
        Puzztory
      </Link>
      {isLoggedIn ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <Link to="/login" state={{ redirectPath: location.pathname }}>
          로그인
        </Link>
      )}
    </header>
  );
}

export default Header;
