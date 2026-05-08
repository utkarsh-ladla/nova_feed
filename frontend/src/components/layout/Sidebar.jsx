import { Link, useLocation } from "react-router-dom";
import {
    FiHome,
    FiBookmark,
    FiClock
} from "react-icons/fi";

function Sidebar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="hidden md:block w-[250px] h-full border-r border-slate-800 p-6 overflow-y-auto">
            <div className="space-y-4">
                <Link
                    to="/"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive("/") 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-slate-900"
                    }`}
                >
                    <FiHome />
                    Top Stories
                </Link>

                <Link
                    to="/newest"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive("/newest") 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-slate-900"
                    }`}
                >
                    <FiClock />
                    Newest
                </Link>

                <Link
                    to="/bookmarks"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive("/bookmarks") 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-slate-900"
                    }`}
                >
                    <FiBookmark />
                    Bookmarks
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar;
