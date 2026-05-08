import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import StoryCard from "../components/story/StoryCard";
import Pagination from "../components/common/Pagination";
import { getStories } from "../services/storyService";

function Home() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchStories(currentPage);
    }, [currentPage]);

    const fetchStories = async (page) => {
        try {
            setLoading(true);
            const data = await getStories(page, "top");
            setStories(data.stories);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching stories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Top Stories</h1>
                    <p className="text-gray-400 mt-1">Latest news from across the web.</p>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-32 bg-slate-900/50 animate-pulse rounded-xl border border-slate-800"></div>
                        ))}
                    </div>
                ) : stories.length > 0 ? (
                    <div className="space-y-8">
                        <div className="space-y-5">
                            {stories.map((story) => (
                                <StoryCard key={story._id} story={story} />
                            ))}
                        </div>
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange} 
                        />
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

export default Home;

