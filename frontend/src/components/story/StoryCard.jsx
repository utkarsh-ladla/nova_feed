import { useContext, useState, useEffect } from "react";
import { FiBookmark } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toggleBookmark } from "../../services/storyService";
import { useNavigate } from "react-router-dom";

function StoryCard({ story }) {
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Check if bookmarked initially
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);

    // Sync bookmark state with user context
    useEffect(() => {
        setIsBookmarked(user?.bookmarks?.includes(story._id) || false);
    }, [user, story._id]);

    const handleBookmark = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            const data = await toggleBookmark(story._id);
            setIsBookmarked(!isBookmarked);
            
            // Update user in context to keep bookmarks in sync
            const updatedUser = { ...user, bookmarks: data.bookmarks };
            login(updatedUser, localStorage.getItem("token"));
        } catch (error) {
            console.error("Error toggling bookmark:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-slate-800 rounded-xl p-5 hover:border-blue-600 transition bg-[#091225]/50 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold leading-snug">
                        <a
                            href={story.url}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-blue-400 transition-colors"
                        >
                            {story.title}
                        </a>
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mt-3">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-xs">{story.author}</span>
                        <span>•</span>
                        <span>{story.postedAt}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="text-blue-400 font-bold">{story.points}</span>
                        <span className="text-gray-500 text-sm">points</span>
                    </div>
                </div>

                <button 
                    onClick={handleBookmark}
                    disabled={loading}
                    className={`text-xl p-2 rounded-full hover:bg-slate-800 transition-all ${
                        isBookmarked ? "text-blue-500" : "text-gray-400 hover:text-white"
                    }`}
                >
                    {isBookmarked ? <FaBookmark /> : <FiBookmark />}
                </button>
            </div>
        </div>
    );
}

export default StoryCard;