import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const getRecommendations = functions.https.onCall(async (data, context) => {
    const store = admin.firestore();

    const querySnapshot = await store.collection('restaurants')
        .limit(3)
        .get();

    const restaurants = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));

    return restaurants;
});