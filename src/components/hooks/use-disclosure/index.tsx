import { useState, useCallback } from 'react';

export const useDisclosure = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const onOpenChange = useCallback((isOpen: boolean) => {
        setIsOpen(isOpen);
    }, []);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        onOpen,
        onClose,
        onOpenChange,
    };
}