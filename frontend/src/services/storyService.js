import API from "../api/axios";

export const getStories = async (page = 1, sort = "top") => {
    const response = await API.get(`/stories?page=${page}&limit=10&sort=${sort}`);
    return response.data;
};

export const getSingleStory = async (id) => {
    const response = await API.get(`/stories/${id}`);
    return response.data;
};

export const toggleBookmark = async (id) => {
    const response = await API.post(`/stories/${id}/bookmark`);
    return response.data;
};

export const getBookmarks = async () => {
    const response = await API.get("/stories/bookmarks");
    return response.data;
};