import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
const MainPage = React.lazy(() => import('pages/Main'));
const PuzzleListPage = React.lazy(() => import('pages/PuzzleList'));
const PuzzleDetailPage = React.lazy(() => import('pages/PuzzleDetail'));
const PuzzlePlayPage = React.lazy(() => import('pages/PuzzlePlay'));
const LoginPage = React.lazy(() => import('pages/Login'));

function Router() {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/puzzle" element={<PuzzleListPage />} />
        <Route path="/puzzle/:id" element={<PuzzleDetailPage />} />
        <Route path="/puzzle/:id/play" element={<PuzzlePlayPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
