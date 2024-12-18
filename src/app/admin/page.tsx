'use client'

import { div } from "framer-motion/client";
import { useState } from "react";

type Page = 'page1' | 'page2';

export default function AdminPage() {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [page, setPage] = useState<Page>('page1');
    return (
        <>
            <div onClick={() => {
                setPage('page1')
            }}>自动</div>
            <div onClick={() => {
                setPage('page2')
            }}>手动</div>
            {page !== 'page1' && (
                <>
                    <div>
                        设置1
                    </div>
                    <div>
                        设置2 
                    </div>
                </>
            )}
        </>
    )
}
