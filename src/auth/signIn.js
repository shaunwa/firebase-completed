import firebase from 'firebase/app';

export const signIn = async (email, password) => {
    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        return {};
    } catch (e) {
        throw new Error('Error signing in');
    }
}
