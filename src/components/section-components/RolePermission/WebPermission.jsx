import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { CustomButton1 } from 'components';
import { GetRolePermissionList, reactToaster } from "hooks";
import { RolePermissionService, FormModes, NotificationStatus } from "utility";


export const WebPermission = (props) => {
	const navigate = useNavigate();
	const { data: webPermissions, loading: loadingRolePermissions, filterChanged, filter, totalCount, pageChanged } = GetRolePermissionList()
	console.log("🚀 ~ file: WebPermission.jsx:13 ~ WebPermission ~ webPermissions:", webPermissions)

	const [moduleList, setModuleList] = useState([]);
	const [updating, setUpdating] = useState(false);
	const [proccessing, setProcessing] = useState('');
	useEffect(() => {
		filterChanged({
			roleId: Number(props.id)
		})
	}, [props.id])

	useEffect(() => {
		return () => setModuleList([]);
	}, [])

	useEffect(() => {
		const filteredData = webPermissions.filter(permission => permission.appType === "W");
		setModuleList(filteredData);
	}, [webPermissions]);

	const handleChange = (event, index, updateKey) => {
		if (index === -1) { // This is the "All Checked?" checkbox
			const updatedPermissions = moduleList.map(item => ({
				...item,
				view: event.target.checked,
				add: event.target.checked,
				edit: event.target.checked
			}));
			setModuleList(updatedPermissions);
		} else {
			const updatedPermissions = Object.assign([...moduleList], {
				[index]: {
					...moduleList[index],
					[updateKey]: event.target.checked
				}
			});
			setModuleList(updatedPermissions);
		}
	};
	const submit = async () => {
		try {
			setProcessing("proccessing")
			const result = await RolePermissionService.add({
				roleId: Number(props.id),
				appType: "W",
				isActive: true,
				moduleList: moduleList.map(item => ({
					moduleId: item.moduleId,
					view: item.view === 1 || item.view === true,
					add: item.add === 1 || item.add === true,
					edit: item.edit === 1 || item.edit === true
				}))
			});

			reactToaster(result.message, NotificationStatus.success)
			// onSubmit(result)
		} catch {
			reactToaster(NotificationStatus.error)
		} finally {
			setProcessing('')
		}
	}

	return (
		<div >
			<div className='mt-8 ml-4'>
				All Checked?
				<Checkbox
					checked={moduleList.every(item => item.view && item.add && item.edit)}
					onChange={(e) => handleChange(e, -1)}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
			</div>
			<div className="flex flex-row md:justify-between items-center flex-wrap justify-start gap-1  md:flex-nowrap ">
				<div className="mt-2 w-[80vw]  hide-scrollbar overflow-auto table-container ">

					<table className="w-full custom-table" border={1}>
						<thead>
							<tr className="table-heading ">
								<td className="">S.No</td>
								<td>Permission Name</td>
								<td>View</td>
								<td>Add</td>
								<td>Edit</td>
							</tr>
						</thead>
						<tbody>

							{
								!loadingRolePermissions && moduleList.map((item, index) => (
									<tr key={item.moduleId}>
										<td>{index + 1}</td>
										<td>{item.moduleName}</td>
										<td>
											<Checkbox
												checked={item.view}
												onChange={(e) => handleChange(e, index, 'view')}
												inputProps={{ 'aria-label': 'controlled' }}
											/>
										</td>
										<td>
											<Checkbox
												checked={item.add}
												onChange={(e) => handleChange(e, index, 'add')}
												inputProps={{ 'aria-label': 'controlled' }}
											/>
										</td>
										<td>
											<Checkbox
												checked={item.edit}
												onChange={(e) => handleChange(e, index, 'edit')}
												inputProps={{ 'aria-label': 'controlled' }}
											/>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</div>
			<div className="flex justify-between gap-5 bg-[#F9FBFF] p-8">
				<div>
					<CustomButton1
						label={"Back"}
						className="text-white"
						onClick={() => navigate(-1)}
						disabled={updating}
					/>
				</div>
				<div>
					<CustomButton1
						label={"Update"}
						className="text-white"
						onClick={submit}
						disabled={loadingRolePermissions}
						loading={updating}
					/>
				</div>
			</div>
		</div>
	);
}