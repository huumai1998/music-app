"use client";

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types/types";
import MediaItem from "./MediaItem";
import Button from "./Button";

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const authModal = useAuthModal();

    const uploadModal = useUploadModal();
    const { user } = useUser();
    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        // check for subcription
        return uploadModal.onOpen();
    }
    return (
        <div className="flex flex-col">
            <div
                className="
                    flex
                    items-center
                    justify-between
                    px-5
                    pt-4
                ">
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-x-2
                            ">
                                {user ? (
                                    <>
                                        <TbPlaylist className="text-neutral-400" size={26}/>  
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <p className="text-neutral-400">
                                                Listen your music?
                                            </p>
                                        </div>
                                        <div>
                                            <Button onClick={authModal.onOpen}
                                                className="bg-transparent text-neutral-300 font-light"
                                                >
                                                Please login
                                            </Button>
                                        </div>
                                    </>
                                )}
                                <p
                                    className="
                                        text-neutral-400
                                        font-medium
                                        text-md
                                        "
                                >
                                {user ? (
                                    <>
                                    <div>
                                        <p>
                                            Admin list
                                        </p>
                                    </div>
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            {user ? (
                                                <>
                                                    Your Songs
                                                </>
                                            ):(
                                                <>
                                                {/* No code from here */}
                                                </>
                                            )}
                                        </p>
                                        {/* <LikedSongsList /> */}
                                    </>
                                )}
                            </p>
                    </div>
                    <div>
                    {user ? (
                        <>
                        <div>
                        <AiOutlinePlus 
                                onClick={onClick}
                                size={20}
                                className="
                                text-neutral-400
                                cursor-pointer
                                hover:text-white
                                transition
                                "/>
                        </div>
                        </>
                    ) : (
                        <>
                        {/* No code from here */}
                        </>
                    )}

                    </div>
            </div>
            <div className="
                flex
                flex-col
                gap-y-2
                mt-4
                px-3">
                    
                    {songs.map((items) => (
                        <MediaItem onClick={()=> {}} 
                        key={items.id} 
                        data={items}/>
                    ))}
            </div>
        </div>
    )
}

export default Library;