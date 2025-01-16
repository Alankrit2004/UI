import React, { useEffect, useState } from 'react';
import { ImEnlarge } from "react-icons/im";
import Modal from 'react-modal';
import { MdCancel } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import Select from 'react-select';
import "../../assets/css/selectbar.css"


export  function CustomDropDownUpload(props) {
    const { id, label, isRequired, readOnly, value, onChange, options } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [fileType, setFileType] = useState("");
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (error) {
            const errorTimeout = setTimeout(() => {
                setError("");
            }, 5000);

            return () => clearTimeout(errorTimeout);
        }
    }, [error]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                setError("jpg, jpeg, png images and PDF are allowed.");
                return;
            }
            const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
            if (fileSizeInMB > 10) {
                setError("File size is more than 10 MB.");
                return;
            } else {
                setError("");
                setSuccessMessage("uploaded.");
                setTimeout(() => {
                    // Clear success message after 3 seconds
                    setSuccessMessage("");
                }, 5000);
            }
            setFileName(file.name);
            setSelectedFile(file);
            setFileType(file.type);
        } else {
            setFileName("");
            setSelectedFile(null);
            setFileType("");
        }
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setFileName("");
        setFileType("");
    };

    const handleDownload = () => {
        const url = URL.createObjectURL(selectedFile);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleEnlarge = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (event) => {
        event.target.value = event.target.value.toUpperCase();
    };

    return (
        <div className="flex flex-col gap-1 relative">
            <div className="flex flex-col gap-1">
                <label htmlFor={id} className="text-xs font-[400]">
                    {label.toUpperCase()}
                    {isRequired && <span className="text-red-500 gap-3">*</span>}
                </label>
                {/* <input
                    type="text"
                    required
                    readOnly={readOnly}
                    className="p-2  border uppercase rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs"
                    id={id}
                    placeholder="ENTER"
                    onChange={handleChange}
                /> */}
                <Select
                    options={options}
                    // className="px-1.5 py-2 border rounded grow min-w-[14rem] text-gray-400 text-xs outline-none bg-white"
                    className="text-black text-xs select-bar uppercase"
                    id={id}
                    isSearchable
                    isDisabled={readOnly}
                    onChange={handleChange}
                    closeMenuOnSelect={true}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 4,
                        colors: {
                            ...theme.colors,
                            primary: '#e5e7eb',
                        },
                    })}
                />
            </div>
            <div>
                <div className="flex justify-between items-center mt-1">
                    <div>
                        <label
                            htmlFor={`file-upload-${id}`}
                            className="cursor-pointer text-xs bg-prp-color text-white p-2 rounded-md"
                        >
                            Attachment
                        </label>
                        <input
                            type="file"
                            id={`file-upload-${id}`}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {fileName && (
                        <div className="flex items-center space-x-2">
                            <button onClick={handleDownload} className="bg-prp-color text-white p-2 rounded">
                                <FaDownload h-8 w-8 />
                            </button>
                            <button onClick={handleCancel} className="bg-white txt-prp-color border border-prp p-2 rounded">
                                <MdCancel h-8 w-8 />
                            </button>
                            <button onClick={handleEnlarge} className="bg-prp-color text-white p-2 rounded">
                                <ImEnlarge h-8 w-8 />
                            </button>
                        </div>
                    )}

                    <div>
                        {!selectedFile && (
                            <div className="flex w-10 h-10 rounded-full border border-[#3D3D3D66]">
                                <span className="text-[#3D3D3D66] flex items-center justify-center text-[10px] text-center">
                                    No Preview
                                </span>
                            </div>
                        )}
                        {selectedFile && fileType.startsWith('image/') && (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border border-[#3D3D3D66]"
                            />
                        )}
                        {selectedFile && fileType === 'application/pdf' && (
                            <embed
                                src={URL.createObjectURL(selectedFile)}
                                type="application/pdf"
                                className="w-10 h-10 border border-[#3D3D3D66]"
                            />
                        )}
                    </div>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Enlarge File"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <div className="coman-modal-flex">
                        {fileName && (
                            <div className="coman-modal-text">
                                <p>{fileName}</p>
                            </div>
                        )}
                        <div className="coman-modal">
                            <button onClick={handleDownload} className="modal-btn-comman modal-btn-dwl"><FaDownload h-8 w-8 /> </button>
                            <button onClick={closeModal} className="modal-btn-comman modal-btn-cnl"><MdCancel h-8 w-8 /></button>
                        </div>
                    </div>
                    {selectedFile && fileType.startsWith('image/') && (
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Enlarged"
                            className="w-full h-auto"
                        />
                    )}
                    {selectedFile && fileType === 'application/pdf' && (
                        <embed
                            src={URL.createObjectURL(selectedFile)}
                            type="application/pdf"
                            alt="Enlarged"
                            className="w-full h-auto"
                        />
                    )}
                </Modal>
            </div>
            {error && <p className="absolute -bottom-6 text-[10px] font-normal mb-2" style={{ color: 'red' }}>{error}</p>}
            {successMessage && (
                <p className="absolute -bottom-6 text-[10px] font-normal mb-2" style={{ color: 'green' }}>{successMessage}</p>
            )}
        </div>
    );
}

CustomDropDownUpload.defaultProps = {
    isRequired: true,
};

 