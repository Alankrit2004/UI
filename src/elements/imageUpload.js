import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { toast } from "react-toastify";
import { PhotoView } from "react-photo-view";
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineDownloading } from "react-icons/md";

const checkPDF = (url, file) => (url && url?.includes(".pdf")) || (file && file?.type?.includes("pdf")) || false;
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
        alt="Cindy Baker"
        src={url || URL.createObjectURL(file)}
        sx={{ width: 70, height: 70 }}
        className="mr-2"
    />
);

export const FormUploadField = (props) => {
    const { setValue, urlName, orignalFileName, base64Name, url } = props;
    console.log("🚀 ~ file: imageUpload.js:36 ~ FormUploadField ~ urlName:", url)
    const [selectedFile, setSelectedFile] = useState(null);
    const [newurl, setnewUrl] = useState("");
    const uniqueId = props.uniqueId ? props.uniqueId : props.label;

    const handleChangeFile = (file) => {
        setValue(urlName, null);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue(base64Name, reader.result.split(",")[1]);
            };
            reader.readAsDataURL(file);
            setValue(orignalFileName, file.name || "");
        } else {
            setSelectedFile("");
            setValue(orignalFileName, "");
            setValue(base64Name, "");
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file?.size && file?.size > 102224) {
                toast.warn("Size Must be less than 100MB");
            } else {
                setSelectedFile(file);
                handleChangeFile(file);
            }
        } else {
            handleChangeFile(null);
            setSelectedFile(null);
        }
    };

    useEffect(() => {
        if (url) {
            setnewUrl(url)
        }
    }, [url]);

    const removeSelected = () => {
        setSelectedFile(null);
        handleChangeFile(null);
        setnewUrl("");
    };

    const downloadImage = (url) => {
        if (!url) {
            return;
        }
        window.open(url, "_blank");
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={uniqueId} className="text-xs font-medium">
                {props?.label}
            </label>
            {
                !selectedFile && !url && (
                    <div className="flex items-left  gap-2">
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
                            disabled={props?.mode === "View" ? true : false}
                            id={uniqueId}
                            accept="image/png, image/jpg, image/jpeg, application/pdf"
                            className="hidden"
                            onChange={handleChange}
                        />
                    </div>)
            }
            {

                <div className="flex flex-row items-center">
                    {checkPDF(newurl || "", selectedFile) && <PDFImage />}
                    {checkImage(newurl, selectedFile) && (
                        <div className="flex flex-row relative w-fit items-center	 ">
                            <ImagePreview url={newurl} file={selectedFile} />
                        </div>
                    )}
                    {(newurl || selectedFile) && (
                        <>
                            <div className="ms-3 border-2 p-1 rounded">
                                <IconButton size="medium" className="p-0 bg-white" onClick={removeSelected}>
                                    <AiFillCloseCircle size={28} color="#000000" />
                                </IconButton>
                            </div>
                            {newurl && (
                                <div className="ms-3 border-2 p-1 rounded">
                                    <IconButton
                                        size="medium"
                                        className="p-0 bg-white"
                                        onClick={() => downloadImage(newurl)}
                                    >
                                        <MdOutlineDownloading size={28} color="#000000" />
                                    </IconButton>
                                </div>
                            )}
                            {(newurl || selectedFile) && checkImage(newurl, selectedFile) && (
                                <div className="ms-3 border-2 p-1 rounded">
                                    <PhotoView src={newurl || URL.createObjectURL(selectedFile)}>
                                        <IconButton size="medium" className="p-0 bg-white	">
                                            <FaRegCopy color="#000000" />
                                        </IconButton>
                                    </PhotoView>
                                </div>
                            )}
                        </>
                    )}
                </div>}
        </div>
    );
};