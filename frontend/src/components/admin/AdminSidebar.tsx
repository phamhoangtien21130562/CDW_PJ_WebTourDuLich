import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <nav className="sidebar">
            <ul>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
                <li><Link to="/admin/tours">Tours</Link></li>
                <li><Link to="/admin/users">Users</Link></li>
            </ul>
        </nav>
    );
};

export default AdminSidebar;
