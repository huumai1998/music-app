"use client";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const uploadModal = useUploadModal();
    const [isLoading, setIsloading] = useState(false);
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })
    
    const onChange= (open: boolean) => {
        if(!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsloading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if(!imageFile || !songFile || !user) {
                toast.error("Missing fields !")
                return;
            }

            const uniqueID = uniqid();

            // upload Song
            const {
                data: songData,
                error: songEror
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if (songEror) {
                setIsloading(false);
                return toast.error('Failed song upload');
            }

            //upload image
            const { 
                data: imageData, 
                error: imageError
              } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                  cacheControl: '3600',
                  upsert: false
                });
        
              if (imageError) {
                setIsloading(false);
                return toast.error('Failed image upload');
              }


            // upload Record
            const { error: supabaseError } = await supabaseClient
              .from('songs')
              .insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                song_path: songData.path
              });
      
            if (supabaseError) {
              return toast.error(supabaseError.message);
            }
            
            router.refresh();
            setIsloading(false);
            toast.success('Song created!');
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsloading(false);
        }
    }
    return (
        <Modal title="Add a song" description="Upload a mp3 file" isOpen={uploadModal.isOpen} 
            onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-y-4">
                <Input id="title" disabled={isLoading} {...register('title', {
                    required: true })}
                    placeholder="Song title" 
                    />
                <Input id="author" disabled={isLoading} {...register('author', {
                    required: true })}
                    placeholder="Song author" 
                    />
                <div>
                    <div className="pb-1">
                        Select song file
                    </div>
                    <Input id="song" type="file" disabled={isLoading} accept=".mp3" {...register('song', {
                        required: true })}
                    />
                </div>
                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input id="image" type="file" disabled={isLoading} accept="image/*" 
                    {...register('image', {
                        required: true })}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    )
}


export default UploadModal;