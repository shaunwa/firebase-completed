import firebase from 'firebase/app';

export const getUserInfo = async userId => {
    const userInfoDoc = await firebase.firestore()
        .collection('users')
        .doc(userId)
        .get();

    const userInfo = userInfoDoc.data();

    if (!userInfo) return null;

    return {
        ...userInfo,
        id: userInfoDoc.id,
    };
}