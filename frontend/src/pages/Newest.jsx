import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import StoryCard from "../components/story/StoryCard";
import { getStories } from "../services/storyService";

function Newest() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            setLoading(true);
            const data = await getStories(1, "newest");
            setStories(data.stories);
        } catch (error) {
            console.error("Error fetching stories:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Newest Stories</h1>
                    <p className="text-gray-400 mt-1">The most recently submitted stories.</p>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-32 bg-slate-900/50 animate-pulse rounded-xl border border-slate-800"></div>
                        ))}
                    </div>
                ) : stories.length > 0 ? (
                    <div className="space-y-5">
                        {stories.map((story) => (
                            <StoryCard key={story._id} story={story} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        No stories found.
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default Newest;
