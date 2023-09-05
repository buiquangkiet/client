import { apiDeleteUser, apiGetUsers, apiUpdateUserByAdmin } from "apis/user";
import Pagination from "components/Pagination/Pagination";
import RadioItem from "components/admin/RadioItem";
import TableItem from "components/admin/TableItem";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDebounce } from "ultils/hook";
import { SearchIcon } from "ultils/icons";

const ManageUsers = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page")) || 1;
    const name = queryParams.get("name") || "";
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState(name);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(page);
    const debounceSearch = useDebounce(searchInput.trim(), 500);
    useEffect(() => {
        setCurrentPage(1);
    }, [debounceSearch]);
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await apiGetUsers({
                page: currentPage,
                name: debounceSearch,
            });
            if (response.success) {
                setUsers(response.users);
                setTotal(response.total);
            }
        };
        queryParams.set("page", currentPage);
        queryParams.set("name", debounceSearch);
        navigate("?" + queryParams.toString());
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, debounceSearch]);
    const handleDeleteUser = async (_id) => {
        Swal.fire({
            title: "Do you want to delete this user",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(_id);
                if (response.success) {
                    Swal.fire("Deleted!", response.message, "success").then(
                        () => setUsers(users.filter((user) => user._id !== _id))
                    );
                }
            }
        });
    };
    const handleUpdate = async (id, field, value) => {
        let error = "";
        const data = { uid: id, [field]: value }
        if (field === "email") {
            if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid Email";
        }
        if (field === "firstname" || field === "lastname") {
            if (value.length < 3) error = error = "Invalid Name";
        }
        if (field === "phone") {
            if (value.length !== 10) error = error = "Invalid Phone";
        }
        if (error !== "") return Swal.fire("Error", error, "error");
        else {
            const response = await apiUpdateUserByAdmin(data);
            if (response.success) {
                Swal.fire("Updated!", response.message, "success").then(() => setUsers(users.map((user) => {
                    if (user._id === id) {
                        if (field === "status") {
                            user.isBlocked = value === "Blocked"
                        }
                        if (field === "role") {
                            user.role = value === "User" ? 4 : 5
                        }
                        else {
                            user[field] = value;
                        }
                    }
                    return user;
                })))
            }
            else {
                Swal.fire("Error", response.message, "error");
            }
        }
    }
    return (
        <div className="container mx-auto p-4  text-left ">
            <div className="font-semibold text-[20px] my-5 mb-8">
                Manage Users
            </div>
            <div className=" text-black flex items-center rounded-full bg-[rgba(255,255,255,0.2)] pr-5 gap-2 w-fit mb-5 border ">
                <input
                    type="text"
                    placeholder="Search User"
                    className="outline-none border-none rounded-full bg-transparent h-[40px] px-5 w-[500px] text-[16px]"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <div>
                    <SearchIcon size={20} className="cursor-pointer " />
                </div>
            </div>
            <div className="text-[13px] text-left text-gray-500 overflow-x-auto w-full">
                <table className="min-w-full border">
                    <thead className="bg-gray-100">
                        <tr className="text-[16px]">
                            <th className="font-semibold p-2">#</th>
                            <th className="font-semibold p-2">Email</th>
                            <th className="font-semibold p-2">First Name</th>
                            <th className="font-semibold p-2">Last Name</th>
                            <th className="font-semibold p-2">Role</th>
                            <th className="font-semibold p-2 ">Phone</th>
                            <th className="font-semibold p-2">Status</th>
                            <th className="font-semibold p-2">Create At</th>
                            <th className="font-semibold p-2">Edit</th>
                        </tr>
                    </thead>
                    <tbody className=" ">
                        {users &&
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="p-2">
                                        {(page - 1) * 10 + index + 1}
                                    </td>

                                    <td className="p-2">
                                        <TableItem content={user.email} field={'email'} id={user._id} onUpdate={handleUpdate} isEditable />
                                    </td>
                                    <td className="p-2">
                                        <TableItem content={user.firstname} field={'firstname'} id={user._id} onUpdate={handleUpdate} isEditable />

                                    </td>
                                    <td className="p-2">
                                        <TableItem content={user.lastname} field={'lastname'} id={user._id} onUpdate={handleUpdate} isEditable />

                                    </td>
                                    <td className="p-2">

                                        <RadioItem content={user.role === 4 ? "User" : "Admin"} field={'role'} id={user._id} onUpdate={handleUpdate} value={["User", "Admin"]} />

                                    </td>
                                    <td className="p-2"><TableItem content={user.mobile} field={'mobile'} id={user._id} onUpdate={handleUpdate} isEditable /></td>

                                    <td className="p-2">
                                        <RadioItem content={user.isBlocked ? "Blocked" : "Active"} field={'status'} id={user._id} onUpdate={handleUpdate} value={["Blocked", "Active"]} />
                                    </td>
                                    <td className="p-2">
                                        {moment(user.createdAt).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </td>
                                    <td className="p-2">
                                        <span
                                            className="underline cursor-pointer hover:text-main"
                                            onClick={() =>
                                                handleDeleteUser(user._id)
                                            }
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* <div className=" text-[13px] text-left text-gray-500 overflow-x-scroll ">


                <div className="flex flex-col w-full">
                    {users &&
                        users.map((user, index) => (
                            <div className="flex items-center gap-2" key={user._id}>
                                <div className="w-[10px] ">
                                    {(page - 1) * 10 + index + 1}
                                </div>
                                <div
                                    className={`border-b grid grid-cols-11 gap-8 w-full text-left`}
                                    key={user._id}
                                >

                                    <div className=" col-span-3">
                                        <TableItem content={user.email} field={'email'} id={user._id} onUpdate={handleUpdate} isEditable />
                                    </div>
                                    <div className=" col-span-1">
                                        <TableItem content={user.firstname} field={'firstname'} id={user._id} onUpdate={handleUpdate} isEditable />

                                    </div>
                                    <div className=" col-span-1">
                                        <TableItem content={user.lastname} field={'lastname'} id={user._id} onUpdate={handleUpdate} isEditable />

                                    </div>
                                    <div className=" col-span-1">

                                        <RadioItem content={user.role === 4 ? "User" : "Admin"} field={'role'} id={user._id} onUpdate={handleUpdate} value={["User", "Admin"]} />

                                    </div>
                                    <div className=" col-span-2"><TableItem content={user.mobile} field={'mobile'} id={user._id} onUpdate={handleUpdate} isEditable /></div>

                                    <div className=" col-span-1">
                                        <RadioItem content={user.isBlocked ? "Blocked" : "Active"} field={'status'} id={user._id} onUpdate={handleUpdate} value={["Blocked", "Active"]} />
                                    </div>
                                    <div className=" col-span-1 flex items-center">
                                        {moment(user.createdAt).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <span
                                            className="underline cursor-pointer hover:text-main"
                                            onClick={() =>
                                                handleDeleteUser(user._id)
                                            }
                                        >
                                            Delete
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div> */}

            <div className="float-right">
                <Pagination
                    totalCount={total}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ManageUsers;
