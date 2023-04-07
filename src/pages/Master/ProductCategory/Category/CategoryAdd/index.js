import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import HelperTextMessage from '/src/components/HelperTextMessage';

export default function CategoryAdd({ open, setOpen, reload }) {
    const {
        register: categoryForm,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: ''
        }
    });
    const onSubmit = (data, e) => {
        // if (errors) {
        //     console.log(errors);
        // } else {
        console.log(data);
        reload();
        e.target.reset();
        setOpen(false);
        // }
    };

    const handleClose = () => {
        reset();
        setOpen(false);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="alert-dialog-title">
                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                            <p>{'Add Product'}</p>
                            <Button variant="filled" onClick={handleClose}>
                                x
                            </Button>
                        </Stack>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            className="col-3"
                            error={Boolean(errors?.name)}
                            helperText={<HelperTextMessage type={errors?.name?.type} />}
                            {...categoryForm('name', { required: true, maxLength: 5 })}
                            id="name"
                            label="Name"
                            size="medium"
                            margin="normal"
                            fullWidth={true}
                            variant="filled"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Submit</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
