import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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

function CommonTable({
    displayedColumns = [],
    definedColumns = [],
    searchColumns = [],
    data = [],
    isAction = true,
    isEdit = true,
    isDetail = false,
    canShowSearch = true,
    count,
    postPerPage = 10,
    pageNumber = 1,
    filters = [],
    isPagination = true,
    editRow,
    deleteRow,
    detailRow
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState(data);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setRows(data);
    }, []);

    function onPaginate(pageSize) {
        this.postPerPage = +pageSize;
        this.pageNumber = +pageSize + 1;
        let pageObject = { postPerPage: this.postPerPage, pageNumber: this.pageNumber };
        alert(JSON.stringify(pageObject));
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {displayedColumns?.map((col) => (
                            <th style={{ color: '#757575' }} scope="col">
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
                </thead>
                <tbody>
                    {canShowSearch == true ? (
                        <tr>
                            {searchColumns?.map((searchCol) => {
                                searchCol?.canShow == true ? (
                                    <td>
                                        <TextField id="outlined-basic" label={searchCol?.name} variant="outlined" />
                                    </td>
                                ) : (
                                    <td></td>
                                );
                            })}
                        </tr>
                    ) : (
                        <></>
                    )}
                    {rows?.map((row) => {
                        return (
                            <tr>
                                {definedColumns?.map((col) => {
                                    return <td>{row[col]}</td>;
                                })}
                                {isAction ? (
                                    <td>
                                        {isDetail ? (
                                            <IconButton size="small" onClick={() => detailRow(row?.id)}>
                                                <RemoveRedEyeIcon />
                                            </IconButton>
                                        ) : (
                                            <></>
                                        )}
                                        {isEdit ? (
                                            <IconButton size="small" onClick={() => editRow(row?.id)}>
                                                <EditIcon sx={{ color: 'blue' }} />
                                            </IconButton>
                                        ) : (
                                            <></>
                                        )}
                                        <IconButton size="small" onClick={() => deleteRow(row?.id)}>
                                            <DeleteIcon sx={{ color: 'red' }} />
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
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
    postPerPage: PropTypes.number,
    pageNumber: PropTypes.number,
    filters: PropTypes.array,
    isPagination: PropTypes.bool,
    editRow: PropTypes.any,
    deleteRow: PropTypes.any,
    detailRow: PropTypes.any
};

export default CommonTable;
