import React from 'react';
import { toast } from 'react-toastify';

export default function Toaster(message, type) {
    return (
        toast[type](message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        })
    );
}