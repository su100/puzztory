import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
const MainPage = React.lazy(() => import('pages/Main'));
const SignupPage = React.lazy(() => import('pages/Signup'));
const LoginPage = React.lazy(() => import('pages/Login'));
const StoryList = React.lazy(() => import('pages/StoryList'));
const StoryDetail = React.lazy(() => import('pages/StoryDetail'));
const StoryPlay = React.lazy(() => import('pages/StoryPlay'));

function Router() {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/story" element={<StoryList />} />
          <Route path="/story/:id" element={<StoryDetail />} />
        </Route>
        <Route path="/story/:id/play" element={<StoryPlay />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
