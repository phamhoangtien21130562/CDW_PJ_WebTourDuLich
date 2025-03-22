import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/dashboard/index";
import Orders from "../pages/admin/orders";
import Tours from "../pages/admin/tours";
import Users from "../pages/admin/users";

function AdminRouter() {
    return (
        <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="tours" element={<Tours />} />
            <Route path="users" element={<Users />} />
        </Routes>
    );
}

export default AdminRouter;
