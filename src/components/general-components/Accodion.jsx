import { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

export const Accordion = ({ title, children, isOpen, onClick  }) => {
  // const [isOpen, setIsOpen] = useState(true);

  // const toggleAccordion = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="p-2">
      <div
        className="flex   border-b-2 justify-between rounded-t-lg cursor-pointer"
        onClick={onClick}
      >
        <h1 className="text-l font-weight-[400] ">{title}</h1>
        {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </div>
      {isOpen && <div className="p-4 mx-auto">{children}</div>}
    </div>
  );
};


// // import React from 'react';

// const Accordion = ({ title, children, isOpen, onClick }) => {
//   return (
//     <div className="accordion-item">
//       <div className="accordion-title" onClick={onClick}>
//         <h2>{title}</h2>
//         {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
//       </div>
//       {isOpen && <div className="accordion-content">{children}</div>}
//     </div>
//   );
// };
