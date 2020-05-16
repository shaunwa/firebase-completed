import * as functions from 'firebase-functions';
import { sendEmail } from './sendEmail';

export const sendVerificationEmail = functions.firestore.document('/temporaryUsers/{id}')
    .onCreate((snapshot, context) => {
        const tempUserInfo = snapshot.data();
        const {
            emailAddress,
            confirmationHash,
        } = tempUserInfo;

        return sendEmail({
            to: emailAddress,
            from: 'shaun.firebase.test1@gmail.com',
            subject: 'My Reservation App Email Verification',
            message: `Click this link to verify your email: https://us-central1-restaurant-reservations-144e5.cloudfunctions.net/confirmEmail?conf=${confirmationHash}`,
        });
    })