import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="admin-container">
            <aside className="admin-sidebar">Sidebar</aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
