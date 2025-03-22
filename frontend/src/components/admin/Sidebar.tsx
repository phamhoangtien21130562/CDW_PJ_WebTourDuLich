import { Link } from "react-router-dom";
import { Home, Users, Briefcase, ClipboardList, BarChart } from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            <ul>
                <li className="mb-4">
                    <Link to="/admin/dashboard" className="flex items-center space-x-2">
                        <Home /> <span>Dashboard</span>
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/admin/users" className="flex items-center space-x-2">
                        <Users /> <span>Users</span>
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/admin/tours" className="flex items-center space-x-2">
                        <Briefcase /> <span>Tours</span>
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/admin/orders" className="flex items-center space-x-2">
                        <ClipboardList /> <span>Orders</span>
                    </Link>
                </li>
                <li className="mb-4">
                    <Link to="/admin/reports" className="flex items-center space-x-2">
                        <BarChart /> <span>Reports</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
