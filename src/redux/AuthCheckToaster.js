import React from 'react';
import Toaster from './Toaster';
import {getUserData} from '../common-methods';

export function authCheckToaster() {

    const isChild = getUserData();
    if (isChild.parent) {
        Toaster("Not authorised to perform this action", 'error');
        return false;
    }
    return true;
}