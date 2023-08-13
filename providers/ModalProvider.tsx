"user client";

import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMount] = useState(false);

    useEffect(() => 
    {
        setIsMount(true);
    }, [])

    if (!isMounted) 
    {
        return null;
    }
    return 
    (
        <>

        </>
    )
}

export default ModalProvider;