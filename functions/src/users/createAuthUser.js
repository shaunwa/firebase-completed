import * as admin from 'firebase-admin';

export const createAuthUser = async newUserInfo => {
    const auth = admin.auth();
    const { emailAddress, password } = newUserInfo;

    const newUser = await auth.createUser({
        email: emailAddress,
        password,
    });

    return newUser.uid;
}