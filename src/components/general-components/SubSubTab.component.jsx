import { onlyIcon } from "layout";
import { useRef } from "react";

// Sub Sub Tab component
export function SubSubTab(props) {
    return (
      <div
        className={` border-b-[3px] ${
          props.activeSubSubTab === props.index ? " border-prp " : " border-transparent "
        } transition-all ease-in-out grow flex justify-center p-3 capitalize font-400`}
        onClick={() => props.setActiveSubSubTab(props.index)}
      >
        {props.label.toUpperCase()}
      </div>
    );
  }
  
  // Sub Sub Tab Container component
  function SubSubTabContainer(props) {
    let firstSubSubTabRef = useRef(null);
    let lastSubSubTabRef = useRef(null);
    let scrollSubSubTabRef = useRef(null);
  
    return (
      <div className="flex items-stretch uppercase">
        {props.showArrow ? (
          <div
            onClick={() => scrollSubSubTabRef.current.scrollBy(-100, 0)}
            onDoubleClick={() => firstSubSubTabRef.current.scrollIntoView({ behavior: "smooth" })}
            className="w-[20px] press-3 flex justify-center items-center"
          >
            {/* Left arrow icon */}
          </div>
        ) : (
          ""
        )}
  
        <div
          className={`flex grow ${
            props.grow === false ? " justify-center " : " "
          } mx-auto max-w-[85vw] ${
            onlyIcon ? " lg:max-w-[88vw] " : " lg:max-w-[70vw] "
          } transition ease-out duration-1000 overflow-x-auto hide-scrollbar whitespace-nowrap scroll-smooth`}
          ref={scrollSubSubTabRef}
        >
          <div ref={firstSubSubTabRef}></div>
          <div className={`flex ${props.grow === false ? "" : " grow "} `}>
            {props.children}
          </div>
          <div ref={lastSubSubTabRef}></div>
        </div>
        {props.showArrow ? (
          <div
            className="w-[20px] press-3 flex justify-center items-center"
            onClick={() => scrollSubSubTabRef.current.scrollBy(100, 0)}
            onDoubleClick={() => lastSubSubTabRef.current.scrollIntoView({ behavior: "smooth" })}
          >
            {/* Right arrow icon */}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
  
  // Sub Sub Tab Content component
  export function SubSubTabContent(props) {
    return (
      <div
        className={` ${
          props.activeSubSubTab === props.index ? " block " : " hidden "
        } `}
      >
        {props.children}
      </div>
    );
  }
  