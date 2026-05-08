import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import StoryCard from "../components/story/StoryCard";
import { getBookmarks } from "../services/storyService";
import { AuthContext } from "../context/AuthContext";

function Bookmarks() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        fetchBookmarks();
    }, [user, navigate]);

    const fetchBookmarks = async () => {
        try {
            setLoading(true);
            const data = await getBookmarks();
            // The backend returns { success, message, bookmarks }
            setBookmarks(data.bookmarks || []);
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white mb-6">Your Bookmarks</h1>
                
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-slate-900/50 animate-pulse rounded-xl border border-slate-800"></div>
                        ))}
                    </div>
                ) : bookmarks.length > 0 ? (
                    <div className="space-y-5">
                        {bookmarks.map((story) => (
                            <StoryCard key={story._id} story={story} />
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-400 py-20 text-center border border-dashed border-slate-800 rounded-2xl bg-[#091225]/30">
                        <p className="text-lg">No bookmarks found.</p>
                        <p className="text-sm mt-1">Save some stories to see them here!</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default Bookmarks;
