// CORE
import * as React from "react";
import { useState } from "react";
import { BsCheck } from "react-icons/bs"
import Select from 'react-select';
import '../../../assets/css/selectbar.css'

// COMPONENTS
import {CustomButton1} from "components";
import {PopUp} from "components";

import {AddRole} from "../ManageTerritoryAddOptions/AddRole"
import {AddState} from "../ManageTerritoryAddOptions/AddState";
import {AddDistrict} from "../ManageTerritoryAddOptions/AddDistrict";

// ICONS
export function ManageTerritoryEdit({ checkboxEdit, setCheckboxEdit, onSubmit, onCancel }) {

    let [popupRole, setPopupRole] = useState(false);
    let [popupState, setPopupState] = useState(false);
    let [popupDistrict, setPopupDistrict] = useState(false);

    const [regionName, setRegionName] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [regions, setRegions] = useState([]); // Sample initial regions

    const [stateName, setStateName] = useState('');
    const [isActiveState, setIsActiveState] = useState(false);
    const [states, setStates] = useState([]);

    const [districtName, setDistrictName] = useState('');
    const [isActiveDistrict, setIsActiveDistrict] = useState(false);
    const [districts, setDistricts] = useState([]);

    // region
    const handleRegionNameChange = (e) => {
        setRegionName(e.target.value);
    };

    const handleIsActiveChange = (e) => {
        setIsActive(e.target.checked);
    };

    const handleSubmit = () => {
        // Add the new region to the dropdown options
        if (regionName.trim() !== '') {
            const newRegion = { name: regionName, isActive: isActive };
            setRegions([...regions, newRegion]);
            // Optionally, you can clear the form fields after submission
            setRegionName('');
            setIsActive(false);
            setPopupRole(false); // Close the popup after submission
        }
    };

    const optionsRegions = regions.map(region => ({
        value: region.name,
        label: region.name
    }));

    // state
    const handleStateNameChange = (e) => {
        setStateName(e.target.value);
    };

    const handleIsActiveChangeState = (e) => {
        setIsActiveState(e.target.checked);
    };

    const handleSubmitState = () => {
        // Add the new region to the dropdown options
        if (stateName.trim() !== '') {
            const newRegion = { name: stateName, isActive: isActiveState };
            setStates([...states, newRegion]);
            // Optionally, you can clear the form fields after submission
            setStateName('');
            setIsActiveState(false);
            setPopupState(false); // Close the popup after submission
        }
    };

    const optionsState = states.map(region => ({
        value: region.name,
        label: region.name
    }));

    // district 
    const handleDistrictNameChange = (e) => {
        setDistrictName(e.target.value);
    };

    const handleIsActiveChangeDistrict = (e) => {
        setIsActiveDistrict(e.target.checked);
    };

    const handleSubmitDistrict = () => {
        // Add the new region to the dropdown options
        if (districtName.trim() !== '') {
            const newRegion = { name: districtName, isActive: isActiveDistrict };
            setDistricts([...districts, newRegion]);
            // Optionally, you can clear the form fields after submission
            setDistrictName('');
            setIsActiveDistrict(false);
            setPopupDistrict(false); // Close the popup after submission
        }
    };

    const optionsDistrict = districts.map(region => ({
        value: region.name,
        label: region.name
    }));

    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                    <h1 className="text-l font-weight-[300]">Edit Territories</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-4 mx-auto">
                    <div className="w-[700px] grid grid-cols-2 gap-4 md:grid-cols-3">
                        <div className="py-1 ">
                            <div className="flex justify-between mb-1">
                                <label htmlFor="id" className="text-xs font-400 ">
                                    Country Name<span className="text-red-500 gap-3">*</span>
                                </label>
                                <button type="submit" onClick={() => setPopupRole(true)}>
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0013 2.28564C5.40964 2.28564 1.66797 6.02731 1.66797 10.619C1.66797 15.2106 5.40964 18.9523 10.0013 18.9523C14.593 18.9523 18.3346 15.2106 18.3346 10.619C18.3346 6.02731 14.593 2.28564 10.0013 2.28564Z" fill="#003C86" />
                                        <path d="M10.6263 11.244H13.3346C13.6763 11.244 13.9596 10.9606 13.9596 10.619C13.9596 10.2773 13.6763 9.99398 13.3346 9.99398H10.6263V7.28564C10.6263 6.94398 10.343 6.66064 10.0013 6.66064C9.65964 6.66064 9.3763 6.94398 9.3763 7.28564V9.99398H6.66797C6.3263 9.99398 6.04297 10.2773 6.04297 10.619C6.04297 10.9606 6.3263 11.244 6.66797 11.244H9.3763V13.9523C9.3763 14.294 9.65964 14.5773 10.0013 14.5773C10.343 14.5773 10.6263 14.294 10.6263 13.9523V11.244Z" fill="white" />
                                    </svg>
                                </button>
                            </div>

                            <Select
                                options={optionsRegions}
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
                        <div className="py-1">
                            <div className="flex justify-between mb-1">
                                <label htmlFor="id" className="text-xs font-400 ">
                                    State Name<span className="text-red-500 gap-3">*</span>
                                </label>
                                <button type="submit" onClick={() => setPopupState(true)}>
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0013 2.28564C5.40964 2.28564 1.66797 6.02731 1.66797 10.619C1.66797 15.2106 5.40964 18.9523 10.0013 18.9523C14.593 18.9523 18.3346 15.2106 18.3346 10.619C18.3346 6.02731 14.593 2.28564 10.0013 2.28564Z" fill="#003C86" />
                                        <path d="M10.6263 11.244H13.3346C13.6763 11.244 13.9596 10.9606 13.9596 10.619C13.9596 10.2773 13.6763 9.99398 13.3346 9.99398H10.6263V7.28564C10.6263 6.94398 10.343 6.66064 10.0013 6.66064C9.65964 6.66064 9.3763 6.94398 9.3763 7.28564V9.99398H6.66797C6.3263 9.99398 6.04297 10.2773 6.04297 10.619C6.04297 10.9606 6.3263 11.244 6.66797 11.244H9.3763V13.9523C9.3763 14.294 9.65964 14.5773 10.0013 14.5773C10.343 14.5773 10.6263 14.294 10.6263 13.9523V11.244Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                            <Select
                                options={optionsState}
                                // className="px-1.5 py-2 border rounded grow min-w-[14rem] text-gray-400 text-xs outline-none bg-white"
                                className="text-gray-400 text-xs select-bar"
                                id="id2"
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
                        <div className="py-1">
                            <div className="flex justify-between mb-1">
                                <label htmlFor="id" className="text-xs font-400 ">
                                    District / Provience Name<span className="text-red-500 gap-3">*</span>
                                </label>
                                <button type="submit" onClick={() => setPopupDistrict(true)}>
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0013 2.28564C5.40964 2.28564 1.66797 6.02731 1.66797 10.619C1.66797 15.2106 5.40964 18.9523 10.0013 18.9523C14.593 18.9523 18.3346 15.2106 18.3346 10.619C18.3346 6.02731 14.593 2.28564 10.0013 2.28564Z" fill="#003C86" />
                                        <path d="M10.6263 11.244H13.3346C13.6763 11.244 13.9596 10.9606 13.9596 10.619C13.9596 10.2773 13.6763 9.99398 13.3346 9.99398H10.6263V7.28564C10.6263 6.94398 10.343 6.66064 10.0013 6.66064C9.65964 6.66064 9.3763 6.94398 9.3763 7.28564V9.99398H6.66797C6.3263 9.99398 6.04297 10.2773 6.04297 10.619C6.04297 10.9606 6.3263 11.244 6.66797 11.244H9.3763V13.9523C9.3763 14.294 9.65964 14.5773 10.0013 14.5773C10.343 14.5773 10.6263 14.294 10.6263 13.9523V11.244Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                            <Select
                                options={optionsDistrict}
                                // className="px-1.5 py-2 border rounded grow min-w-[14rem] text-gray-400 text-xs outline-none bg-white"
                                className="text-gray-400 text-xs select-bar"
                                id="id4"
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
                        <div className="py-1 flex items-end">
                            {/* <CustomCheckBox2
                                            label={"In Active"}
                                            state={checkboxAdd}
                                            setState={setCheckboxAdd}
                                        /> */}
                            <div className="flex gap-1 items-center">
                                <div
                                    className={`${checkboxEdit ? "bg-prp-color" : "bg-white"
                                        } border flex justify-center items-center rounded h-[34px] w-[34px]`}
                                    onClick={() => setCheckboxEdit(!checkboxEdit)}
                                >
                                    <BsCheck className="text-2xl text-white" />
                                </div>
                                <label htmlFor="id" className="text-xs font-400">
                                    Is Active
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-5">
                    <div>
                        <CustomButton1 label={"Update"} className="text-white bg-prp-color" />
                    </div>
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                    </div>
                </div>
            </div>

            {popupRole && (
                <PopUp>
                    <AddRole
                        regionName={regionName}
                        handleRegionNameChange={handleRegionNameChange}
                        isActive={isActive}
                        handleIsActiveChange={handleIsActiveChange}
                        onSubmit={handleSubmit}
                        onCancel={() => setPopupRole(false)}
                    />
                </PopUp>
            )}

            {popupState && (
                <PopUp>
                    <AddState
                        stateName={stateName}
                        handleStateNameChange={handleStateNameChange}
                        isActiveState={isActiveState}
                        handleIsActiveChangeState={handleIsActiveChangeState}
                        onSubmit={handleSubmitState}
                        onCancel={() => setPopupState(false)}
                    />
                </PopUp>
            )}

            {popupDistrict && (
                <PopUp>
                    <AddDistrict
                        districtName={districtName}
                        handleDistrictNameChange={handleDistrictNameChange}
                        isActiveDistrict={isActiveDistrict}
                        handleIsActiveChangeDistrict={handleIsActiveChangeDistrict}
                        onSubmit={handleSubmitDistrict}
                        onCancel={() => setPopupDistrict(false)}
                    />
                </PopUp>
            )}
        </>
    )
}
