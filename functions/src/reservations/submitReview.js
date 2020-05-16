import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const submitReview = functions.https.onCall(async (data, context) => {
    const { restaurantId, newReview } = data;
    const userId = context.auth.uid;
    const {
        rating,
        text,
        imageUrls,
    } = newReview;

    const store = admin.firestore();
    await store.collection('reviews')
        .add({
            rating,
            text,
            imageUrls,
            userId,
            restaurantId,
        });

    const restaurantDoc = await store.collection('restaurants')
        .doc(restaurantId)
        .get();
    const restaurant = restaurantDoc.data();
    const { numberOfRatings: oldNumberOfRatings = 0, rating: oldRating } = restaurant;

    const newNumberOfRatings = oldNumberOfRatings + 1;

    await store.collection('restaurants')
        .doc(restaurantId)
        .update({
            numberOfRatings: newNumberOfRatings,
            rating: oldNumberOfRatings > 0
                ? (oldRating * oldNumberOfRatings + rating) / newNumberOfRatings
                : rating,
        });
})