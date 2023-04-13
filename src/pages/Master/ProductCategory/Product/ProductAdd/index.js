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
    category: yup.string().required()
});

export default function ProductAdd({ open, setOpen, reload, rowId, setRowId }) {
    const [categories, setCategories] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: '',
            category: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submit(values);
        }
    });

    const getValueById = () => {
        axios
            .get('sub-category/by-id?id=' + rowId)
            .then((response) => {
                formik.setValues({
                    name: response.data?.name,
                    category: response.data?.category?.id
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function getCategories() {
        axios
            .get('category/find-all')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getCategories();
        if (rowId) getValueById();
    }, [rowId]);

    const submit = (values) => {
        values['id'] = rowId ? rowId : null;
        values['category'] = {
            id: values?.category
        };
        // console.log(values);
        axios
            .post('sub-category/save', values)
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
                            <p>{'Add Product'}</p>
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
                        <div className="col-md-12" style={{ minHeight: '60px' }}>
                            <FormControl fullWidth size="small" error={!!formik.errors.fuel} className="col-md-4">
                                <InputLabel id="category">Fuel</InputLabel>
                                <Select
                                    id="category"
                                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                                    label="Category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    error={!!formik.errors.category}
                                >
                                    <MenuItem key="none" value="">
                                        None
                                    </MenuItem>
                                    {categories.map((category, index) => {
                                        return (
                                            <MenuItem key={index} value={category?.id}>
                                                {category?.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.category}</FormHelperText>
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
        </>
    );
}
