import axios from 'axios';
import { baseUrl } from './configServer';

export const addCourse = async (title, userId, categoryId, desc, visibility, code, priceType, status, imageId, navigation) => {
    const api_token = sessionStorage.getItem('api_token');
    const params = new FormData();
    params.append('title', title);
    params.append('user_id', userId);
    params.append('category_id', categoryId);
    params.append('description', desc);
    params.append('visibility', visibility);
    params.append('code', code);
    params.append('price_type', priceType);
    params.append('status', status);
    params.append('image_id', imageId);
    params.append('navigation', navigation);
    const res = await axios.post(baseUrl + 'courses/add', params, {
        headers: {
            'Authorization': `Bearer ${api_token}`
        }
    });
    return res;
}