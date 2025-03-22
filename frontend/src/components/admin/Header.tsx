const Header = () => {
    return (
        <header className="bg-gray-900 text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <div>
                <span className="mr-4">Welcome, Admin</span>
                <button className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </div>
        </header>
    );
};

export default Header;
