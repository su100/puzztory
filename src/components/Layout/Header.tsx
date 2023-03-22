import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from 'utils/auth';

function Header() {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuthStore();
  return (
    <header>
      <Link to="/">메인</Link>
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
