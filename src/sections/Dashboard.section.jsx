// CORE
import React, { Component } from "react";

import Button from "@mui/material/Button";
import im1 from "../assets/1.1.png";
import im2 from "../assets/1.2.png";
import im11 from "../assets/2.1.png";
import im12 from "../assets/2.2.png";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Title } from "components";
import { Cylindergraph } from "components";
// ICONS
import { MdDateRange, MdFastfood, MdFoodBank } from "react-icons/md";
import { HiClock } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { CustomSelect1 } from "components";
import pic1 from "../assets/pic1.svg";
import pic2 from "../assets/pic2.svg";
import pic3 from "../assets/pic3.svg";
import pic4 from "../assets/pic4.svg";
import pic5 from "../assets/pic5.svg";
import pic6 from "../assets/pic6.svg";
import ico1 from "../assets/ic1.svg";
import { Select } from "@mui/material";
//import { PieChart as PieChartTailwind } from "tailwind-elements";

// Data for the bar chart
const barData = [
    { name: "Label 1", value: 25 },
    { name: "Label 2", value: 40 },
    { name: "Label 3", value: 60 },
    { name: "Label 4", value: 20 },
    { name: "Label 5", value: 45 },
    { name: "Label 5", value: 45 },
    { name: "Label 3", value: 40 },
    { name: "Label 4", value: 80 },
    { name: "Label 5", value: 35 },
    { name: "Label 5", value: 65 },
];

// Data for the pie chart
const pieData = [
    { name: "Today’s Multi Day Visitor(s)", value: 25 },
    { name: "Today’s Visitor(s)", value: 45 },
];
const cylinderdata = [
    { name: "A", label: "asdf", value: 150 },
    { name: "B", value: 250 },
    { name: "C", value: 100 },
];
const pied2 = [
    { name: "Current Month", value: 22 },
    { name: "Week-21", value: 22 },
    { name: "Week-22", value: 22 },
    { name: "Week-20", value: 22 },
    { name: "Week-19", value: 22 },
];
const pied3 = [
    { name: "Current Month", value: 22 },
    { name: "Week-21", value: 22 },
    { name: "Week-22", value: 22 },
    { name: "Week-20", value: 22 },
    { name: "Week-19", value: 22 },
];
// const CylinderBar = (props) => {
//     const { fill, x, y, width, height } = props;
//     const radius = width / 2;

//     return (
//         <g>
//             <ellipse cx={x + width / 2} cy={y} rx={radius} ry={radius / 2} fill={fill} />
//             <rect x={x} y={y - radius / 2} width={width} height={height + radius} fill={fill} />
//             <ellipse cx={x + width / 2} cy={y + height} rx={radius} ry={radius / 2} fill={fill} />
//         </g>
//     );S
// };
const data3 = [
    {
        name: "Category 1",
        value: 25,
    },
    {
        name: "Category 2",
        value: 25,
    },
    {
        name: "Category 3",
        value: 50,
    },
];

const colors = ["#FFDF38", "#0F4699", "#3C89CC"];
const piecolor = ["#003C86", "#36A1EF"];
const cycolor = ["#4363D6", "#2F61AB", "#46D3FF"];
const mycolor = ["#1C4AEB", "#1ABEF2", "#5697F9", "#39F3FF", "#1B5CBF"];
const mycolor3 = ["#1EED7D", "#5697F9", "#F5A405", "#FA4747"];
const my3 = ["#00A3A0", "#FFA300", "#1C4584"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
export function Dashboard() {
    return (
        <div className="max-h-screen overflow-y-auto hide-scrollbar   bg-white p-t-4 uppercase">
            DASHBOARD
            {<>
            <div className="pt-4  font-xl border-b-2">
                <h1 className="text-xl text-fourth">Dashboard</h1>
            </div>
            <div className="p-5 mx-auto rounded-md bg-[#E8ECF3]  shadow-md">
                    <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
                        <img src={pic1} alt="" className="w-full h-auto rounded-md" />
                        <img src={pic2} alt="" className="w-full h-auto rounded-md" />
                        <img src={pic3} alt="" className="w-full h-auto rounded-md" />
                        <img src={pic4} alt="" className="w-full h-auto rounded-md" />
                        <img src={pic5} alt="" className="w-full h-auto rounded-md" />
                        <img src={pic6} alt="" className="w-full h-auto rounded-md" />
                    </div>
            </div>
            </>}
                <div className="p-5 mt-5 rounded-sm bg-[#643c94] text-white font-xl">
                    <h1>My Dashboard</h1>
                </div>
                <div className="flex flex-row space-x-6">
                    <div className="w-1/2 m-2 rounded-md bg-white shadow-md border">
                        <h2 className="text-center">Bar Chart</h2>
                        <BarChart width={500} height={400} data={barData}>
                            <XAxis dataKey="date" angle={-45} textAnchor="end" />

                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" barSize={25} radius={[10, 10, 5, 5]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                            <Bar dataKey="Recent Visitor" fill="#FFDF38" />
                            <Bar dataKey="Recent Materail" fill="#0F4699" />
                            <Bar dataKey="Canteen Usage" fill="#3C89CC" />
                        </BarChart>
                    </div>

                    <div className="w-1/2 m-2 rounded-md bg-white shadow-md border">
                        <h2 className="text-center">Status Wise Visitor List</h2>
                        <PieChart width={500} height={400}>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={120}
                                label={(entry) => entry.name}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#36A1EF" : "#003C86"} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="bottom" align="center" />
                        </PieChart>
                    </div>
                </div>
                <div className="flex flex-row space-x-6">
                    <div className="w-1/2 m-2 rounded-md bg-[#DEEEFF] shadow-md border">
                        <div className="flex flex-row items-center  ml-4">
                            <div className="bg-[#643c94] text-sm text-white flex  item-start p-2  m-3 rounded-sm">
                                30/Feb/2023
                            </div>
                            <p className=" text-lg mb-2 text-[#643c94]">Previously Inside Count - 2016</p>
                        </div>
                        <div className="flex flex-col item-end justify-end p-4">
                            <p>Today Worker</p>
                            <p>Inside</p>
                        </div>
                        <BarChart width={500} height={400} data={cylinderdata}>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" barSize={60} radius={[20, 20, 5, 5]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={cycolor[index % cycolor.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                        <p className="p-2 flex justify-center text-[#643c94]">
                            Total pass issued(328) Inside(90) Card Submitted(200)
                        </p>
                        <PieChart width={500} height={400}>
                            <Pie data={data3} labelLine={false}  label={renderCustomizedLabel} outerRadius={120} fill="#8884d8" dataKey="value">
                                {data3.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={my3[index % my3.length]} />
                                ))}
                            </Pie>

                        <Legend verticalAlign="bottom" align="center" />
                        </PieChart>

                    </div>
                    <div className=" w-full  rounded-md m-2">
                        <h2 className="text-xl ">Canteen Menu</h2>

                        <div className="w-full p-4 mt-3 rounded-sm bg-[#643c94] ">
                            <h1 className="text-white p-3">Next Menu</h1>

                            <div className="flex items-center text-white p-3 rounded-md ">
                                <img src={ico1} alt="img1" className="mr-3 w-25 h-25" />

                                <div className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <MdFoodBank className="mr-2" />
                                        <span className="">Rojalin Hospitality Service</span>
                                    </div>

                                    <div className="flex items-center">
                                        <MdFastfood className="mr-2" />
                                        <span>Biscuit / Toast, Buttermilk / Chas...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between p-4 ">
                            <h2 className="text-center">Canteen Wastage (kg)</h2>
                            <div className="flex justify-end">
                                <label> Canteen</label>
                                <Select label="asdf" />
                            </div>
                        </div>
                        <div className="bg-[#E8ECF3] p-2 flex flex-col justify-start items-left">
                            <h1>Weekly Food Wastage(kg)</h1>
                            <PieChart width={550} height={400} align="left">
                                <Pie data={pied2} dataKey="value" outerRadius={120}>
                                    {pied2.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={mycolor[index % mycolor.length]} />
                                    ))}
                                </Pie>
                                <Legend verticalAlign="bottom" align="center" />
                            </PieChart>

                            <h1>Monthy Food Wastage(kg)</h1>
                            <PieChart width={550} height={400} align="right">
                                <Pie data={pied3} dataKey="value" outerRadius={120}>
                                    {pied3.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={mycolor3[index % mycolor3.length]} />
                                    ))}
                                </Pie>
                                <Legend verticalAlign="bottom" align="right" />
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>
    );
}

