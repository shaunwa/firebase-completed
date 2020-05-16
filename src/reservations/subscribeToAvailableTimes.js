import firebase from 'firebase/app';

export const subscribeToAvailableTimes = (restaurantId, date, cb) => {
    const callback = results => {
        const dateAvailabilityDoc = results.docs[0];
        if (dateAvailabilityDoc) {
            cb({
                id: dateAvailabilityDoc.id,
                availableTimes: dateAvailabilityDoc.data().availableTimes,
            });
        } else {
            cb({ id: '', availableTimes: [] });
        }
    }

    return firebase.firestore()
        .collection('dateAvailabilities')
        .where('restaurantId', '==', restaurantId)
        .where('date', '==', date)
        .onSnapshot(callback);
}