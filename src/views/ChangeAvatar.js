import React, { createRef, useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from "react-cropper";



// this transforms file to base64
const file2Base64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = (error) => reject(error);
    });
};

function ChangeAvatar() {
    // ref of the file input
    const fileRef = useRef();

    // the selected image
    const [uploaded, setUploaded] = useState(null);

    // the resulting cropped image
    const [cropped, setCropped] = useState(null);

    // the reference of cropper element
    const cropperRef = useRef();

    const onFileInputChange = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
            file2Base64(file).then((base64) => {
                setUploaded(base64);
            });
        }
    }

    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCropped(cropper.getCroppedCanvas().toDataURL())
    }

    return (
        <>
            <div className="App">
                {
                    uploaded ?
                        <div>
                            <Cropper
                                src={uploaded}
                                style={{ height: 400, width: 400 }}
                                autoCropArea={1}
                                aspectRatio={1}
                                viewMode={3}
                                guides={false}
                                ref={cropperRef}
                            />
                            <button onClick={onCrop}>Crop</button>
                            {cropped && <img src={cropped} alt="Cropped!" />}
                        </div>
                        :
                        <>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                ref={fileRef}
                                onChange={onFileInputChange}
                                accept="image/png,image/jpeg,image/gif"
                            />
                            <button
                                onClick={() => fileRef.current?.click()}
                            >Upload something!
                            </button>
                        </>}
            </div>
        </>
    );
}

export default ChangeAvatar