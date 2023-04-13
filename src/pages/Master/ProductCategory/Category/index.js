import CommonTable from '../../../../components/CommonTable';
import CategoryAdd from './CategoryAdd/index';
import { useState, useEffect } from 'react';

export default function Category({ categoryTrigger }) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [rowId, setRowId] = useState(null);
    const displayedColumns = ['Name', 'Active'];
    const definedColumns = ['name', 'active'];
    const searchColumns = [
        { name: 'name', canShow: true },
        { name: 'active', canShow: true }
    ];
    var postPerPage = 10;
    var pageNumber = 1;
    var filter = [];

    function rowAction(action = { name: 'add', value: null }) {
        switch (action?.name) {
            case 'add':
                setRowId(action.value);
                setOpen(true);
                break;
            case 'edit':
                setRowId(action.value);
                setOpen(true);
                break;
            case 'delete':
                alert('Are you sure to delete');
                break;
            default:
                setRowId(null);
                setOpen(true);
                break;
        }
    }

    useEffect(() => {
        if (categoryTrigger) {
            categoryTrigger.subscribe(() => rowAction());
        }
        loadData();
    }, []);

    const randomNumber = () => {
        return Math.floor(Math.random() * 100 + 1);
    };

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }

    function loadData() {
        let data = {
            draw: randomNumber(),
            filter: filter,
            pageNo: pageNumber,
            pageSize: postPerPage
        };
        postData('http://localhost:8000/master/category/get-all', data).then((response) => {
            setCategories(response.data);
            setCount(response?.recordsTotal);
        });
    }

    function paginate(event) {
        pageNumber = event?.pageNumber;
        postPerPage = event?.postPerPage;
        loadData();
    }

    const search = (event) => {
        filter = event;
        loadData();
    };

    return (
        <>
            <CommonTable
                displayedColumns={displayedColumns}
                definedColumns={definedColumns}
                searchColumns={searchColumns}
                data={categories}
                isAction={true}
                isDetail={false}
                isEdit={true}
                isPagination={true}
                rowAction={rowAction}
                count={count}
                canShowSearch={true}
                paginate={paginate}
                searchEvent={search}
            ></CommonTable>
            <CategoryAdd open={open} setRowId={setRowId} rowId={rowId} setOpen={setOpen} reload={loadData} />
        </>
    );
}
