import API from "../api/axios";

export const getStories = async (page = 1) => {

    const response = await API.get(
        `/stories?page=${page}&limit=5`
    );

    return response.data;
};