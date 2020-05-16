import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const makeReservation = functions.https.onCall(async (data, context) => {
    const userId = context.auth.uid;
    if (!userId) return { status: 'error', code: 401, message: 'Not signed in!' };

    const { availabilityId, requestedTime, numberOfPeople } = data;
    const store = admin.firestore();
    const requestedDateDoc = await store.collection('dateAvailabilities')
        .doc(availabilityId)
        .get();
    const availabilityInfo = requestedDateDoc.data();
    const { availableTimes } = availabilityInfo;

    if (!availableTimes.includes(requestedTime)) {
        return { status: 'error', code: 400, message: 'Time is no longer available' };
    }

    await store.collection('reservations')
        .add({
            userId,
            createdAt: Date.now(),
            restaurantId: availabilityInfo.restaurantId,
            date: availabilityInfo.date,
            time: requestedTime,
            numberOfPeople,
        });
    
    await store.collection('dateAvailabilities')
        .doc(availabilityId)
        .update({
            availableTimes: availableTimes.filter(time => time !== requestedTime),
        });

    return { code: 200, message: 'Success!' };
});