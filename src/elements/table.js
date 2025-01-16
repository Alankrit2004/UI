import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { CustomButton1 } from "components";
import { DataLoading } from "./loader";
import { Pagination } from "@mui/material";
import styled from "styled-components";
import { CommonConstant } from "utility";
import { BsFillEyeFill } from "react-icons/bs";


const PaginationContainer = styled.div`
    display: flex;
    justify-content: end;
`;

const AppPagination = ({ totalCount, pageNo, pageSize, pageChanged }) => {
    return (
        <PaginationContainer>
            <Pagination
                count={Math.ceil(totalCount / (pageSize || CommonConstant.defaultPageSize))}
                defaultPage={pageNo}
                shape="rounded"
                onChange={(_, page) => {
                    pageChanged(page);
                }}
            />
        </PaginationContainer>
    );
};

const convertData = (item, transformer) => {
    console.log("🚀 ~ file: table.js:33 ~ transformer:", transformer)
    const text = item[transformer.field];
    if (transformer.render) {
        return transformer.render(text);
    }
    if (transformer.status) {
        return text ? <span className="text-Active">Active</span> : <span className="text-bgred">inActive</span>;
    }
    if (transformer.action) {
        if (transformer.onEdit) {
            return (
                <div>
                    <CustomButton1
                        icon={<BiEdit />}
                        tooltip="Edit"
                        className="bg-sixt justify-center items-center text-white min-w-[30px]"
                        onClick={() => transformer.onEdit(item)}
                    />
                    <CustomButton1
                        icon={<BsFillEyeFill />} // Change this if you have a different icon for "view"
                        tooltip="View"
                        className="bg-gray-500   justify-center items-center text-white ml-2 min-w-[30px]"
                        // icon={<BiEdit />
                        onClick={() => transformer.onView(item)}
                    />
                </div>
            );
        }
        if (transformer.onView) {
            return (
                <CustomButton1
                    icon={<BsFillEyeFill />} // Change this if you have a different icon for "view"
                    tooltip="View"
                    className="bg-gray-500 text-white ml-1 grow min-w-[30px]"
                    // icon={<BiEdit />
                    onClick={() => transformer.onView(item)}
                />
            );
        }
        if (transformer.onNavigate) {
            return (
                <CustomButton1
                    icon={<AiOutlineSetting />}
                    tooltip="Manage Access"
                    className="bg-[#979799] justify-center mx-auto items-center text-white grow min-w-[30px]"
                    onClick={() => transformer.onNavigate(item)}
                />
            );
        }
    }
    if (transformer.action) {
        if (transformer.onEdit) {
            return (
                <CustomButton1
                    icon={<BiEdit />}
                    tooltip="Edit"
                    className="bg-sixt justify-center items-center text-white min-w-[30px]"
                    onClick={() => transformer.onEdit(item)}
                />
            );
        }
        if (transformer.onView) {
            return (
                <CustomButton1
                    icon={<BsFillEyeFill />} // Change this if you have a different icon for "view"
                    tooltip="View"
                    className="bg-gray-500 text-white ml-1 grow min-w-[30px]"
                    // icon={<BiEdit />
                    onClick={() => transformer.onView(item)}
                />
            );
        }
        if (transformer.onNavigate) {
            return (
                <CustomButton1
                    icon={<AiOutlineSetting />}
                    tooltip="Manage Access"
                    className="bg-[#979799] justify-center items-center text-white grow min-w-[30px]"
                    onClick={() => transformer.onNavigate(item)}
                />
            );
        }
    }
    return text;
};

export const AppTable = ({ columns = [], data = [], loading, pageSize, pageNo, totalCount, pageChanged }) => {
    return (
        <div>
            <div className="mt-7 max-w-[100vw] hide-scrollbar overflow-auto table-container">
                <table className="w-full custom-table" border={1}>
                    <thead>
                        <tr className="table-heading">
                            {columns.map((ele, index) => (
                                <td key={index}>{ele.header}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={columns.length} className="py-5">
                                    <DataLoading />
                                </td>
                            </tr>
                        )}
                        {!loading &&
                            data.map((item, index) => (
                                <tr key={item.Id || index}>
                                    {columns.map((ele, subIndex) => (
                                        <td key={subIndex} className="py-4 justify-center items-center">
                                            {ele.index ? pageSize * (pageNo - 1) + index + 1 : convertData(item, ele)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        {!loading && data.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="py-5 text-center">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-5 mb-5 text-end py-2">
                <AppPagination pageNo={pageNo} totalCount={totalCount} pageSize={pageSize} pageChanged={pageChanged} />
            </div>
        </div>
    );
};
