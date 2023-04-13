import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import axios from '../../../../../util/axios';
import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    isActive: yup.bool().required()
});

export default function CategoryAdd({ open, setOpen, reload, rowId, setRowId }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            isActive: true
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submit(values);
        }
    });

    const getValueById = () => {
        axios
            .get('category/by-id?id=' + rowId)
            .then((response) => {
                formik.setValues({
                    name: response.data?.name,
                    isActive: response.data?.active
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (rowId) getValueById();
    }, [rowId]);

    const submit = (values) => {
        values['id'] = rowId ? rowId : null;
        axios
            .post('category/save', values)
            .then((response) => {
                reload();
                console.log(response.data);
                formik.resetForm();
                handleClose();
            })
            .catch((error) => {
                console.log(error);
                formik.resetForm();
                handleClose();
            });
    };

    const handleClose = () => {
        setOpen(false);
        setRowId(null);
    };

    return (
        <>
            <Dialog
                PaperProps={{
                    sx: {
                        width: '30%',
                        maxHeight: 300
                    }
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                            <p>{'Add Category'}</p>
                            {/* <Button size="small" onClick={handleClose}>
                                x
                            </Button> */}
                        </Stack>
                    </DialogTitle>
                    <DialogContent className="row col-12">
                        <div className="col-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
                            <FormControl fullWidth>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    size="small"
                                    fullWidth={true}
                                    // variant="oulined"
                                />
                                <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.name}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="col-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
                            <FormControl>
                                <FormControlLabel
                                    sx={{ margin: 0, padding: 0 }}
                                    control={
                                        <Switch
                                            id="isActive"
                                            name="isActive"
                                            label="Is Active"
                                            value={formik.values.isActive}
                                            checked={formik.values.isActive}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Is active ?"
                                    labelPlacement="start"
                                />
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Submit</Button>
                        <Button
                            onClick={() => {
                                formik.resetForm();
                                handleClose();
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            {/* <Toastr message="Hai" severity="success"></Toastr> */}
        </>
    );
}
