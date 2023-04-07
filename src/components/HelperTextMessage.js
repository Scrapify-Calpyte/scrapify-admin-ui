import { useState } from 'react';
import { useEffect } from 'react';

export default function HelperTextMessage({ type }) {
    const [message, setMessage] = useState('');
    useEffect(() => {
        switch (type) {
            case 'required':
                setMessage('is Required');
                break;
            case 'maxLength':
                setMessage('Exceeding Limit');
                break;
            default:
                setMessage('');
                break;
        }
    }, [type]);
    return <>{message}</>;
}
