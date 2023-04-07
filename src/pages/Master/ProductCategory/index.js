import PageHeader from '../../../components/PageHeader';
import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Loadable from '../../../components/Loadable';
import { lazy } from 'react';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';

const Product = Loadable(lazy(() => import('./Product/index')));
const Category = Loadable(lazy(() => import('./Category/index')));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

export default function ProductCategory() {
    const [value, setValue] = useState(0);
    const $categoryTrigger = new Subject();

    useEffect(() => {
        return () => {
            $categoryTrigger.unsubscribe();
        };
    }, []);

    function add() {
        $categoryTrigger.next(true);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <PageHeader
                breadcrumbs={[
                    { name: 'Master', link: '/master' },
                    { name: 'Product & Category', link: '/product' }
                ]}
                title={value == 0 ? 'Category' : 'Product'}
                add={add}
            />
            <Box sx={{ backgroundColor: 'white', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Category" />
                        <Tab label="Product" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Category categoryTrigger={$categoryTrigger} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Product />
                </TabPanel>
            </Box>
        </>
    );
}
