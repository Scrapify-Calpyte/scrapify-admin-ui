import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import React from 'react';

export const menuList = [
    {
        icon: <HomeOutlinedIcon />,
        title: 'Dashboard',
        to: '/demo-page',
        type: 'group',
        items: []
    },
    {
        icon: <FilterAltOutlinedIcon />,
        title: 'MASTER',
        type: 'group',
        items: [
            {
                title: 'Catalogue',
                to: 'master/catalogue',
                type: 'item'
            },
            {
                title: 'Product',
                to: 'master/product',
                type: 'item'
            }
        ]
    },
    {
        icon: <AdminPanelSettingsIcon />,
        title: 'SETTINGS',
        type: 'group',
        items: []
    }
];
