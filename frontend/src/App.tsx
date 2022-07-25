import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RouteGuard from './components/UI/RouteGuard';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignupPage } from './pages/SignupPage/SignupPage';
import { HomePage, NotFound } from './pages/pages';
import NavBar from './components/UI/NavBar';
import { useShowBurger, useAppSelector } from './hooks';
import BurgerMenu from './components/BurgerMenu/BurgerMenu';
const App: React.FC = () => {
  const showBurger = useAppSelector((state) => state.ui.showBurgerMenu);
  useShowBurger();
  return (
    <div className='bg-zinc-100 text-zinc-800'>
      {showBurger && <BurgerMenu />}
      {!showBurger && <NavBar />}
      <Routes>
        <Route
          path='/'
          element={
            <RouteGuard>
              <HomePage />
            </RouteGuard>
          }
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
