import { Link, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
    const { pathname } = useLocation();

    const isAuthPage =
        pathname === "/login" || pathname === "/register";

    return (
        <header className="border-b border-slate-800 bg-[#020817]">
            <div className="flex items-center justify-between px-6 py-4">

                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-500"
                >
                    NovaFeed
                </Link>

                {!isAuthPage && (
                    <>
                        <div className="hidden md:flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-lg w-[350px]">
                            <FiSearch className="text-gray-400" />

                            <input
                                type="text"
                                placeholder="Search stories..."
                                className="bg-transparent outline-none text-sm w-full"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                to="/login"
                                className="text-sm text-gray-300 hover:text-white transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;