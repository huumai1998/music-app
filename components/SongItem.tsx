"use client";

import { Song } from "@/types/types";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) => {
    return (
        <>
        <div>
            Song items
        </div>
        </>
    )
}

export default SongItem;