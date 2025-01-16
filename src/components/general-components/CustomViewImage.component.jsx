import React, { useEffect, useState } from 'react';
import { ImEnlarge } from "react-icons/im";
import Modal from 'react-modal';
import { MdCancel } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import "../../assets/css/selectbar.css";

export function CustomViewImage(props) {
    const { id, label, isRequired, readOnly, value, onChange } = props;
    const [selectedImage, setSelectedImage] = useState(value);
    const [imageName, setImageName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [uploadMessage, setUploadMessage] = useState("");

    useEffect(() => {
        if (value) {
            setSelectedImage(value.base64);
            setImageName(value.name);
        } else {
            setSelectedImage(null);
            setImageName('');
        }
    }, [value]);

    useEffect(() => {
        if (uploadError) {
            const errorTimeout = setTimeout(() => {
                setUploadError("");
            }, 5000);

            return () => clearTimeout(errorTimeout);
        }
    }, [uploadError]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleImageUpload = (event) => {
        const uploadedImage = event.target.files[0];
        const allowedExtensions = ['image/jpeg', 'image/png', 'image/jpg'];

        if (uploadedImage && allowedExtensions.includes(uploadedImage.type)) {
            if (uploadedImage.size <= 10 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    setSelectedImage(base64String);
                    setImageName(uploadedImage.name);
                    onChange({ base64: base64String, name: uploadedImage.name });
                };
                reader.readAsDataURL(uploadedImage);

                setUploadError("");
                setUploadMessage("Uploaded.");
                setTimeout(() => {
                    setUploadMessage("");
                }, 5000);
            } else {
                setUploadError('File size is more than 10 MB.');
                setSelectedImage(null);
                setImageName('');
                onChange(null);
            }
        } else {
            setUploadError('jpg, jpeg & png images are allowed.');
            setSelectedImage(null);
            setImageName('');
            onChange(null);
        }
    };

    const handleDownloadImage = () => {
        if (selectedImage) {
            const link = document.createElement('a');
            link.href = selectedImage;
            link.setAttribute('download', imageName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleCancelUpload = () => {
        setSelectedImage(null);
        setImageName('');
        onChange(null);
        document.getElementById(`imageUpload-${id}`).value = "";
    };

    const shortenBase64 = (base64String) => {
        return base64String.substring(0, 20) + '...';
    };

    return (
        <div className='flex flex-col gap-1 relative uppercase'>
            <label htmlFor={id} className="text-xs font-[400]">
                {label.toUpperCase()}
                {isRequired && <span className="text-red-500 gap-3">*</span>}
            </label>
            <div className="relative flex flex-col gap-1">
                <div className="flex justify-between items-center gap-2">
                    <div>
                        {selectedImage && (
                            <div className="flex items-center space-x-2">
                                <button onClick={handleDownloadImage} type='button' className="bg-prp-color text-white p-2 rounded">
                                    <FaDownload />
                                </button>
                                <button onClick={handleCancelUpload} type='button' className="bg-white txt-prp-color border border-prp p-2 rounded">
                                    <MdCancel />
                                </button>
                                <button onClick={handleOpenModal} type='button' className="bg-prp-color text-white p-2 rounded">
                                    <ImEnlarge />
                                </button>
                            </div>
                        )}
                    </div>
                    <div>
                        {!selectedImage && (
                            <div className="flex w-10 h-10 rounded-full border border-[#3D3D3D66]">
                                <span className="text-[#3D3D3D66] flex items-center justify-center text-[10px] text-center">
                                    No Image
                                </span>
                            </div>
                        )}
                        {selectedImage && (
                            // <div>
                            //     <div className="flex items-center space-x-1">
                            //         <img
                            //             src={selectedImage}
                            //             alt={imageName}
                            //             className="w-10 h-10 rounded-full border border-[#3D3D3D66]"
                            //         />
                            //     </div>
                            //     {/* <span className="text-xs">{imageName}</span> */}
                            //     {/* <div className="text-xs">{shortenBase64(selectedImage)}</div> */}
                            // </div>
                            <img
                                src={selectedImage}
                                alt={imageName}
                                className="w-10 h-10 rounded-full border border-[#3D3D3D66]"
                            />
                        )}
                    </div>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Enlarged Image"
                    className="modal-img"
                    overlayClassName="modal-overlay-img"
                >
                    <div className="coman-modal-img">
                        <button onClick={handleDownloadImage} className="modal-btn-comman modal-btn-dwl"><FaDownload /></button>
                        <button onClick={handleCloseModal} className="modal-btn-comman modal-btn-cnl"><MdCancel /></button>
                    </div>
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt={imageName}
                            className="w-full h-auto"
                        />
                    )}
                </Modal>
            </div>
            {uploadError && <p className="absolute -bottom-6 text-[10px] font-normal mb-2" style={{ color: 'red' }}>{uploadError}</p>}
            {uploadMessage && (
                <p className="absolute -bottom-6 text-[10px] font-normal mb-2" style={{ color: "green" }}>
                    {uploadMessage}
                </p>
            )}
        </div>
    );
}

CustomViewImage.defaultProps = {
    isRequired: true,
    value: '',
    onChange: () => { },
};

 
