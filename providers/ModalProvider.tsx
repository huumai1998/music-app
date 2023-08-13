"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => 
    {
        setIsMounted(true);
    }, [])

    if (!isMounted) 
    {
        return null;
    }
    
    
    return(
        <div>
            <Modal />
        </div>
    )
}

export default ModalProvider;