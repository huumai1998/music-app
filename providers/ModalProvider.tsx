"use client";

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
            Hallo
        </div>
    )
}

export default ModalProvider;