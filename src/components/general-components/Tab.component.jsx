// CORE
import { useRef } from "react";

import { onlyIcon, setOnlyIcon } from "layout";

// ICONS

export function Tab(props) {
    return (
        <div
            className={` border-b-[3px] ${props.activeTab === props.index
                    ? " border-prp "
                    : " border-transparent "
                } transition-all ease-in-out grow flex justify-center p-3 capitalize font-400`}
            onClick={() => props.setActiveTab(props.index)}
        >
            {props.label.toUpperCase()}
        </div>
    );
}

export function TabContainer(props) {
    let firstRef = useRef(null);
    let lastRef = useRef(null);
    let scrollRef = useRef(null);

    return (
        <div className="flex items-stretch uppercase">
            {props.showArrow ? (
                <div
                    onClick={() => scrollRef.current.scrollBy(-100, 0)}
                    onDoubleClick={() =>
                        firstRef.current.scrollIntoView({ behavior: "smooth" })
                    }
                    className="w-[20px] press-3 flex justify-center items-center"
                >
                    {/* <AiOutlineCaretLeft /> */}
                </div>
            ) : (
                ""
            )}

            <div
                className={`flex grow ${props.grow === false ? " justify-center " : " "
                    } mx-auto max-w-[85vw] ${onlyIcon ? " lg:max-w-[88vw] " : " lg:max-w-[70vw] "} transition ease-out duration-1000 overflow-x-auto hide-scrollbar whitespace-nowrap scroll-smooth`}
                ref={scrollRef}
            >
                <div ref={firstRef}></div>
                <div
                    className={`flex ${props.grow === false ? "" : " grow "} `}
                >
                    {props.children}
                </div>
                <div ref={lastRef}></div>
            </div>
            {props.showArrow ? (
                <div
                    className="w-[20px] press-3 flex justify-center items-center"
                    onClick={() => scrollRef.current.scrollBy(100, 0)}
                    onDoubleClick={() =>
                        lastRef.current.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    {/* <AiOutlineCaretRight /> */}
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export function TabContent(props) {
    return (
        <div
            className={` ${props.activeTab === props.index ? "block " : " hidden "
                } `}
        >
            {props.children}
        </div>
    );
}

