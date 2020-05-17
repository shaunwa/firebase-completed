import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const createUserFromOAuth = functions.auth.user().onCreate(async user => {
    if (user.providerData.some(provider => provider.providerId === 'password')) {
        return null;
    }

    const store = admin.firestore();
    const {
        uid,
        email,
        displayName = '',
        photoURL,
    } = user;

    return store.collection('users')
        .doc(uid)
        .set({
            email,
            firstName: displayName.split(' ')[0],
            lastName: displayName.split(' ')[1],
            profilePictureUrl: photoURL,
        });
});