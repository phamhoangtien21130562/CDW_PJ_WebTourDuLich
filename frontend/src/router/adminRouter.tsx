import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/dashboard";
import Users from "../pages/admin/users";
import Tours from "../pages/admin/tours";
import Orders from "../pages/admin/orders";
import Reports from "../pages/admin/reports";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="tours" element={<Tours />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="reports" element={<Reports />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
