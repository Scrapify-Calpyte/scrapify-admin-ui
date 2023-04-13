import CommonTable from '../../../../components/CommonTable';
import CategoryAdd from './CategoryAdd/index';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function Category({ categoryTrigger }) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [rowId, setRowId] = useState(null);
    const displayedColumns = ['Name', 'Active'];
    const definedColumns = ['name', 'active'];
    const [isComplete, setIsComplete] = useState(false);
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
        setIsComplete(false);
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
        }).catch((error) => setIsComplete(true));
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
            setIsComplete(true);
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
            {!isComplete ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: window.innerHeight - 400,
                        width: '100%'
                    }}
                >
                    <Stack alignItems="center">
                        <CircularProgress
                            sx={{
                                color: '#1bd7a0',
                                zIndex: 1
                            }}
                        />
                        <br></br>
                        <b style={{ color: '#1bd7a0' }}>Fetching</b>
                    </Stack>
                </Box>
            ) : (
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
            )}
        </>
    );
}
