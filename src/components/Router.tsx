import React, { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useAuthStore } from 'utils/auth';
import Layout from './Layout';
const MainPage = React.lazy(() => import('pages/Main'));
const SignupPage = React.lazy(() => import('pages/Signup'));
const LoginPage = React.lazy(() => import('pages/Login'));
const StoryList = React.lazy(() => import('pages/StoryList'));
const StoryDetail = React.lazy(() => import('pages/StoryDetail'));
const StoryPlay = React.lazy(() => import('pages/StoryPlay'));

function AuthGuard() {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ redirectPath: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

function GuestGuard() {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function Router() {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<GuestGuard />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/story" element={<StoryList />} />
          <Route path="/story/:id" element={<StoryDetail />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path="/story/:id/play" element={<StoryPlay />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
