import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
const MainPage = React.lazy(() => import('pages/Main'));
const SignupPage = React.lazy(() => import('pages/Signup'));
const LoginPage = React.lazy(() => import('pages/Login'));
const PuzzleListPage = React.lazy(() => import('pages/PuzzleList'));
const PuzzleDetailPage = React.lazy(() => import('pages/PuzzleDetail'));
const PuzzlePlayPage = React.lazy(() => import('pages/PuzzlePlay'));

function Router() {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/puzzle" element={<PuzzleListPage />} />
          <Route path="/puzzle/:id" element={<PuzzleDetailPage />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/puzzle/:id/play" element={<PuzzlePlayPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
