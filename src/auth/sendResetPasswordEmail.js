import firebase from 'firebase/app';

export const sendResetPasswordEmail = async emailAddress => {
    await firebase.auth().sendPasswordResetEmail(emailAddress);
}