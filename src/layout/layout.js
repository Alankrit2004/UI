import { Navbar, NavTabs } from "components";
import React, { useState } from "react";
import styled from "styled-components";

let [onlyIcon, setOnlyIcon] = [false, null];

const LayoutSection = styled.section`
    .bg-prp-color {
        background-color: ${({ theme }) => theme.colors.primary};
    }
    .txt-prp-color {
        color: ${({ theme }) => theme.colors.primary};
    }
    .border-prp {
        border-color: ${({ theme }) => theme.colors.primary};
    }
    .custmbtn {
        background: ${({ theme }) => theme.colors.primary};
        border: 1px;
        color: #fff !important;
    }

    .smlbtn {
        border-radius: 8px;
        border: 1px solid rgba(61, 61, 61, 0.2);
        background: ${({ theme }) => theme.colors.primary};
        padding: 0.4rem 0.6rem 0.4rem 0.6rem;
        margin-left: 0.2rem;
        font-family: Mitr;
        font-size: 0.8rem;
        color: #ffffff;
    }
`;

export const Layout = ({ children }) => {
    [onlyIcon, setOnlyIcon] = useState(true);
    return (
        <LayoutSection className="flex flex-col h-screen p-2 bg-white uppercase">
            {/* NAVIGATION BAR */}
            <section>
                <Navbar />
            </section>

            {/* ASIDE TABS + DYNAMIC SECTIONS  */}
            <section className="flex gap-4 grow h-[100vh]">
                {/* ASIDE */}
                <div
                    className={` bg-white${onlyIcon ? " w-[7.2vw]  min-w-[7.2vw]" : " w-[21vw]  "
                        } p-3 hidden lg:block rounded mt-2 overflow-x-hidden border border-[#3D3D3D66]
        overflow-auto  transition-all`}
                    style={{ borderRadius: "10px", overflow: "auto", height: "87vh" }}
                >
                    <NavTabs />
                </div>

                {/* DYNAMIC SECTIONS */}
                <div
                    className="mt-1 rounded grow overflow-hidden "
                    style={{ borderRadius: "10px", overflowY: "auto", height: "87vh", width: "22vw" }}
                >
                    {children}
                </div>
            </section>
        </LayoutSection>
    );
};

export { onlyIcon, setOnlyIcon };
