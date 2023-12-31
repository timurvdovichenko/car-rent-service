import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import { Loader } from '../Loader/Loader';

export default function Layout() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
}
