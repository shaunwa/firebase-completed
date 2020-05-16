import firebase from 'firebase/app';

export const makeReservation = async (availabilityId, requestedTime, numberOfPeople) => {
    const makeReservationFunction = firebase.functions()
        .httpsCallable('makeReservation');
    const result = await makeReservationFunction({
        availabilityId,
        requestedTime,
        numberOfPeople,
    });
    return result.data;
}