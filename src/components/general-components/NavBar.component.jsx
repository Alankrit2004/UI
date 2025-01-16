import { FiMenu } from "react-icons/fi";
import { BsBellFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoMdLock } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineCaretDown, AiOutlineMenu } from "react-icons/ai";

import { NavTabs } from "./NavTabs.components";
import { ToolTipY } from "./ToolTipY.component";
import { IconBadge } from "./IconBadge.component";


import Logo from "../../assets/logo.svg";

import * as React from "react";
import { useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import LogoImage from '../../assets/project-images/logo/svLogo.svg'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onlyIcon, setOnlyIcon } from "layout";
import { useAuth } from "context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
    let asideRef = useRef(null);
    let overlayRef = useRef(null);

    const [userName, setUserName] = useState("");

    useEffect(() => {
        setOnlyIcon(false);

        // Fetch username from local storage
        const token = JSON.parse(localStorage.getItem('user'));
        if (token && token.userName) {
            setUserName(token.userName);
        }
    }, []);

    function open() {
        asideRef.current.style.width = "60%";
        overlayRef.current.style.width = "100%";
    }
    function close() {
        asideRef.current.style.width = "0px";
        overlayRef.current.style.width = "0px";
    }

    useEffect(() => {
        setOnlyIcon(false);
    }, []);

    function Aside() {
        return (
            <div className="lg:hidden uppercase">
                {/* ASIDE */}
                <div
                    className="fixed top-0 left-0 z-50 w-0 h-screen transition-all bg-white custom-shadow overflow-clip"
                    ref={asideRef}
                >
                    {/* CROSS BUTTON */}
                    <div className="p-5 md:p-6">
                        <RxCross2 className="icon press-3" onClick={close} />
                    </div>

                    {/* NAVTABS */}
                    <div
                        className="m-5 max-h-[80vh] overflow-x-hidden overflow-y-auto hide-scrollbar"
                        style={{ border: "1px solid #3D3D3D66" }}
                    >
                        <NavTabs />
                    </div>
                </div>

                {/* OVERLAY */}
                <div
                    className="fixed left-0 top-0 w-0 h-screen bg-[rgba(0,0,0,0.1)] custom-shadow z-40"
                    ref={overlayRef}
                    onClick={close}
                ></div>
            </div>
        );
    }
    const { logout } = useAuth()
    const navigate = useNavigate()

    const logOuts = async () => {
        logout()
        navigate("/")
    };

    return (
        <>
            <section>
                {/* ASIDE */}
                <Aside />

                {/* TOP NAVBAR */}
                <div className="flex uppercase ">
                    {/*  */}
                    <div className="">
                        {/* LEFT : MENU ICON */}
                        <div onClick={open} className="lg:hidden">
                            <FiMenu className="inline-block icon press-5" />
                        </div>
                        {/* LEFT : LOGO */}
                        <div
                            className="justify-between items-center  bg-white hidden rounded-xl lg:flex lg:w-[320px] border-r relative"
                            style={{ border: "1px solid #3D3D3D66" }}
                        >
                            <img src={LogoImage} className="m-2 w-[3.5rem] h-[3.5rem]" alt="" />
                            <div
                                className="w-[2.5rem] flex items-center bg-prp-color justify-center h-[2.5rem] border rounded-md text-white press-2 absolute right-[10px]"
                                onClick={() => setOnlyIcon(!onlyIcon)}
                            >
                                <AiOutlineMenu className={`transition ${onlyIcon ? " rotate-180 " : "  "} `} />
                            </div>
                        </div>
                    </div>

                    <div className="flex ml-4 px-10 bg-prp-color rounded-xl  justify-between  border lg:px-0 lg:pr-2 grow uppercase">
                        {/* RIGHT : USER + NOTIFICATION */}
                        <div className="flex items-center gap-8 my-2 p-1 lg:ml-[80%] rounded-2xl bg-white">
                            {/* NOTIFICATION */}
                            <div>
                                <ToolTipY
                                    title={
                                        <IconBadge
                                            icon={<BsBellFill className="inline-block icon" />}
                                            badgeContent={"9+"}
                                        ></IconBadge>
                                    }
                                    content={
                                        <>
                                        </>
                                        // <>
                                        //     <div className="p-2 rounded whitespace-nowrap">
                                        //         {/* NOTIFICATION 1 */}
                                        //         <div className="p-2 my-1 border rounded shadow">
                                        //             <div className="flex items-center justify-between gap-16">
                                        //                 <span className="font-semibold text-green-400">Completed</span>
                                        //                 <span className="text-xs">20-05-2023 15:02</span>
                                        //             </div>
                                        //             <div className="text-xs">Inquiry VFABNKINQ0065 is</div>
                                        //             <div className="text-xs"> Completed by Rohnit</div>
                                        //         </div>

                                        //         {/* NOTIFICATION 2 */}
                                        //         <div className="p-2 my-1 border rounded shadow">
                                        //             <div className="flex items-center justify-between gap-16">
                                        //                 <span className="font-semibold text-red-400">Revoke</span>
                                        //                 <span className="text-xs">20-05-2023 15:02</span>
                                        //             </div>
                                        //             <div className="text-xs">Inquiry VFABNKINQ0065 is</div>
                                        //             <div className="text-xs"> Completed by Rohnit</div>
                                        //         </div>

                                        //         {/* NOTIFICATION 3 */}
                                        //         <div className="p-2 my-1 border rounded shadow">
                                        //             <div className="flex items-center justify-between gap-16">
                                        //                 <span className="font-semibold text-green-400">Completed</span>
                                        //                 <span className="text-xs">20-05-2023 15:02</span>
                                        //             </div>
                                        //             <div className="text-xs">Inquiry VFABNKINQ0065 is</div>
                                        //             <div className="text-xs"> Completed by Rohnit</div>
                                        //         </div>

                                        //         {/* NOTIFICATION 4 */}
                                        //         <div className="p-2 my-1 border rounded shadow">
                                        //             <div className="flex items-center justify-between gap-16">
                                        //                 <span className="font-semibold text-red-400">Revoke</span>
                                        //                 <span className="text-xs">20-05-2023 15:02</span>
                                        //             </div>
                                        //             <div className="text-xs">Inquiry VFABNKINQ0065 is</div>
                                        //             <div className="text-xs"> Completed by Rohnit</div>
                                        //         </div>
                                        //     </div>
                                        // </>
                                    }
                                    height="200px"
                                    direction="down"
                                    position="right"
                                ></ToolTipY>
                            </div>

                            {/* USER */}
                            <div>
                                <ToolTipY
                                    title={
                                        <div className="flex items-center gap-2 border-0 border-b rounded-l-full press-1">
                                            <div className="flex items-center justify-center p-2 rounded-full bg-prp-color">
                                                <FaUserAlt className="icon text-white text-[15px] " />
                                            </div>
                                            <div className="text-xs">{userName}</div>
                                            <div>
                                                <BiChevronDown className="" />
                                            </div>
                                        </div>
                                    }
                                    content={
                                        <>
                                            <div className="flex flex-col gap-2 p-2 overflow-hidden rounded whitespace-nowrap">
                                                {/* <Button size="small" className="justify-start text-left txt-prp-color">
                                                <div className="flex items-center gap-2 capitalize">
                                                    <IoMdLock className="inline-block text-2xl " />
                                                    <span className="mt-[2px]">Reset Password</span>
                                                </div>
                                            </Button> */}
                                                <Button size="small" className="justify-start text-left text-red-400">
                                                    <div className="flex items-center gap-2 capitalize" onClick={logOuts}>
                                                        <BiLogOutCircle className="inline-block text-2xl " />
                                                        <span className="mt-[2px] uppercase">Logout</span>
                                                    </div>
                                                </Button>
                                            </div>
                                        </>
                                    }
                                    height="50px"
                                    direction="down"
                                    position="right"
                                ></ToolTipY>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer autoClose={2000} />
        </>

    );
}