import { Link } from "react-router-dom";
import {
    FiHome,
    FiBookmark,
    FiClock,
    FiRefreshCw
} from "react-icons/fi";
import { scrapeNews } from "../../services/scrapeService";
import { useState } from "react";

function Sidebar() {
    const [scraping, setScraping] = useState(false);

    const handleScrape = async () => {
        try {
            setScraping(true);
            await scrapeNews();
            window.location.reload(); // Simple way to refresh data
        } catch (error) {
            console.error("Scraping failed:", error);
        } finally {
            setScraping(false);
        }
    };

    return (
        <aside className="hidden md:block w-[250px] min-h-screen border-r border-slate-800 p-6">
            <div className="space-y-4">
                <Link
                    to="/"
                    className="flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-lg text-white"
                >
                    <FiHome />
                    Top Stories
                </Link>

                <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-900 rounded-lg text-gray-300"
                >
                    <FiClock />
                    Newest
                </Link>

                <Link
                    to="/bookmarks"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-900 rounded-lg text-gray-300"
                >
                    <FiBookmark />
                    Bookmarks
                </Link>

                <button
                    onClick={handleScrape}
                    disabled={scraping}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-900 rounded-lg text-gray-300 disabled:opacity-50 transition"
                >
                    <FiRefreshCw className={scraping ? "animate-spin" : ""} />
                    {scraping ? "Scraping..." : "Scrape News"}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;