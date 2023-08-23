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
                                            <Button onClick={authModal.onOpen}
                                                className="bg-white px-5 py-2"
                                                >
                                                Please Login
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
                                {user?.id === "fb9902b7-96ff-4824-9c98-808021f66362" ? (
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
                    {user?.id === "fb9902b7-96ff-4824-9c98-808021f66362" ? (
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