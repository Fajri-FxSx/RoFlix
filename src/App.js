import 'boxicons/css/boxicons.min.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFound, Preloader } from './components';
import './scss/App.scss';

const Category = lazy(() => import('./views/Category'));
const Detail = lazy(() => import('./views/Detail'));
const Filter = lazy(() => import('./views/Filter'));
const Home = lazy(() => import('./views/Home'));
const MainLayout = lazy(() => import('./views/MainLayout'));
const Search = lazy(() => import('./views/Search'));
const WatchMovie = lazy(() => import('./views/WatchMovie'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path=":category" element={<Category />} />
            <Route path=":category/:movieId" element={<Detail />} />
            <Route path="/watch/:category/:movieId" element={<WatchMovie />} />
            <Route path="search" element={<Search />} />
            <Route path="filter" element={<Filter />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
