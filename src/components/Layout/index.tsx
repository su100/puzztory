import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div>
      <Header />
      <main className="min-h-[calc(100vh-176px)] max-w-[900px] mx-auto pb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
