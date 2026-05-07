import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import StoryCard from "../components/story/StoryCard";

import { getStories } from "../services/storyService";

function Home() {

    const [stories, setStories] = useState([]);

    useEffect(() => {

        fetchStories();

    }, []);

    const fetchStories = async () => {

        try {

            const data = await getStories();

            setStories(data.stories);

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <MainLayout>

            <div className="space-y-5">

                {
                    stories.map((story) => (

                        <StoryCard
                            key={story._id}
                            story={story}
                        />

                    ))
                }

            </div>

        </MainLayout>
    );
}

export default Home;