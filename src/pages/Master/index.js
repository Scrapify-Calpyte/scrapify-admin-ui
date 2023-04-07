import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { Navigate } from 'react-router-dom';

const ProductCategory = Loadable(lazy(() => import('./ProductCategory')));

const Master = () => {
    return useRoutes([
        {
            path: '/category/*',
            element: <ProductCategory />
        },
        {
            path: '/',
            element: <Navigate to="category" replace={true} />
        },
        {
            path: '*',
            element: <Navigate to="category" replace={true} />
        }
    ]);
};

export default Master;
