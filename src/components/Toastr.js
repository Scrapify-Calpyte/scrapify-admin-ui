import React, { useState } from 'react';
import { Snackbar, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Slide from '@mui/material/Slide';

function Toastr({ message, severity, options = {} }) {
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={open}
            autoHideDuration={options.duration || 3000}
            onClose={handleClose}
            severity={severity}
            TransitionComponent={TransitionUp}
            message={message}
            action={
                <IconButton size="small" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    );
}
export default Toastr;
