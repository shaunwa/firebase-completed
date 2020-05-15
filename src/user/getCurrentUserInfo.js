import { getCurrentUser } from '../auth';
import { getUserInfo } from './getUserInfo';

export const getCurrentUserInfo = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    return await getUserInfo(currentUser.id);
}