import MainLayout from '../layout/MainLayout';
import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from '../components/Loadable';

const Master = Loadable(lazy(() => import('../pages/Master')));

const ThemeRoutes = () => {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout></MainLayout>,
            children: [
                {
                    path: '/master/*',
                    element: <Master />
                }
            ]
        }
    ]);
};

export default ThemeRoutes;
