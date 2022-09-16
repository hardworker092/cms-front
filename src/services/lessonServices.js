import { instance } from "./configServer";

export const addLessonService = (title, userId) => {
    const params = new FormData();
    params.append('title', title);
    params.append('user_id', '1');
    params.append('course_id', '1');
    params.append('status', '1');
    params.append('visibility', '1');
    instance.post('lessons/add', params);
}

export const deleteLessonService = async (id) => {
    const res = await instance.delete(`lessons/delete/${id}`);
    return res;
}