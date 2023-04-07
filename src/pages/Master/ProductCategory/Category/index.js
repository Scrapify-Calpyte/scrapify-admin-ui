import CommonTable from '../../../../components/CommonTable';
import CategoryAdd from './CategoryAdd/index';
import { useState, useEffect } from 'react';
// const Category = React.forwardRef((props, ref) => {
export default function Category({ categoryTrigger }) {
    const [open, setOpen] = useState(false);

    function editRow(rowId) {
        setOpen(true);
    }

    function reload() {
        alert('reloaded');
    }

    useEffect(() => {
        if (categoryTrigger) {
            categoryTrigger.subscribe(() => addRow());
        }
    }, []);

    const addRow = () => {
        setOpen(true);
    };

    return (
        <>
            <CommonTable
                displayedColumns={['Name', 'age']}
                definedColumns={['name', 'age']}
                searchColumns={[
                    { name: 'name', canShow: true },
                    { name: 'age', canShow: true }
                ]}
                data={[
                    {
                        id: 1,
                        name: 'Dinesh',
                        age: 24
                    },
                    {
                        id: 2,
                        name: 'Kumar',
                        age: 50
                    }
                ]}
                isAction={true}
                isDetail={false}
                isEdit={true}
                isPagination={true}
                deleteRow={editRow}
                detailRow={editRow}
                editRow={editRow}
                canShowSearch={true}
            ></CommonTable>
            <CategoryAdd open={open} setOpen={setOpen} reload={reload} />
        </>
    );
}
