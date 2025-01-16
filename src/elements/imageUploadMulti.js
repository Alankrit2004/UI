import React, { useState } from "react";
import { Avatar, IconButton, Dialog } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { toast } from "react-toastify";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { MdOutlineDownloading } from "react-icons/md";

const checkPDF = (url, file) =>
    (url && url?.includes(".pdf")) ||
    (file && file?.type?.includes("pdf")) ||
    false;

const checkImage = (url, file) =>
    url?.includes(".jpg") ||
    url?.includes(".png") ||
    url?.includes(".jpeg") ||
    ["jpg", "png", "jpeg"].includes(file?.name?.split(".").pop()) ||
    false;

const PDFImage = () => (
    <button className="bg-blue-500 text-white rounded-lg p-2 mr-2">
        <MdDescription size={30} />
    </button>
);

const ImagePreview = ({ url, file }) => (
    <Avatar
        variant="round"
        alt="Preview"
        src={url || URL.createObjectURL(file)}
        sx={{ width: 70, height: 70 }}
        className="mr-2"
    />
);

export const FormUploadFieldMulti = (props) => {
    const { setValue, urlName, originalFileNames, base64Names, urls } = props;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");
    const uniqueId = props.uniqueId ? props.uniqueId : props.label;

    const handleFileChange = (files) => {
        const newFiles = Array.from(files);
        const updatedFiles = [...selectedFiles, ...newFiles];
        setSelectedFiles(updatedFiles);

        updatedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue(`${base64Names}[${index}]`, reader.result.split(",")[1]);
            };
            reader.readAsDataURL(file);
            setValue(`${originalFileNames}[${index}]`, file.name || "");
        });
    };

    const handleChange = (e) => {
        const { files } = e.target;
        if (files.length) {
            const fileArray = Array.from(files);
            fileArray.forEach((file) => {
                if (file.size > 102224) {
                    toast.warn("Size must be less than 100MB");
                }
            });
            handleFileChange(fileArray);
        }
    };

    const removeFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);

        setValue(`${urlName}[${index}]`, "");
        setValue(`${originalFileNames}[${index}]`, "");
        setValue(`${base64Names}[${index}]`, "");
    };

    const downloadFile = (file) => {
        const fileUrl = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePdfPreview = (file) => {
        const pdfUrl = URL.createObjectURL(file);
        setPdfPreviewUrl(pdfUrl);
        setIsPdfPreviewOpen(true);
    };

    const handleClosePdfPreview = () => {
        setIsPdfPreviewOpen(false);
        setPdfPreviewUrl("");
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={uniqueId} className="text-sm font-medium">
                {props?.label}
            </label>
            <div className="flex items-left gap-2">
                <label
                    htmlFor={uniqueId}
                    className="text-center cursor-pointer text-sm font-medium bg-sixt text-white p-2 rounded-md"
                    style={{ backgroundColor: "#1C4584" }}
                >
                    Upload
                </label>
                <input
                    name={uniqueId}
                    type="file"
                    multiple
                    id={uniqueId}
                    accept="image/png, image/jpg, image/jpeg, application/pdf"
                    className="hidden"
                    onChange={handleChange}
                />
            </div>

            {selectedFiles.length > 0 && (
                <PhotoProvider>
                    <div className="flex flex-row flex-wrap items-center gap-4">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center">
                                {checkPDF("", file) ? (
                                    <>
                                        <PDFImage />
                                        <IconButton size="medium" className="p-0 bg-white" onClick={() => handlePdfPreview(file)}>
                                            <MdDescription size={28} color="#000000" />
                                        </IconButton>
                                    </>
                                ) : null}
                                {checkImage("", file) ? (
                                    <PhotoView key={index} src={URL.createObjectURL(file)}>
                                        <ImagePreview file={file} />
                                    </PhotoView>
                                ) : null}
                                <IconButton size="medium" className="p-0 bg-white" onClick={() => removeFile(index)}>
                                    <AiFillCloseCircle size={28} color="#000000" />
                                </IconButton>
                                <IconButton size="medium" className="p-0 bg-white" onClick={() => downloadFile(file)}>
                                    <MdOutlineDownloading size={28} color="#000000" />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                </PhotoProvider>
            )}

            {/* PDF Preview Dialog */}
            <Dialog open={isPdfPreviewOpen} onClose={handleClosePdfPreview} fullWidth maxWidth="lg">
                <div className="relative w-full h-[80vh]">
                    <IconButton size="large" onClick={handleClosePdfPreview} className="absolute right-2 top-2 z-50">
                        <AiFillCloseCircle size={32} color="black" />
                    </IconButton>
                    <iframe
                        src={pdfPreviewUrl}
                        title="PDF Preview"
                        width="100%"
                        height="100%"
                    ></iframe>
                </div>
            </Dialog>
        </div>
    );
};
