import firebase from 'firebase/app';

export const cancelReservation = async reservationId => {
    const cancelReservationFunction = firebase.functions().httpsCallable('cancelReservation');
    return await cancelReservationFunction({ reservationId });
}