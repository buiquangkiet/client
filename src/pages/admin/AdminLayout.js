import { apiGetCurrent } from "apis/user";
import { Header } from "components";
import AdminSidebar from "components/admin/AdminSidebar";
import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import path from "ultils/paths";
const AdminLayout = () => {
    const navigate = useNavigate();
    // const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await apiGetCurrent();
            if (res.success) {
                if (res.response.role !== 5)
                    navigate(path.PUBLIC);
            } else {
                Swal.fire("Error", res.message, "error").then(() =>
                    navigate(path.PUBLIC)
                );
            }
        };
        fetchUser();
    }, []);
    return (
        <div className="w-full flex justify-center">
            <div className="w-full">
                <div className="flex flex-col">
                    <Header />
                    <div className="  w-full  relative">
                        <div className="w-[240px] h-full absolute top-0 left-0 bg-gray-200">
                            <AdminSidebar />
                        </div>
                        <div className="min-h-screen ml-[250px] ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
