import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from 'utils/auth';

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname.startsWith('/login');
  const { isLoggedIn, logout } = useAuthStore();
  return (
    <header className="sticky top-0 shadow-sm bg-white border-b border-slate-200 flex justify-between items-center px-4 py-3">
      <Link to="/" className="font-black text-black text-2xl">
        Puzztory
      </Link>
      {isLoggedIn ? (
        <button onClick={logout}>로그아웃</button>
      ) : isLoginPage ? undefined : (
        <Link to="/login" state={{ redirectPath: location.pathname }}>
          로그인
        </Link>
      )}
    </header>
  );
}

export default Header;
