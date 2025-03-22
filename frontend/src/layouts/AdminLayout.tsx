import Sidebar from "../components/admin/Sidebar.tsx";
import Header from "../components/admin/Header.tsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
