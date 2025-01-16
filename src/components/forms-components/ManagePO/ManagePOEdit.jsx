// CORE
import * as React from "react";
import { useState } from "react";
import { BsCheck } from "react-icons/bs"
import Select from 'react-select';
import '../../../assets/css/selectbar.css'

// COMPONENTS
import { CustomButton1 } from "components";
import { CustomTextField2 } from "components";
import { CustomSelect1 } from "components";
import { CustomCheckBox2 } from "components";
import { CustomBrowse } from "components";
import { CustomInputNumber } from "components";
import { CustomCheckBox3 } from "components";
import { CustomSelect3 } from "components";
import { PopUp } from "components";
import { CustomSelectMulti } from "components";

import { DeliveryTermsAdd } from "./DeliveryTermsAdd";
import { PaymentsTermsAdd } from "./PaymentsTermsAdd";

export function ManagePOEdit({ onCancel }) {
    let [deliveryTermsAdd, setDeliveryTermsAdd] = useState(false);
    let [paymentsTermsAdd, setPaymentsTermsAdd] = useState(false);
    const [checkboxAdd, setCheckboxAdd] = useState(true);
    const [poFlag, setPoFlag] = useState(false);
    const [qty, setQty] = useState("");
    const [curVal, setCurVal] = useState("");
    const [poNo, setPoNo] = useState("");

    const [deliveryTerms, setDeliveryTerms] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [deliveryTermsData, setDeliveryTermsData] = useState([]); // Sample initial deliveryTermsData

    const [paymentsTerms, setPaymentsTerms] = useState('');
    const [isActivePayment, setIsActivePayment] = useState(true);
    const [paymentsTermsData, setPaymentsTermsData] = useState([]); // Sample initial deliveryTermsData


    const handleRegionNameChange = (e) => {
        setDeliveryTerms(e.target.value);
    };

    const handlePaymentsChange = (e) => {
        setPaymentsTerms(e.target.value);
    };

    const handleSubmit = () => {
        // Add the new deliveryTerms to the dropdown options
        if (deliveryTerms.trim() !== '') {
            const newRegion = { name: deliveryTerms, isActive: isActive };
            setDeliveryTermsData([...deliveryTermsData, newRegion]);
            // Optionally, you can clear the form fields after submission
            setDeliveryTerms('');
            setDeliveryTermsAdd(false); // Close the popup after submission
        }
    };

    const handleSubmitPayments = () => {
        // Add the new deliveryTerms to the dropdown options
        if (paymentsTerms.trim() !== '') {
            const newRegion = { name: paymentsTerms, isActivePayment: isActivePayment };
            setPaymentsTermsData([...paymentsTermsData, newRegion]);
            // Optionally, you can clear the form fields after submission
            setPaymentsTerms('');
            setPaymentsTermsAdd(false); // Close the popup after submission
        }
    };

    const optionspaymentsTerms = paymentsTermsData.map(pData => ({
        value: pData.name,
        label: pData.name
    }));

    const optionsdeliveryTerms = deliveryTermsData.map(deliveryTerms => ({
        value: deliveryTerms.name,
        label: deliveryTerms.name
    }));

    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                    <h1 className="text-l font-weight-[400]">Edit PO Received</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-5 mx-auto">
                    <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                        <div className="">
                            <CustomSelect1
                                label={"Customer Name"}
                                placeholder={"ENTER"}
                            ></CustomSelect1>
                        </div>
                        <div>
                            <CustomTextField2 label={"Parent Customer"} placeholder={"Read only"} readOnly={true} />
                        </div>
                        <div>
                            <CustomTextField2 label={"Country"} placeholder={"Read Only"} readOnly={true} />
                        </div>
                        <div>
                            <CustomTextField2 label={"Port of Discharge"} placeholder={"ENTER"} />
                        </div>

                        <div className='pt-5'>
                            <CustomCheckBox3
                                label={"PO Received"}
                                state={poFlag}
                                setState={setPoFlag}
                            ></CustomCheckBox3>
                        </div>
                        <div className="">
                            <CustomInputNumber
                                label={"PO Number"}
                                placeholder={!poFlag ? "disabled " : "ENTER"}
                                value={poNo}
                                onChange={setPoNo}
                                disabled={!poFlag}  // Disable if PO flag is not checked
                            ></CustomInputNumber>
                        </div>
                        <div className="">
                            <div className="py-1 ">
                                <div className="flex justify-between mb-1">
                                    <label htmlFor="id" className="text-xs font-400 ">
                                        Payment Terms<span className="text-red-500 gap-3">*</span>
                                    </label>
                                    <button type="submit" onClick={() => setPaymentsTermsAdd(true)}>
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0013 2.28564C5.40964 2.28564 1.66797 6.02731 1.66797 10.619C1.66797 15.2106 5.40964 18.9523 10.0013 18.9523C14.593 18.9523 18.3346 15.2106 18.3346 10.619C18.3346 6.02731 14.593 2.28564 10.0013 2.28564Z" fill="#643c94" />
                                            <path d="M10.6263 11.244H13.3346C13.6763 11.244 13.9596 10.9606 13.9596 10.619C13.9596 10.2773 13.6763 9.99398 13.3346 9.99398H10.6263V7.28564C10.6263 6.94398 10.343 6.66064 10.0013 6.66064C9.65964 6.66064 9.3763 6.94398 9.3763 7.28564V9.99398H6.66797C6.3263 9.99398 6.04297 10.2773 6.04297 10.619C6.04297 10.9606 6.3263 11.244 6.66797 11.244H9.3763V13.9523C9.3763 14.294 9.65964 14.5773 10.0013 14.5773C10.343 14.5773 10.6263 14.294 10.6263 13.9523V11.244Z" fill="white" />
                                        </svg>
                                    </button>
                                </div>

                                <Select
                                    options={optionspaymentsTerms}
                                    // className="px-1.5 py-2 border rounded grow min-w-[14rem] text-gray-400 text-xs outline-none bg-white"
                                    className="text-gray-400 text-xs select-bar"
                                    id="id"
                                    isSearchable
                                    // onChange={onChange}
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
                        </div>
                        <div className="">
                            <CustomInputNumber
                                label={"Qty"}
                                placeholder={"ENTER"}
                                value={qty}
                                onChange={setQty}
                            ></CustomInputNumber>
                        </div>
                        <div className="">
                            <CustomSelect1 label={"Currency Type"} />
                        </div>
                        <div className="">
                            <CustomTextField2
                                label={"Currency Value"}
                                placeholder={"ENTER"}
                                value={curVal}
                                onChange={setCurVal}
                            ></CustomTextField2>
                        </div>

                        <div className="">
                            <CustomSelect1 label={"Paper Type"} isMulti={true} />
                        </div>
                        <div className="">
                            <CustomSelect1 label={"Brand"} isMulti={true} />
                        </div>
                        <div className="">
                            <CustomSelectMulti label={"Type of Packaging"}
                                options={[
                                    { value: '1', label: 'Copy Paper' },
                                    { value: '2', label: 'Bond Paper' },
                                    { value: '3', label: 'Cardstock' },
                                    { value: '4', label: 'Glossy Paper' },
                                    { value: '5', label: 'Matte Paper' },
                                    { value: '6', label: 'Newsprint' },
                                    { value: '7', label: 'Construction Paper' },
                                    // Add more options as needed
                                ]}
                            />
                        </div>
                        <div className="">
                            <div className="py-1 ">
                                <div className="flex justify-between mb-1">
                                    <label htmlFor="id" className="text-xs font-400 ">
                                        Delivery Terms<span className="text-red-500 gap-3">*</span>
                                    </label>
                                    <button type="submit" onClick={() => setDeliveryTermsAdd(true)}>
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0013 2.28564C5.40964 2.28564 1.66797 6.02731 1.66797 10.619C1.66797 15.2106 5.40964 18.9523 10.0013 18.9523C14.593 18.9523 18.3346 15.2106 18.3346 10.619C18.3346 6.02731 14.593 2.28564 10.0013 2.28564Z" fill="#643c94" />
                                            <path d="M10.6263 11.244H13.3346C13.6763 11.244 13.9596 10.9606 13.9596 10.619C13.9596 10.2773 13.6763 9.99398 13.3346 9.99398H10.6263V7.28564C10.6263 6.94398 10.343 6.66064 10.0013 6.66064C9.65964 6.66064 9.3763 6.94398 9.3763 7.28564V9.99398H6.66797C6.3263 9.99398 6.04297 10.2773 6.04297 10.619C6.04297 10.9606 6.3263 11.244 6.66797 11.244H9.3763V13.9523C9.3763 14.294 9.65964 14.5773 10.0013 14.5773C10.343 14.5773 10.6263 14.294 10.6263 13.9523V11.244Z" fill="white" />
                                        </svg>
                                    </button>
                                </div>

                                <Select
                                    options={optionsdeliveryTerms}
                                    // className="px-1.5 py-2 border rounded grow min-w-[14rem] text-gray-400 text-xs outline-none bg-white"
                                    className="text-gray-400 text-xs select-bar"
                                    id="id"
                                    isSearchable
                                    // onChange={onChange}
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
                        </div>
                        <div className="">
                            <CustomBrowse id="pi-upload-add" label="PO Upload" disabled={!poFlag} />
                        </div>
                        <div>
                            <CustomCheckBox2
                                label={"PO Status closed"}
                                state={checkboxAdd}
                                setState={setCheckboxAdd}
                            ></CustomCheckBox2>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-5">
                    <div>
                        <CustomButton1 label={"Submit"} className="text-white bg-prp-color" />
                    </div>
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                    </div>
                </div>
            </div>

            {deliveryTermsAdd && (
                <PopUp>
                    <DeliveryTermsAdd
                        deliveryTerms={deliveryTerms}
                        handleRegionNameChange={handleRegionNameChange}
                        isActive={isActive}
                        setIsActive={setIsActive}
                        handleSubmit={handleSubmit}
                        onCancel={() => setDeliveryTermsAdd(false)}
                    />
                </PopUp>
            )}

            {paymentsTermsAdd && (
                <PopUp>
                    <PaymentsTermsAdd
                        paymentsTerms={paymentsTerms}
                        handlePaymentsChange={handlePaymentsChange}
                        isActivePayment={isActivePayment}
                        setIsActivePayment={setIsActivePayment}
                        handleSubmitPayments={handleSubmitPayments}
                        onCancel={() => setPaymentsTermsAdd(false)}
                    />
                </PopUp>
            )}
        </>
    );
}

