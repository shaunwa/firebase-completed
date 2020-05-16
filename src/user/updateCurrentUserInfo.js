import firebase from 'firebase/app';
import { getCurrentUser } from '../auth';

export const updateCurrentUserInfo = async updates => {
    const currentUser = getCurrentUser();

    if (!currentUser) return;

    await firebase.firestore()
        .collection('users')
        .doc(currentUser.id)
        .update(updates);
}