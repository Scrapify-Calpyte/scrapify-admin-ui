import * as React from 'react';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

function CommonTable({
    displayedColumns = [],
    definedColumns = [],
    searchColumns = [],
    data = [],
    isAction = true,
    isEdit = true,
    isDetail = false,
    canShowSearch = true,
    count = 0,
    isPagination = true,
    rowAction,
    searchEvent,
    paginate
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    var filters = [];

    const handleChangePage = (event, newPage) => {
        let pageObject = {
            postPerPage: rowsPerPage,
            pageNumber: newPage + 1
        };
        paginate(pageObject);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        let pageObject = {
            postPerPage: event.target.value,
            pageNumber: 1
        };
        paginate(pageObject);
        setPage(0);
        setRowsPerPage(parseInt(event.target.value));
    };

    useEffect(() => {}, []);

    const handleSearch = (event) => {
        const filter = {
            key: event?.target?.id,
            operation: ':',
            orPredicate: false,
            value: event?.target?.value
        };
        const objIndex = filters.findIndex((obj) => obj.key === event?.target?.id);
        if (objIndex !== -1) {
            filters[objIndex] = filter;
        } else {
            filters.push(filter);
        }
        searchEvent(filters);
    };

    function reset() {
        filters = [];
        searchEvent(filters);
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {displayedColumns?.map((col, index) => (
                            <th key={'h' + index} style={{ color: '#757575' }} scope="col">
                                {col}
                            </th>
                        ))}
                        {isAction ? (
                            <th style={{ color: '#757575', width: '10%' }} scope="col">
                                Actions
                            </th>
                        ) : (
                            <></>
                        )}
                    </tr>
                    {canShowSearch ? (
                        <tr>
                            {searchColumns.map((searchCol, index) => {
                                return (
                                    <td key={'s' + index}>
                                        {searchCol.canShow ? (
                                            <TextField
                                                fullWidth
                                                size="small"
                                                id={searchCol?.name}
                                                onKeyUp={handleSearch}
                                                className="inputs"
                                                label={'Search ' + searchCol?.name}
                                                variant="outlined"
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </td>
                                );
                            })}
                            <td>
                                <Button variant="text" sx={{ color: '#1bd7a0' }} onClick={reset}>
                                    RESET
                                </Button>
                            </td>
                        </tr>
                    ) : (
                        <></>
                    )}
                </thead>
                <tbody>
                    {data?.map((row, index) => {
                        return (
                            <tr key={'r' + index}>
                                {definedColumns?.map((col, index) => {
                                    return (
                                        <td key={'d' + index}>
                                            <Tooltip title={row[col]?.name ? row[col]?.name + '' : row[col] + ''} arrow placement="bottom">
                                                <p style={{ width: 'fit-content' }}>
                                                    {row[col]?.name ? row[col]?.name + '' : row[col] + ''}
                                                </p>
                                            </Tooltip>
                                        </td>
                                    );
                                })}
                                {isAction ? (
                                    <td>
                                        {isDetail ? (
                                            <IconButton size="small" onClick={() => rowAction({ name: 'detail', value: row?.id })}>
                                                <RemoveRedEyeIcon sx={{ color: '##8E44AD' }} />
                                            </IconButton>
                                        ) : (
                                            <></>
                                        )}
                                        {isEdit ? (
                                            <IconButton size="small" onClick={() => rowAction({ name: 'edit', value: row?.id })}>
                                                <EditIcon sx={{ color: '#2980B9' }} />
                                            </IconButton>
                                        ) : (
                                            <></>
                                        )}
                                        <IconButton size="small" onClick={() => rowAction({ name: 'delete', value: row?.id })}>
                                            <DeleteIcon sx={{ color: '#C0392B' }} />
                                        </IconButton>
                                    </td>
                                ) : (
                                    <></>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {isPagination ? (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 100]}
                    component="div"
                    // sx={{
                    //     spacer: {
                    //         flex: 'none'
                    //     }
                    // }}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            ) : (
                <></>
            )}
        </>
    );
}

CommonTable.propTypes = {
    displayedColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    definedColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    searchColumns: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.array.isRequired,
    isAction: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDetail: PropTypes.bool,
    canShowSearch: PropTypes.bool,
    count: PropTypes.number,
    isPagination: PropTypes.bool,
    rowAction: PropTypes.any,
    paginate: PropTypes.any,
    searchEvent: PropTypes.any
    // dataTrigger: PropTypes.instanceOf(Subject)
};

export default CommonTable;
