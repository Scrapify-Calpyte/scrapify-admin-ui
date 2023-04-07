import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useEffect } from 'react';
import Button from '@mui/material/Button';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function PageHeader({ breadcrumbs, title, add }) {
    useEffect(() => {}, []);

    return (
        <>
            <Stack sx={{ padding: '3px 0' }} flexDirection="row" justifyContent="space-between">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {breadcrumbs.map((e, index) => {
                        return (
                            <Link to={e?.link} underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
                                {e?.name}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
                <Button variant="text" sx={{ color: '#1bd7a0' }} onClick={add}>
                    Add {title}
                </Button>
            </Stack>
        </>
    );
}
