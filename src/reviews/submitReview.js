import firebase from 'firebase/app';

export const submitReview = async (restaurantId, newReview) => {
    const submitReviewFunction = firebase.functions()
        .httpsCallable('submitReview');
    return await submitReviewFunction({ restaurantId, newReview });
}