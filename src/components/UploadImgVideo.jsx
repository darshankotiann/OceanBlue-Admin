import React, { useEffect, useRef, useState } from 'react'


const UploadImgVideo = ({ image, setImage, onChangeData, type = "default", children }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef?.current?.createUploadWidget({
            cloudName: "drqvunoh1",
            uploadPreset: "qffm3knk",
            multiple: false,
            showAdvancedOptions: false,
            showUploadMoreButton: false,
            clientAllowedFormats: ["jpg", "webp", "png", "jpeg","mp4"],
            singleUploadAutoClose: true,
            sources: ["local"],
            theme: "minimal"
        }, (err, res) => {
            if (res.event === "success") {
                console.log(res.info.secure_url,res.info.resource_type)
                setImage({url:res.info.secure_url,type:res.info.resource_type})
            }
        });
    }, []);
    return (
        <>
            {<div className= 'flex flex-col items-center w-full'>
                {image.url?.length === 0 ?
                    <div onClick={() => widgetRef?.current?.open()} className='border flex justify-center w-full items-center h-32  bg-white/10 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload-cloud"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" /></svg>
                    </div> : <img src={image.url} className='border object-cover h-32 w-32 rounded-lg' />}
            </div>
            }
        </>
    )
}

export default UploadImgVideo