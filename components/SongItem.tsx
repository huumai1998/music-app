"use client";

import useLoadImage from "@/hooks/useLoadingImage";
import { Song } from "@/types/types";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) => {

    const imagePath = useLoadImage(data);
    return (
        <>
        <div>
            Song items
        </div>
        </>
    )
}

export default SongItem;