import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  return (
    <header>
      <Link to="/">메인</Link>
      <Link to="/login" state={{ redirectPath: location.pathname }}>
        로그인
      </Link>
    </header>
  );
}

export default Header;
