import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.tsx";
import Dashboard from "../pages/admin/dashboard/index.tsx";
import Users from "../pages/admin/users/index.tsx";
import Orders from "../pages/admin/orders/index.tsx";
import Tours from "../pages/admin/tours/index.tsx";

import React from "react";
import Categories from "../components/admin/Categories.tsx";

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="orders" element={<Orders />} />
                <Route path="tours" element={<Tours />} />
                   <Route path="category" element={<Categories />} />
                {/*<Route path="hotels" element={<Hotels />} />*/}
            </Route>
        </Routes>
    );
};

export default AdminRouter;
