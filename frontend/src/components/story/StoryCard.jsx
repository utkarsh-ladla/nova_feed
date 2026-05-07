import { FiBookmark } from "react-icons/fi";

function StoryCard({ story }) {

    return (
        <div className="border border-slate-800 rounded-xl p-5 hover:border-blue-600 transition">

            <div className="flex items-start justify-between gap-4">

                <div>

                    <h2 className="text-xl font-semibold leading-snug">

                        <a
                            href={story.url}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-blue-400"
                        >
                            {story.title}
                        </a>

                    </h2>

                    <div className="flex items-center gap-3 text-sm text-gray-400 mt-3">

                        <span>{story.author}</span>

                        <span>•</span>

                        <span>{story.postedAt}</span>

                    </div>

                    <div className="mt-3 text-blue-400 font-medium">

                        {story.points} points

                    </div>

                </div>

                <button className="text-xl hover:text-blue-500">

                    <FiBookmark />

                </button>

            </div>

        </div>
    );
}

export default StoryCard;