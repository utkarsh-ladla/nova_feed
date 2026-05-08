import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiLogOut, FiUser } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { pathname } = useLocation();
    const { user, logout } = useContext(AuthContext);

    const isAuthPage = pathname === "/login" || pathname === "/register";

    return (
        <header className="border-b border-slate-800 bg-[#020817] sticky top-0 z-50 px-6">
            <div className="flex items-center justify-between py-4 w-full">
                <Link to="/" className="text-2xl font-black text-blue-500 tracking-tight">
                    NOVA<span className="text-white">FEED</span>
                </Link>

                {!isAuthPage && (
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800">
                                        <FiUser className="text-blue-400" />
                                        <span className="text-sm font-medium">{user.name}</span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="text-gray-400 hover:text-red-400 transition-colors p-2"
                                        title="Logout"
                                    >
                                        <FiLogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-sm text-gray-300 hover:text-white transition font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        Join Now
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
