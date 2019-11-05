// @flow 
import { useLayoutEffect } from 'react';

function useBodyScrollLock() {
    useLayoutEffect(() => {
        const overflowProperty = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = overflowProperty;
        }
    })
};

export { useBodyScrollLock };