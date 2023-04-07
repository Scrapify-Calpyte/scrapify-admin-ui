import CommonTable from '../../../../components/CommonTable';
import ProductAdd from './ProductAdd/index';
import { useState } from 'react';

export default function Product() {
    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <CommonTable />
            <ProductAdd />
        </>
    );
}
