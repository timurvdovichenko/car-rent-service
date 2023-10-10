import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy } from 'react';

import Layout from './components/Layout/Layout';
// import { useGetCarsByPageQuery } from 'redux/operations';

const Home = lazy(() => import('pages/HomePage/HomePage'));
const Catalog = lazy(() => import('pages/CatalogPage/CatalogPage'));
const Favorites = lazy(() => import('pages/FavoritePage/FavoritePage'));

function App() {
  // useGetCarsByPageQuery(1);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
